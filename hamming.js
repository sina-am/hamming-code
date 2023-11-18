// the code generator matrix G used to generate the hamming code
const G = [
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
]

// the parity-check matrix H used to check for errors
const H = [
    [1, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 1, 1],
]

// Convert string to a matrix with fixed len
function convertToMatrix(str, len) {
    let a = [];
    for(let i = 0; i < str.length; i+=len) {
        a.push(str.slice(i, i+len).split("").map((value) => {return parseInt(value)}));
    }

    return a;
}

// Multiply two matrix
function matrixMultiply(a, b) {
    let c = [];
    let sum = 0;
    for(let i = 0; i < b.length; i++) {
        c.push([])
        for(let j = 0; j < a.length; j++) {
            sum = 0;
            for(let z = 0; z < b[i].length; z++) {
                sum += a[j][z] * b[i][z];
            }
            c[i].push(sum);
        }
    }

    return c;
}

function applyModule(a, mod) {
    b = [];
    for(let i = 0; i < a.length; i++) {
        b.push([]);
        for(let j = 0; j < a[0].length; j++) {
            b[i].push(a[i][j] % mod);
        }
    }
    return b;
}

function hammingEncode(p) {
    return applyModule(matrixMultiply(G, p), 2);
}

function parityCheck(r) {
    return applyModule(matrixMultiply(H, r), 2);
}

function checkError(r) {
    let z = parityCheck(r);
    let errorBit = 0;
    let index = 0;
    let errorLocations = [];
    for(let i = 0; i < z.length; i+=3) {
        errorBit = 0;
        for(let j = 0; j < 3; j++) {
            errorBit += Math.pow(2, j) * z[i+j]
        }

        if(errorBit !== 0) {
            errorLocations.push(index * 7 + errorBit);
        }
        index++;
    }
    
    return errorLocations;
}

