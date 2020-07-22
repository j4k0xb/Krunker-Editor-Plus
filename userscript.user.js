// ==UserScript==
// @name         Krunker Editor+
// @version      1.5
// @description  Custom features for the Krunker Map Editor
// @updateURL    https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @downloadURL  https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @author       Jakob#8686
// @include      /^(https?:\/\/)?(www\.)?(.+)krunker\.io\/editor\.html/
// @run-at       document-start
/* globals $, T3D, GUI, mod, windows */
// ==/UserScript==

function GM_addStyle(css) {
    const style = document.getElementById("GM_addStyleBy8626") || (function() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = "GM_addStyleBy8626";
        document.head.appendChild(style);
        return style;
    })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

GM_addStyle('#objSearch { width: 180px; float: right; margin: 0 10px 0 0 }');
GM_addStyle('#objSearchBtn { float: right; margin: 0 }');

class Mod {
    constructor(version) {
        this.version = version;
        this.hooks = {
            objectInstance: null,
            assets: null,
            utils: null,
            gui: null
        };
        this.defaultSettings = null;
        this.settings = {
            selectBehindInvis: true,
        };
        this.defaultConfig = {};
    }


    setupSettings() {
        windows[2].tabNames.push("Editor+");
        GUI.window.settings["editor+"] = {
            gen: () => {
                GUI.window.settings["editor+"].blueprint = {
                    selectBehindInvis: {
                        name: "Select objects through invisible ones [ALT]",
                        object: mod.settings,
                        key: "selectBehindInvis",
                        type: "switch",
                        onChange: (e, n) => mod.setSettings("selectBehindInvis", n)
                    }
                };
                return mod.hooks.gui._build(["window", "settings", "editor+", "blueprint"]);
            }
        }

        this.defaultSettings = JSON.parse(JSON.stringify(this.settings));
        let ls = this.getSavedVal('editor+');
        if (ls == null) return;
        try {
            JSON.parse(ls);
        } catch (e) {
            return;
        }
        let jsp = JSON.parse(ls);
        for (let set in jsp) {
            this.settings[set] = jsp[set];
        }
    }

    setSettings(k, v) {
        this.settings[k] = v;
        this.saveVal('editor+', JSON.stringify(this.settings));
    }

    getSavedVal(t) {
        const r = "undefined" != typeof Storage;
        return r ? localStorage.getItem(t) : null;
    }

    saveVal(t, e) {
        const r = "undefined" != typeof Storage;
        r && localStorage.setItem(t, e);
    }

    hasRotation(rot) {
        if (!Array.isArray(rot)) return;

        rot = new T3D.THREE.Euler().set(...rot).reorder("YXZ").toVector3().toArray();
        rot = rot.map(r => r.round(4));
        rot[1] = rot[1] % Math.PI.round(4);

        return rot.some(r => r % (2 * Math.PI).round(4) != 0);
    }

    radToDeg(arr) {
        if (!arr) return arr;
        return (T3D.settings.degToRad ? arr.map(r => r * 180 / Math.PI) : arr)
            .map(r => Math.abs(r) < 1e-10 ? 0 : r.round(6));
    }

