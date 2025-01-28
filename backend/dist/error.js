"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, message) => {
    const err = new Error();
    // const status = (error as any).status;
    err.status = status;
    err.message = message;
    return err;
};
exports.createError = createError;
