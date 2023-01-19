"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
}
exports.default = Helpers;
_a = Helpers;
Helpers.generateRandom = (len, type) => {
    let characters;
    if (type === 'alphabets') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }
    if (type === 'numeric') {
        characters = '0123456789';
    }
    if (type === 'alphanumeric') {
        characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    const value = _a.generate(len, characters);
    return value;
};
Helpers.generate = (length, characters) => {
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
Helpers.slugifyName = (fullName) => {
    return `${fullName.replace(/ /g, '')}${_a.generateRandom(5, 'numeric')}`;
};
