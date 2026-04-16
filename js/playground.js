const runBtn = document.getElementById("run");
const terminal = document.getElementById("terminal");
const jsWindow = document.getElementById("js");
const terminalTab = document.getElementById("tab1");
const jsTab = document.getElementById("tab2");

rustjs.init();

function runJS(code, outputEl) {
    const logs = [];

    // isolated console
    const consoleProxy = {
        log: (...args) => logs.push(args.join(' ')),
        error: (...args) => logs.push('[error] ' + args.join(' '))
    };

    try {
        // IMPORTANT: no closure over window or local scope
        const fn = new Function(
            'console',
            `
            "use strict";
            ${code}
            `
        );

        fn(consoleProxy);

    } catch (err) {
        logs.push(err.toString());
    }

    outputEl.textContent = logs.join('\n');
}

let result;
let jsOut;

let output = 1;

function runCode() {
    editorCode = editor.getValue();
    switch (output) {
        case 1:
            let converted = rustjs.convert(editorCode);
            runJS(converted, terminal);
            result = terminal.textContent;
            break;
        case 2:
            terminal.textContent = rustjs.convert(editorCode);
            jsOut = terminal.textContent;
    }
}

function switchTabs(id) {
    if (!id) return;
    terminal.textContent = "";
    switch (id) {
        case 1:
            terminalTab.classList.add("active");
            jsTab.classList.remove("active");
            terminal.textContent = result;
            output = 1;
            break;
        case 2:
            terminalTab.classList.remove("active");
            jsTab.classList.add("active");
            terminal.textContent = jsOut;
            output = 2;
    }
}

terminalTab.addEventListener("click", () => switchTabs(1));
jsTab.addEventListener("click", () => switchTabs(2));

runBtn.addEventListener("click", () => runCode())
