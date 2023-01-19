"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dtos {
}
exports.default = Dtos;
Dtos.userDTO = (data) => {
    let user = data.toJSON();
    delete user.password;
    return Object.assign({}, user);
};
