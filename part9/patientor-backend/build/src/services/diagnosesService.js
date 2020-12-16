"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = require("../../data/diagnoses");
const getAll = () => {
    return diagnoses_1.diagnoses;
};
exports.default = {
    getAll
};
