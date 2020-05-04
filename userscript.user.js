// ==UserScript==
// @name         Krunker Editor+
// @version      0.1
// @description  Custom shortcuts. rounding pos/rot/size to 0.001, Javascript interface
// @updateURL    https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @downloadURL  https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @author       Jakob#8686
// @include      /^(https?:\/\/)?(www\.)?(.+)krunker\.io\/editor\.html/
// @run-at       document-start
/* globals $ */
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

GM_addStyle('.toast{width:200px;height:20px;height:auto;position:absolute;left:50%;margin-left:-100px;bottom:50px;background-color:#383838;color:#f0f0f0;font-family:Calibri;font-size:20px;padding:10px;text-align:center;border-radius:5px;-webkit-box-shadow:0 0 24px -1px #383838;-moz-box-shadow:0 0 24px -1px #383838;box-shadow:0 0 24px -1px #383838}');

var GM_JQ = document.createElement('script');
GM_JQ.src = 'https://code.jquery.com/jquery-3.5.0.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
document.title += "+";

class Mod {
    constructor() {
        this.hooks = {
            objectInstance: null,
            editor: null,
            gui: null,
            three: null
        };
        document.getElementById("infoContainer").innerHTML += '<div id="ownerInfo" class="info" style="position:fixed;top:0;color:steelblue">Editor+</div>';// by jakkkky</div>';
        document.getElementById("exportMap").outerHTML += '<div id="copyMap" class="bottomButton">Copy to Clipboard</div>';

        $(document).on('click', '#copyMap', e => {
            this.hooks.editor.copyToClipboard(this.hooks.editor.getMapExport());
            this.showToast("Copied", 1000);
        });
        $(document).on('click', '#ownerInfo', e => alert(1));

        document.body.innerHTML += '<div class="toast" style="display:none"></div>'

        this.shortcuts = {'c': _=> this.createNearObject(0),
                          'g': _=> this.createNearObject(24),
                          'r': _=> this.createNearObject(29),
                          't': _=> this.createNearObject(27),
                          // shift:
                          'B': _=> this.toggleObjConfig("ambient"),
                          'C': _=> this.toggleObjConfig("collidable"),
                          'V': _=> this.toggleObjConfig("visible")
                         };
        this.addShortcuts();

        setTimeout(_=>
                   window.windows.filter(w=>w.header=="Help")[0].gen = function() {
            return "<h2 style='color:white;'>Keyboard Shortcuts</h2><div style='float: left;width: 50%;'><h3 style='color:#ffb6b6;'>Default</h3><p><b>w/up</b> = fly forward</p><p><b>s/back</b> = fly backward</p><p><b>a/left</b> = fly left</p><p><b>d/right</b> = fly right</p><p><b>q</b> = fly down</p><p><b>e</b> = fly up</p><p><b>shift</b> = hold to fly faster</p><p><b>1</b> = translate</p><p><b>2</b> = rotate</p><p><b>3</b> = scale</p><p><b>delete/backspace</b> = delete element</p><p><b>`</b> = toggle world/local space</p><p><b>control</b> = hold to toggle snapping</p></div><div style='float: left;width: 50%;'><h3 style='color:#fde2e2;'>Advanced</h3><p><b>p</b> = create placeholder</p><p><b>shift f</b> = hitbox fixer</p><p><b>shift alt g</b> = remove all groups</p><p><b>shift g</b> = create group / remove group if exist</p><p><b>shift r</b> = duplicate group/object</p><p><b>ctrl c</b> = copy group</p><p><b>ctrl v</b> = paste group</p><p><b>ctrl z</b> = undo</p><p><b>ctrl y & shift ctrl z</b> = redo</p><p><b>shift click import</b> = import from file</p><p><b>shift click (w/ Objectpainter)</b> = paste preset json</p></div><div style='float: left;width: 50%;'><h4 style='font-size:23px;color:#aacfcf;'>Mod Keybinds</h4><p><b>c</b> = create near cube</p><p><b>t</b> = create near teleporter</p><p><b>g</b> = create near gate</p><p><b>r</b> = create near trigger</p><p><b>shift + v</b> = toggle visibility</p><p><b>shift + c</b> = toggle collidability</p><p><b>shift + b</b> = toggle shading</p></div>";
        }, 50);

        var user = localStorage.getItem("krunker_username");
        this.showToast(`Editor+ loaded! Enjoy${user ? ", " + user : ""} ;)`);
    }

    showToast(msg, duration=3000) {
        $('.toast').stop().text(msg).fadeIn(400).delay(duration).fadeOut(400)
    }

