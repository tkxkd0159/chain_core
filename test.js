for (let i = 0; i <= 5; i++) {
    console.log(i);
}

function hexToBinary(s) {
    const lookupTable = {
        '0': '0000', '1': '0001', '2': '0010', '3': '0011',
        '4': '0100', '5': '0101', '6': '0110', '7': '0111',
        '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
        'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
    };

    var ret = "";
    for (var i = 0; i < s.length; i++) {
        if (lookupTable[s[i]]) { ret += lookupTable[s[i]]; }
        else { return null; }
    }
    return ret;
}

let testvall = "0".repeat(1);
console.log(hexToBinary("F427E212502AA97DCBCF0886ADFBF5B1C0E8154BB32B2FB9437F6A5B2CBAFFFD"))
console.log("mytest", testvall)