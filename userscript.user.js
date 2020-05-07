// ==UserScript==
// @name         Krunker Editor+
// @version      0.7
// @description  Custom features for the Krunker Map Editor
// @updateURL    https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @downloadURL  https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @author       Jakob#8686
// @include      /^(https?:\/\/)?(www\.)?(.+)krunker\.io\/editor\.html/
// @run-at       document-start
/* globals $, dat */
// ==/UserScript==

function GM_addStyle(css) {
    const style = document.getElementById("GM_addStyleBy8626") || (function () {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = "GM_addStyleBy8626";
        document.head.appendChild(style);
        return style;
    })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

GM_addStyle('.toast{width:200px;height:20px;height:auto;position:absolute;left:50%;margin-left:-100px;bottom:50px;background-color:#383838;color:#f0f0f0;font-family:Calibri;font-size:20px;padding:10px;text-align:center;border-radius:5px;-webkit-box-shadow:0 0 24px -1px #383838;-moz-box-shadow:0 0 24px -1px #383838;box-shadow:0 0 24px -1px #383838}');
GM_addStyle('#gui { position: absolute; top: 2px; left: 2px }');

const GM_JQ = document.createElement('script');
GM_JQ.src = 'https://code.jquery.com/jquery-3.5.0.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

class Mod {
    constructor(version) {
        this.version = version;
        this.hooks = {
            objectInstance: null,
            editor: null,
            gui: null,
            three: null
        };
        this.defaultSettings = null;
        this.settings = {
            showRealHB: false,
            selectBehindInvis: true,
        };
        this.mainMenu = null;
        this.settingsMenu = null;
        this.gui = null;

        document.body.innerHTML += '<div class="toast" style="display:none"></div>'

        this.shortcuts = {
            'c': _ => this.createNearObject(0),
            'g': _ => this.createNearObject(24),
            'r': _ => this.createNearObject(29),
            't': _ => this.createNearObject(27),
            // shift:
            'B': _ => window.T3D.toggleProp("ambient"),
        };
        this.addShortcuts();

        const timer = setInterval(_ => {
            if (window.T3D) {
                this.onEditorInit();
                clearInterval(timer);
            }
        }, 50);

        const user = localStorage.getItem("krunker_username");
        this.showToast(`Editor+ loaded! Enjoy${user ? ", " + user : ""} ;)`);
    }

    addGui() {
        this.gui = new dat.GUI;
        this.gui.domElement.id = 'gui';
        this.gui.width = 300;

        this.mainMenu = this.gui.addFolder("Editor+ v" + this.version);
        this.mainMenu.open();

        this.settingsMenu = this.mainMenu.addFolder("Settings");
        this.settingsMenu.add(this.settings, "selectBehindInvis").name("Ignore Invis Obj [ALT]").onChange(t => { this.setSettings('selectBehindInvis', t) });
    }

    setupSettings() {
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
        return Array.isArray(rot) && rot.reduce((r,sum) => sum+Math.round(Math.abs(r)*1e6)) != 0;
    }

    loop() {
    }

    onEditorInit() {
        const helpHTML = window.windows.filter(w => w.header == "Help")[0].gen() + "<div style='float: left;width: 50%;'><h4 style='font-size:23px;color:#aacfcf;'>Editor+</h4><p><b>c</b> = create near cube</p><p><b>t</b> = create near teleporter</p><p><b>g</b> = create near gate</p><p><b>r</b> = create near trigger</p><p><b>shift b</b> = toggle shading</p></div>";
        window.windows.filter(w => w.header == "Help")[0].gen = function () {
            return helpHTML;
        }

        window.T3D.raycaster._intersectObjects = window.T3D.raycaster.intersectObjects;
        window.T3D.raycaster.intersectObjects = (e, t, n) => {
            if (event.altKey && window.mod.settings.selectBehindInvis) e = e.filter(x => x.userData.owner.visible);
            return window.T3D.raycaster._intersectObjects(e, t, n);
        }

        this.setupSettings();
        this.addGui();
    }

    showToast(msg, duration = 3000) {
        $('.toast').stop().text(msg).fadeIn(400).delay(duration).fadeOut(400)
    }

    createNearObject(id) {
        let t = new this.hooks.three.Vector3(0, -5, -30);
        t.applyQuaternion(window.T3D.camera.getWorldQuaternion());
        let n = window.T3D.camera.getWorldPosition();
        n.add(t.multiplyScalar(1));
        window.T3D.addObject(this.hooks.objectInstance.defaultFromType(id, [Math.round(n.x), Math.round(n.y), Math.round(n.z)]))
    }

    addShortcuts() {
        window.onkeydown = e => {
            if (!window.T3D.isTyping(e) && window.T3D.enabled) {
                const fn = this.shortcuts[e.keyCode] || this.shortcuts[e.key];
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
        })
    })
})