    regenerateAll() {
        T3D.regenTerrain();
        T3D.regenZone();
        T3D.regenSky();
        T3D.updateSun();
        T3D.updateDeathBarrier();

        T3D.ambientLight.color.set(T3D.mapConfig.ambient);
        T3D.ambientLight.intensity = T3D.mapConfig.ambientI;
        T3D.backgroundScene.background = new T3D.THREE.Color(T3D.mapConfig.sky);
        T3D.skyLight.color.set(T3D.mapConfig.light);
        T3D.skyLight.intensity = T3D.mapConfig.lightI;
        T3D.scene.fog.color.set(T3D.mapConfig.fog);
        T3D.scene.fog.far = T3D.mapConfig.fogD;
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            result.shift();
            return result.map(x => parseInt(x, 16));
        }
        return null;
    }

    onEditorInit() {
        this.setupSettings();
        this.addShortcuts();
        this.patchQuickAdd();

        this.defaultConfig.mapConfig = JSON.parse(JSON.stringify(T3D.mapConfig));
        this.defaultConfig.serverConfig = JSON.parse(JSON.stringify(T3D.serverConfig));
        this.defaultConfig.gameConfig = JSON.parse(JSON.stringify(T3D.gameConfig));
        this.defaultConfig.objConfig = JSON.parse(JSON.stringify(T3D.objConfig));

        T3D.faces = ["+X: Right", "-X: Left", "+Y: Top", "-Y: Bottom", "-Z: Back", "+Z: Front"]

        mod.hooks.gui._html.input.fixed._vector3 = mod.hooks.gui._html.input.fixed.vector3;
        mod.hooks.gui._html.input.fixed.vector3 = (e, n = "", r = [0, 0, 0], i = "", a = "", o = "") => {
            if (e === "Rotation") r = mod.radToDeg(r);
            return mod.hooks.gui._html.input.fixed._vector3(e, n, r, i, a, o);
        }

        T3D._importMap = T3D.importMap;
        T3D.importMap = e => {
            T3D._importMap(e);
            mod.regenerateAll();
        };

        T3D._clearMap = T3D.clearMap;
        T3D.clearMap = () => {
            Object.assign(T3D.mapConfig, mod.defaultConfig.mapConfig);
            Object.assign(T3D.serverConfig, mod.defaultConfig.serverConfig);
            Object.assign(T3D.gameConfig, mod.defaultConfig.gameConfig);
            Object.assign(T3D.objConfig, mod.defaultConfig.objConfig);

            T3D._clearMap();
            mod.regenerateAll();
        };

        T3D._toggleProp = T3D.toggleProp;
        T3D.toggleProp = (e, t = null) => {
            T3D._toggleProp(e, t);
            T3D.updateObjConfigGUI();
        };

        T3D.raycaster._intersectObjects = T3D.raycaster.intersectObjects;
        T3D.raycaster.intersectObjects = (e, t, n) => {
            if (event.altKey && mod.settings.selectBehindInvis) e = e.filter(x => x.userData.owner.visible && x.userData.owner.objType != "PLACEHOLDER");
            return T3D.raycaster._intersectObjects(e, t, n);
        }

        T3D._fixHitbox = T3D.fixHitbox;
        T3D.fixHitbox = e => {
            if (e = e || T3D.objectSelected()) {
                let rx = Math.round(e.rotation.x * 180 / Math.PI);
                let rz = Math.round(e.rotation.z * 180 / Math.PI);
                let ry = Math.round(e.rotation.y * 180 / Math.PI);
                if (Math.abs(rx) < 1e-10) rx = 0;
                if (Math.abs(ry) < 1e-10) ry = 0;
                if (Math.abs(rz) < 1e-10) rz = 0;

                if (Math.abs(rx) == 180 && ry == 0 && Math.abs(rz) == 180) [rx, ry, rz] = [0, 180, 0];

                if (rx == 0 && rz == 0 && Math.abs(ry) == 180) {
                    [e.rotation.x, e.rotation.y, e.rotation.z] = [0, 0, 0];
                } else if (rx == 0 && rz == 0 && Math.abs(ry) == 90) {
                    [e.rotation.x, e.rotation.y, e.rotation.z] = [0, 0, 0];
                    [e.scale.x, e.scale.z] = [e.scale.z, e.scale.x];
                }
            }

            return T3D._fixHitbox(e);
        }
    }

    patchQuickAdd() {
        windows[3].gen = function() {
            return `<div class="windowHeader">
<div>Quick Add</div>
<div id='objSearchBtn' class='searchBtn' onclick='windows[3].searchObjects()'>Search</div>
<input type='text' id='objSearch' class='smlInput' autofocus placeholder='Object Name' onkeyup='windows[3].search()' />
</div>
<div class="windowBody">
<div class="buttonGrid" style="row-gap: 10px" >${this.search(false)}</div>
</div>`;
        }

        windows[3].hideScroll = false;
        windows[3].search = function(hasLoaded = true) {
            let result, search = '';

            if (hasLoaded) search = document.getElementById("objSearch").value.toUpperCase();

            if (search.length) {
                result = mod.hooks.assets.prefabs.filter(p => p.name.indexOf(search) != -1).sort((a, b) => a.name.length - b.name.length);
            } else {
                const defaultNames = Object.keys(this.buttons).map(name => name.toUpperCase().replace(/ /g, '_'));
                result = mod.hooks.assets.prefabs.filter(p => defaultNames.includes(p.name));
            }

            if (window.event && window.event.keyCode == 13 && result.length) {
                window.closeWindow();
                mod.createNearObject(result[0].id);
                return;
            }

            let html = "";

            if (result.length) {
                html = result.map(e => {
                    const formattedName = mod.hooks.utils.formatConstName(e.name);
                    const btn = windows[3].buttons[formattedName];
                    const { size, desc } = btn ? btn : { size: .5, desc: formattedName };
                    const img = btn ? `img/${formattedName.replace(/ /g, '').toLowerCase()}.png` : '';

                    return `<div class="quickAddButton">
<div class="previewDesc" onclick="window.closeWindow(),mod.createNearObject(${e.id})">
<div>${desc}</div>
</div>
<div class="previewImg" style="background-size:${100 * size}%;background-image:url(${img})">
<div>${formattedName}</div>
</div>
</div>`
                }).join("\n");
            } else if (search.trim().length) {
                html = "No Objects found";
            }

            if (hasLoaded) document.getElementsByClassName("buttonGrid")[0].innerHTML = html;
            return html;
        };
    }

    flipXZ(e = null) {
        if (e = e || T3D.objectSelected()) {
            [e.scale.x, e.scale.z] = [e.scale.z, e.scale.x];
            T3D.updateObjConfigGUI();
        }
    }

    createNearObject(id) {
        if (mod.hooks.assets.prefabs[id].name == "CUSTOM_ASSET") return T3D.viewAssets();

        let t = new T3D.THREE.Vector3(0, -5, -30);
        t.applyQuaternion(T3D.camera.getWorldQuaternion());
        let n = T3D.camera.getWorldPosition();
        n.add(t.multiplyScalar(1));
        T3D.addObject(mod.hooks.objectInstance.defaultFromType(id, [Math.round(n.x), Math.round(n.y), Math.round(n.z)]));
    }

    addShortcuts() {
        windows[0].tabNames.push("Editor+");
        GUI.window.controls["editor+"] = {
            gen: () => {
                let e = ["window", "controls", "editor+"];
                const controls = {
                    shading: {
                        name: "Toggle shading",
                        object: { val: "Shift + B" },
                        key: "val",
                        type: "key"
                    },
                    quickadd: {
                        name: "Quick add",
                        object: { val: "N" },
                        key: "val",
                        type: "key"
                    },
                    createcube: {
                        name: "Create cube",
                        object: { val: "C" },
                        key: "val",
                        type: "key"
                    },
                    creategate: {
                        name: "Create gate",
                        object: { val: "G" },
                        key: "val",
                        type: "key"
                    },
                    createtrigger: {
                        name: "Create trigger",
                        object: { val: "R" },
                        key: "val",
                        type: "key"
                    },
                    createteleporter: {
                        name: "Create teleporter",
                        object: { val: "T" },
                        key: "val",
                        type: "key"
                    },
                    flipxz: {
                        name: "Flip x/z size",
                        object: { val: "F" },
                        key: "val",
                        type: "key"
                    }
                };

                GUI.window.controls["editor+"].blueprint = controls;
                return mod.hooks.gui._build(["window", "controls", "editor+", "blueprint"]);
            }
        }

        const actions = {
            'c': _ => this.createNearObject(0),
            'g': _ => this.createNearObject(24),
            'r': _ => this.createNearObject(29),
            't': _ => this.createNearObject(27),
            'f': _ => this.flipXZ(),
            'n': _ => window.showWindow(4),
            // shift:
            'B': _ => T3D.toggleProp("ambient"),
        };

        window.onkeydown = e => {
            if (e.key === 'Escape') return window.closeWindow();

            if (!T3D.isTyping(e) && T3D.enabled) {
                const fn = actions[e.keyCode] || actions[e.key];
                if (!e.ctrlKey && fn) {
                    fn();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        }
    }
}

console.log("Patching script...");
const observer = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.tagName === 'SCRIPT' && !node.src && (node.textContent.includes("Yendis") || node.type == "text/javascript")) {
                observer.disconnect();
                node.type = 'javascript/blocked';
                const beforeScriptExecuteListener = e => {
                    if (node.getAttribute('type') === 'javascript/blocked') event.preventDefault();
                    node.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
                }
                node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);

                if (node.textContent) {
                    patchScript(node.textContent);
                } else {
                    const timer = setInterval(x => {
                        if (node.textContent) {
                            clearInterval(timer);
                            patchScript(node.textContent);
                        }
                    }, 100);
                }
                return;
            }
        });
    });
});

