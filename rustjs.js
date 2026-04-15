const rustjs = {};
rustjs.init = function() {
    return;
}
rustjs.convert = function(code) {
    let out = code;
    /* printing */
    out = out.replace(/\bprintln!\s*\((.*?)\)/g, "console.log($1)");
    /* variables */
    out = out.replace(/\blet\s+mut\s+/g, "let ");
    out = out.replace(/\blet\s+/g, "const ");
    /* types */
    out = out
        .replace(/:\s+i32\b/g, "")
        .replace(/:\s+f64\b/g, "")
        .replace(/:\s+char\b/g, "")
        .replace(/:\s+&str\b/g, "")
        .replace(/:\s+bool\b/g, "");
    /* if/else */
    out = out
        .replace(/\bif\s+([^{]+)\s*\{/g, "if ($1) {")
        .replace(/\belse\s+if\s+([^{]+)\s*\{/g, "else if ($1) {")
        .replace(/\belse\s*\{/g, "else {");
    /* if expression */
    out = out.replace(
        /let\s+(\w+)\s*=\s*if\s+(.+?)\s*\{\s*(.+?)\s*\}\s*else\s*\{\s*(.+?)\s*\}/g,
        "let $1 = $2 ? $3 : $4;"
    );
    /* functions */
    out = out.replace(/\bfn\b/g, "function");
    out = out.replace(/\b->\b/, "=>")
    out = out.replace(
        /fn\s+(\w+)\s*\((.*?)\)\s*\{([\s\S]*?)\}/g,
        (match, name, params, body) => {

            let lines = body.trim().split("\n");

            // find last meaningful line
            for (let i = lines.length - 1; i >= 0; i--) {
            let line = lines[i].trim();

            if (!line) continue;

            // if no semicolon → treat as return value
            if (!line.endsWith(";")) {
                lines[i] = "return " + line;
            }

            break;
            }

            return `function ${name}(${params}) {\n${lines.join("\n")}\n}`;
        }
        );
    /* match */
    out = out
        .replace(/\bmatch\s+(\w+)\s*\{/g, "switch ($1) {")
        .replace(/_\s*=>\s*([^,]+),/g, "default: $1; break;")
        .replace(/(\w+)\s*=>\s*([^,]+),/g, "case $1: $2; break;");
    /* loops */
    out = out.replace(/\bloop\s*\{/g, "while (true) {");
    /* while loops */
    out = out.replace(/\bwhile (.+?) { (.+?) } /g, "while ($1) { $2 }")
    return out;
}