setTimeout(_ => {
    if ((!unsafeWindow.code || !unsafeWindow.mod || !unsafeWindow.mod.hooks.editor) && confirm("Editor+ couldn't patch the script, please reload the page")) location.reload()
}, 10000);

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

function patchScript(code) {

    code = code.replace(/((\w+)\.getLineMaterial=)/, 'window.mod.hooks.objectInstance=$2;$1')
        .replace(/this\.transformControl\.update\(\)/, 'this.transformControl.update(),window.mod.hooks.editor = this,window.mod.loop()')
        .replace(/\[\],(\w+\.?\w+?).open\(\),/, '[],$1.open(),window.mod.hooks.gui=$1,')
        .replace(/(initScene=function\(\){)/, '$1window.mod.hooks.three = THREE,')
        .replace(/(t\.[ps]=t\.[ps]\.map\(e=>Math.round\()e\)/g, '$1e*1000)/1000') // round to 0.001 on serialization (generating json)
        .replace('[n.x, n.y, n.z]', '[Math.round(n.x), Math.round(n.y), Math.round(n.z)]') // round position in createObjectNear
        .replace('if(this.prefab.dontRound){', 'if(true){') // always dontRound
        .replace(/(Snapping"),1,(\d+),1/g, '$1,0.001,$2,0.001') // gui slider precision
        .replace(/(\(0,1,0\)),Math.abs\(h\)/, '$1,h') // fix group rotation
        .replace(/(0\!\=this\.rot\[0\]\|\|0\!\=this\.rot\[1\]\|\|0\!\=this\.rot\[2\])/, 'window.mod.hasRotation(this.rot) || this.objType == "LADDER"') // rotation rounding, always show hitbox for ladders
    .replace(/(if\(this\.realHitbox)/, 'if(this.objType=="LADDER") { this.realHitbox.position.y -= this.realHitbox.scale.y;this.realHitbox.scale.y *= 2}$1') // recalculate ladder hitbox
    .replace(/(hitBoxMaterial=new .*?)16711680/, '$1 0x02d10c') // replace colour

    code = `${Mod.toString()}\nwindow.mod = new Mod(${GM.info.script.version});${code}`

    let jQCount = 0;

    function GM_wait() {
        if (++jQCount == 100) {
            if (confirm("Editor+ couldn't load jQuery, please reload the page")) location.reload();
            return;
        }
        if (typeof unsafeWindow.jQuery == 'undefined') window.setTimeout(GM_wait, 100);
        else {
            unsafeWindow.code = code
            window.eval(code);

            document.title += "+";
            const favicon = document.querySelector('link[rel~="icon"]');
            const clone = favicon.cloneNode(!0);
            clone.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAACgoKD09PTJgdQ1ugRCNo02Qr2mUvXmTy/8AAKmys9Hc3////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM3i5YIAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAVklEQVQoU4XM0Q6AIAxDUVcdA7b//92KxBAiUe/jSdqN3HtklBLkK0SrQcSActeAzDmtME1Is5TMxukDABHrXStgAhG0OtR6HLV+gbuqu4jqHywTADgBgTMo+Z94RQQAAAAASUVORK5CYII=';
            favicon.parentNode.removeChild(favicon);
            document.head.appendChild(clone);

            console.log("Done");
        }
    }
    GM_wait();
}