setTimeout(() => {
    if ((!unsafeWindow.code || !unsafeWindow.mod || !unsafeWindow.mod.hooks.assets) && confirm("Editor+ couldn't patch the script, please reload the page")) location.reload();
}, 10000);

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

function patchScript(code) {
    String.prototype.patch = function(searchValue, newValue) {
        if (this.indexOf(searchValue) < 0 && this.search(searchValue) < 0) {
            console.warn("Couldn't find in code:", searchValue);
            return this;
        }
        return this.replace(searchValue, newValue);
    }

    code = code.patch(/((\w+)\.getLineMaterial=)/, 'mod.hooks.objectInstance=$2;$1')
        .patch(/(ASSETS=.*?)(function)/, '$1mod.hooks.assets=ASSETS;mod.hooks.utils=UTILS;$2')
        .patch(/(window\.GUI=.*?removePrivKeys\((\w+)\))/g, 'mod.hooks.gui = $2, $1')
        .patch(/(T3D=new Editor.*?\))/, '$1;mod.onEditorInit()')
        .patch(/(t\.[ps]=t\.[ps]\.map\(e=>Math.round\()e\)/g, '$1e*1000)/1000') // round pos/size to 0.001 on serialization
        .patch(/(t\.r=r\.map\(e=>)e.round\(2\)/, '$1Math.round(e*10000)/10000') // round rotation to 0.0001 on serialization
        .patch('if(this.prefab.dontRound){', 'if(true){') // always dontRound
        .patch(/(this\.texOff.)\.round\(1\)/g, '$1') // remove texture offset rounding
        .patch(/(key:"texOff[XY]",.*?)\.1/g, '$1.01') // texture offset precision
        .patch(/(0\!\=this\.rot\[0\]\|\|0\!\=this\.rot\[1\]\|\|0\!\=this\.rot\[2\])/, 'mod.hasRotation(this.rot) || this.objType == "LADDER"') // rotation rounding, show ladder hitbox
        .patch(/(if\(this\.realHitbox)/, 'if(this.objType=="LADDER") { this.realHitbox.position.y -= this.realHitbox.scale.y;this.realHitbox.scale.y *= 2}$1') // recalculate ladder hitbox
        .patch(/(hitBoxMaterial=new .*?)16711680/, '$1 0x4c2ac7') // hitbox colour
        .patch(/(if\(this\.faceSelection.*?)\}/, '$1; this.updateObjConfigGUI(); }') // update gui at face selection click

    String.prototype.patch = undefined;

    code = `${Mod.toString()}\nmod = new Mod('${GM.info.script.version}');${code}`;

    unsafeWindow.code = code;
    window.eval(code);

    document.title += "+";
    const favicon = document.querySelector('link[rel~="icon"]');
    const clone = favicon.cloneNode(true);
    clone.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAACgoKD09PTJgdQ1ugRCNo02Qr2mUvXmTy/8AAKmys9Hc3////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM3i5YIAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAVklEQVQoU4XM0Q6AIAxDUVcdA7b//92KxBAiUe/jSdqN3HtklBLkK0SrQcSActeAzDmtME1Is5TMxukDABHrXStgAhG0OtR6HLV+gbuqu4jqHywTADgBgTMo+Z94RQQAAAAASUVORK5CYII=';
    favicon.parentNode.removeChild(favicon);
    document.head.appendChild(clone);

    console.log("Done");
}
