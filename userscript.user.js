// ==UserScript==
// @name         Krunker Editor+
// @version      2.3
// @description  Custom features for the Krunker Map Editor
// @updateURL    https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @downloadURL  https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @author       Jakob#8686
// @include      /^(https?:\/\/)?(www\.)?(.+)krunker\.io\/editor\.html/
// @run-at       document-start
/* globals $, KE, GUI, mod, windows */
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

GM_addStyle('#objSearch { width: 180px; float: right; margin: 0 10px 0 10px }');

class Mod {
    constructor(version) {
        this.version = version;
        this.hooks = {
            assets: null,
            utils: null,
        };
        this.defaultSettings = null;
        this.settings = {
            selectBehindInvis: true,
        };
        this.defaultConfig = {};
    }


    setupSettings() {
        windows[2].tabNames.push("Editor+");
        GUI._window.settings["editor+"] = {
            gen: () => {
                GUI._window.settings["editor+"].blueprint = {
                    selectBehindInvis: {
                        name: "Select objects through invisible ones [ALT]",
                        object: mod.settings,
                        key: "selectBehindInvis",
                        type: "switch",
                        onChange: (e, n) => mod.setSettings("selectBehindInvis", n)
                    }
                };
                return GUI._build(["_window", "settings", "editor+", "blueprint"]);
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

        rot = new KE.THREE.Euler().set(...rot).reorder("YXZ").toVector3().toArray();
        rot = rot.map(r => r.round(4));
        rot[1] = rot[1] % Math.PI.round(4);

        return rot.some(r => r % (2 * Math.PI).round(4) != 0);
    }

    radToDeg(arr) {
        if (!arr) return arr;
        return (KE.settings.degToRad ? arr.map(r => r * 180 / Math.PI) : arr)
            .map(r => Math.abs(r) < 1e-10 ? 0 : r.round(6));
    }

    onEditorInit() {
        this.setupSettings();
        this.addShortcuts();
        this.patchQuickAdd();

        this.defaultConfig.mapConfig = JSON.parse(JSON.stringify(KE.mapConfig));
        this.defaultConfig.serverConfig = JSON.parse(JSON.stringify(KE.serverConfig));
        this.defaultConfig.gameConfig = JSON.parse(JSON.stringify(KE.gameConfig));
        this.defaultConfig.objConfig = JSON.parse(JSON.stringify(KE.objConfig));

        KE._regenAll = KE.regenAll;
        KE.regenAll = (...args) => {
            KE._regenAll(...args);
            GUI.panel.left.essential.show();
        }

        KE.createPlaceholder = () => {
            const pos = KE.camera.getWorldPosition();
            KE.addObject(ObjectInstance.defaultFromType(35, [Math.round(pos.x), Math.round(pos.y - 10), Math.round(pos.z)]));
        };

        KE.faces = ["+X: Right", "-X: Left", "+Y: Top", "-Y: Bottom", "-Z: Back", "+Z: Front"]

        GUI._html.input.fixed._vector3 = GUI._html.input.fixed.vector3;
        GUI._html.input.fixed.vector3 = (e, n = "", r = [0, 0, 0], i = "", a = "", o = "") => {
            if (e === "Rotation") r = mod.radToDeg(r);
            return GUI._html.input.fixed._vector3(e, n, r, i, a, o);
        }

        KE._clearMap = KE.clearMap;
        KE.clearMap = () => {
            Object.assign(KE.mapConfig, mod.defaultConfig.mapConfig);
            Object.assign(KE.serverConfig, mod.defaultConfig.serverConfig);
            Object.assign(KE.gameConfig, mod.defaultConfig.gameConfig);
            Object.assign(KE.objConfig, mod.defaultConfig.objConfig);

            KE._clearMap();
        };

        KE.raycaster._intersectObjects = KE.raycaster.intersectObjects;
        KE.raycaster.intersectObjects = (e, t, n) => {
            if (event.altKey && mod.settings.selectBehindInvis) e = e.filter(x => x.userData.owner.visible && x.userData.owner.objType != "PLACEHOLDER");
            return KE.raycaster._intersectObjects(e, t, n);
        }

        KE._fixHitbox = KE.fixHitbox;
        KE.fixHitbox = e => {
            if (e = e || KE.objectSelected()) {
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

            return KE._fixHitbox(e);
        }
    }

    patchQuickAdd() {
        windows[3]._gen = windows[3].gen;
        windows[3].gen = function() {
            if (!windows[3].originalButtons) windows[3].originalButtons = [...KE.settings.quickAddButtons];
            else KE.settings.quickAddButtons = [...windows[3].originalButtons];

            return windows[3]._gen().replace('</div>',
                `</div><input type='text' id='objSearch' class='smlInput' autofocus placeholder='Search' onkeyup='windows[3].search()' />`);
        }

        windows[3].hideScroll = false;
        windows[3].search = function() {
            let buttons = [...windows[3].originalButtons];
            const search = document.getElementById("objSearch").value.toUpperCase();

            if (search.length) {
                const prefabs = mod.hooks.assets.prefabs.filter(p => p.name.indexOf(search) != -1).sort((a, b) => a.name.length - b.name.length);
                const prefabNames = prefabs.map(p => p.name);
                const btnNames = buttons.filter(btn => btn.name).map(btn => btn.name.toUpperCase().replace(' ', '_'));

                prefabs.forEach(p => {
                    if (!btnNames.includes(p.name)) {
                        buttons.push({
                            name: mod.hooks.utils.formatConstName(p.name),
                            desc: '',
                            item: p.id,
                            size: 0.5,
                        });
                    }
                });

                buttons = buttons.filter(btn => btn.name && prefabNames.includes(btn.name.toUpperCase().replace(' ', '_')));
            }

            if (window.event && window.event.keyCode == 13 && buttons.length) return windows[3].clickButton(0);

            KE.settings.quickAddButtons = buttons;
            const html = windows[3]._gen();

            document.getElementsByClassName("buttonGrid")[0].innerHTML = html.substr(html.indexOf('buttonGrid') + 12, html.length - 6);
        };
    }

    flipXZ(e = null) {
        if (e = e || KE.objectSelected()) {
            [e.scale.x, e.scale.z] = [e.scale.z, e.scale.x];
            KE.updateObjConfigGUI();
        }
    }

    createNearObject(id) {
        if (mod.hooks.assets.prefabs[id].name == "CUSTOM_ASSET") return KE.viewAssets();

        let t = new KE.THREE.Vector3(0, -5, -30);
        t.applyQuaternion(KE.camera.getWorldQuaternion());
        let n = KE.camera.getWorldPosition();
        n.add(t.multiplyScalar(1));
        KE.addObject(ObjectInstance.defaultFromType(id, [Math.round(n.x), Math.round(n.y), Math.round(n.z)]));
    }

    addShortcuts() {
        windows[0].tabNames.push("Editor+");
        GUI._window.controls["editor+"] = {
            gen: () => {
                let e = ["_window", "controls", "editor+"];
                const controls = {
                    shading: {
                        name: "Toggle shading",
                        object: { val: "Shift + B" },
                        key: "val",
                        type: "key"
                    },
                    quickadd: {
                        name: "Quick add",
                        object: { val: "X" },
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

                GUI._window.controls["editor+"].blueprint = controls;
                return GUI._build(["_window", "controls", "editor+", "blueprint"]);
            }
        }

        const actions = {
            'c': _ => this.createNearObject(0),
            'g': _ => this.createNearObject(24),
            'r': _ => this.createNearObject(29),
            't': _ => this.createNearObject(27),
            'f': _ => this.flipXZ(),
            'x': _ => window.showWindow(4),
            // shift:
            'B': _ => KE.toggleProp("ambient"),
        };

        window.onkeydown = e => {
            if (e.key === 'Escape') return window.closeWindow();

            if (!KE.isTyping(e) && KE.enabled) {
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

let observer, listener;

function patch(elem) {
    document.removeEventListener('beforescriptexecute', listener);
    observer.disconnect();
    elem.textContent = replaceCode(elem.textContent);
    replaceFavicon();
    console.log('Editor+ loaded')
}

observer = new MutationObserver(mutations => {
    for (const { addedNodes } of mutations) {
        for (const node of addedNodes) {
            if (node.textContent && node.textContent.includes('KE=')) return patch(node);
        }
    }
});

listener = e => {
    if (e.target && e.target.textContent.includes('KE=')) patch(e.target);
};

observer.observe(document, { childList: true, subtree: true });
document.addEventListener('beforescriptexecute', listener);

function replaceFavicon() {
    document.title += '+';
    const favicon = document.querySelector('link[rel~="icon"]');
    const clone = favicon.cloneNode(true);
    clone.href =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABpUExURQAAAF1CMx4cFRkRDRMNChwXEql4XcKmij09PSgoKP///94l/+Za/+EA/7MA4LKsqhhid8wA/98w/9kA/9QA/8UA/9sA/94o/9/X1B57let+/+UA/94A/+JG/8gA/8UA8uE6/+lx/wAAANWhP1kAAAAjdFJOU/////////////////////////////////////////////8AZimDlgAAAAlwSFlzAAAOwAAADsABataJCQAAAHZJREFUKFN1zNsOgyAMgOGJQmsn84QOD5tb3/8hBSLEG/6LJnxpeTAXIb7Kgy8HzEKUpRBVlQcplZISIAGAUuAKgFjX/gFAz4YQ76BfEdq264io124kGEYzTfP4DmDtsqybA7N/Erjtr4knHqwlfcRPL/j9CfEE7lUQU0+xIVUAAAAASUVORK5CYII=';
    document.head.appendChild(clone);
}

class Patcher {
    constructor(text) {
        this.text = text;
    }

    replace(searchValue, newValue) {
        if (typeof searchValue === 'string' && this.text.indexOf(searchValue) !== -1 || this.text.search(searchValue) !== -1) {
            this.text = this.text.replace(searchValue, newValue);
        } else {
            console.warn('Couldn\'t find in code: ', searchValue);
        }
        return this;
    }
}

function replaceCode(code) {
    code = new Patcher(code)
        .replace(/(ASSETS=.*?)(function)/, '$1mod.hooks.assets=ASSETS;mod.hooks.utils=UTILS;$2')
        .replace(/(window\.GUI=).*?removePrivKeys\((\w+)\)/g, '$1$2')
        .replace(/(KE=new Editor.*?\))/, '$1;mod.onEditorInit()')
        .replace(/(\w\.[ps]=\w\.[ps]\.map\((\w)=>)Math\.round\(\w\)/g, '$1$2.round(3)') // round pos/size to 0.001 on serialization
        .replace(/(\w\.r=\w\.map\((\w)=>e.round\()2\)/, '$14)') // round rotation to 0.0001 on serialization
        .replace('if(this.prefab.dontRound){', 'if(true){') // always dontRound
        .replace(/(this\.texOff.)\.round\(1\)/g, '$1') // remove texture offset rounding
        .replace(/(key:"texOff[XY]",.*?)\.1/g, '$1.01') // texture offset precision
        .replace(/(0\!\=this\.rot\[0\]\|\|0\!\=this\.rot\[1\]\|\|0\!\=this\.rot\[2\])/, 'mod.hasRotation(this.rot) || this.objType == "LADDER"') // rotation rounding, show ladder hitbox
        .replace(/(if\(this\.realHitbox)/, 'if(this.objType=="LADDER") { this.realHitbox.position.y -= this.realHitbox.scale.y;this.realHitbox.scale.y *= 2}$1') // recalculate ladder hitbox
        .replace(/(hitBoxMaterial=new .*?)16711680/, '$1 0x4c2ac7') // hitbox colour
        .replace(/(if\(this\.faceSelection.*?)\}/, '$1; this.updateObjConfigGUI(); }') // update gui at face selection click
        .replace(/("editCustomKey".*?map.*?(\w+).*?value:)\w+/, '$1$2') // fix group editing
        .text;

    return `${Mod.toString()}\nmod = new Mod('${GM.info.script.version}');${code}`;
}