    toggleObjConfig(propertyName) {
        if (this.hooks.editor.objectSelected()) {
            this.hooks.editor.objectSelected().userData.owner[propertyName] = !this.hooks.editor.objectSelected().userData.owner[propertyName]; // obj
            this.hooks.editor.objConfig[propertyName] = !this.hooks.editor.objConfig[propertyName]; // gui
        }
    }

    createNearObject(id) {
        let t = new this.hooks.three.Vector3(0,-5,-30);
        t.applyQuaternion(this.hooks.editor.camera.getWorldQuaternion());
        let n = this.hooks.editor.camera.getWorldPosition();
        n.add(t.multiplyScalar(1));
        this.hooks.editor.addObject(this.hooks.objectInstance.defaultFromType(id, [n.x, n.y, n.z]))
    }

    loop() {
    }

    addShortcuts() {
        window.addEventListener("keydown", e=> {
            if (!this.hooks.editor.isTyping(e) && this.hooks.editor.enabled) {
                var fn = this.shortcuts[e.keyCode] || this.shortcuts[e.key];
                if (!e.ctrlKey && fn) {
                    fn();
                    return false;
                }
            }
        });
    }
}

console.log("Patching script...");
const observer = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
            if(node.nodeType === 1 && node.tagName === 'SCRIPT' && (node.textContent.includes("Yendis") || node.type == "text/javascript")) {
                observer.disconnect();
                node.type = 'javascript/blocked';
                const beforeScriptExecuteListener = e => {
                    if (node.getAttribute('type') === 'javascript/blocked') event.preventDefault();
                    node.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
                }
                node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);

                if (node.textContent) {
                    patchScript(node);
                } else {
                    var i = setInterval(x => {
                        if (node.textContent) {
                            clearInterval(i);
                            patchScript(node);
                        }
                    }, 100);
                }
                return;
            }
        })
    })
})

setTimeout(_=> {
    if ((!unsafeWindow.code || !unsafeWindow.mod || !unsafeWindow.mod.hooks.editor) && confirm("Editor+ couldn't patch the script, please reload the page")) location.reload()
}, 5000);

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

window.addEventListener('load', function() {
    var favicon = document.querySelector('link[rel~="icon"]');
    var clone = favicon.cloneNode(!0);
    clone.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAACgoKD09PTJgdQ1ugRCNo02Qr2mUvXmTy/8AAKmys9Hc3////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM3i5YIAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAVklEQVQoU4XM0Q6AIAxDUVcdA7b//92KxBAiUe/jSdqN3HtklBLkK0SrQcSActeAzDmtME1Is5TMxukDABHrXStgAhG0OtR6HLV+gbuqu4jqHywTADgBgTMo+Z94RQQAAAAASUVORK5CYII=';
    favicon.parentNode.removeChild(favicon);
    document.head.appendChild(clone);
}, false);

function patchScript(node) {
    let code = `${Mod.toString()}\nwindow.mod = new Mod();${node.textContent}`;

    code = code.replace(/((\w+).boundingNoncollidableBoxMaterial=new .*}\);)/, '$1 window.mod.hooks.objectInstance = $2;')
        .replace(/this\.transformControl\.update\(\)/, 'this.transformControl.update(),window.mod.hooks.editor = this,window.mod.loop()')
        .replace(/\[\],(\w+\.?\w+?).open\(\),/, '[],$1.open(),window.mod.hooks.gui=$1,')
        .replace(/(initScene=function\(\){)/, '$1window.mod.hooks.three = THREE,')
        .replace(/(t\.[ps]=t\.[ps]\.map\(e=>Math.round\()e\)/g, '$1e*1000)/1000') // disable rounding on serialization (generating json)
        .replace('[n.x, n.y, n.z]', '[Math.round(n.x), Math.round(n.y), Math.round(n.z)]') // round position in createObjectNear
        .replace('if(this.prefab.dontRound){', 'if(true){') // always dontRound
        .replace(/(Snapping"),1,(\d+),1/g, '$1,0.001,$2,0.001') // gui slider precision
        .replace(/(\(0,1,0\)),Math.abs\(h\)/, '$1,h') // fix group rotation

    var jQCount = 0;

    function GM_wait() {
        if (++jQCount == 50) {
            if (confirm("Editor+ couldn't load jQuery, please reload the page")) location.reload();
            return;
        }
        if (typeof unsafeWindow.jQuery == 'undefined') window.setTimeout(GM_wait,100);
        else {
            unsafeWindow.code = code
            window.eval(code);
            console.log("Done");
        }}
    GM_wait();
}
