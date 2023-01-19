"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateOptions = void 0;
const paginateOptions = (req) => {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 15;
    return {
        limit: perPage,
        offset: (page - 1) * perPage,
    };
};
exports.paginateOptions = paginateOptions;
