const matrixToString = (matrix) => {
    return matrix.map((elem) => elem.join('')).join(' ');
}

const toLatex = (matrix) => {
    let str = "";
    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = 0; i < matrix.length; i++) {
            if (i === matrix.length - 1) {
                str += matrix[i][j];
            } else {
                str += matrix[i][j] + "&";
            }
        }
        str += "\\\\";
    }
    return str;
};
const torLatex = (matrix) => {
    let str = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (j === matrix[0].length - 1) {
                str += matrix[i][j];
            } else {
                str += matrix[i][j] + "&"
            }
        }
        str += "\\\\";
    }
    return str;
};
function renderParityCheckMatrix(H, r, zi, z) {
    let text = `z = H r =
        \\begin{pmatrix}
        ${torLatex(H)} 
        \\end{pmatrix}
        \\begin{pmatrix}
        ${toLatex(r)}
        \\end{pmatrix}
        =\\begin{pmatrix}
        ${toLatex(zi)} 
        \\end{pmatrix}
        =\\begin{pmatrix}
        ${toLatex(z)}
        \\end{pmatrix}`

    katex.render(text, document.getElementById("parityCheckFormula"), {
        throwOnError: true
    });
}
function renderTransmitDataMatrix(G, p, xi, x) {
    let pFormula = `
    p = \\begin{pmatrix}
        d1\\\\d2\\\\d3\\\\d4  
    \\end{pmatrix} = 
    \\begin{pmatrix}
        ${toLatex(p)}
    \\end{pmatrix}`

    let xFormula = `x = G ^ {T} p =
    \\begin{pmatrix}
    ${torLatex(G)}
    \\end{pmatrix}
    \\begin{pmatrix}
    ${toLatex(p)}
    \\end{pmatrix}
    =\\begin{pmatrix}
    ${toLatex(xi)}
    \\end{pmatrix}
    =\\begin{pmatrix}
    ${toLatex(x)}
    \\end{pmatrix}
    `
    katex.render(pFormula, document.getElementById("pFormula"), {
        throwOnError: true
    });
    katex.render(xFormula, document.getElementById("encodingFormula"), {
        throwOnError: true
    });

    document.getElementById("encodedValue").innerText = matrixToString(x);
    document.getElementById("msgValue").innerText = matrixToString(p);
}
function renderErrorBits(errorBits) {
    document.getElementById("errorBits").innerText = errorBits;
}