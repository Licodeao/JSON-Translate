"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExitAnswer = exports.createTargetLangAnswer = exports.createSourceLangAnswer = exports.createTimeoutAnswer = exports.createSaltAnswer = exports.createAppSercetAnswer = exports.createAppIdAnswer = exports.createPathAnswer = exports.createSelectAnswer = void 0;
const { input, select, Separator } = require("@inquirer/prompts");
function createSelectAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield select({
            message: "Select a translate mode",
            choices: [
                {
                    name: "Baidu",
                    value: "Baidu",
                    description: "Use Baidu Translator Mode",
                },
                {
                    name: "Netease",
                    value: "Netease",
                    description: "Use Netease Youdao Translator Mode",
                },
                {
                    name: "Slef-copy(ZH-CN.json)",
                    value: "slef-copy",
                    description: "Slef-copy zh-cn.json Mode",
                },
                {
                    name: "Exit",
                    value: "exit",
                    description: "Exit the CLI",
                },
                new Separator(),
                {
                    name: "ChatGPT",
                    value: "ChatGPT",
                    disabled: "(ChatGPT is on road...)",
                },
            ],
        });
        return instance;
    });
}
exports.createSelectAnswer = createSelectAnswer;
function createPathAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your translate path",
            validate: (value) => {
                if (value.length === 0) {
                    return "Please input your translate path";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createPathAnswer = createPathAnswer;
function createAppIdAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your appId",
            validate: (value) => {
                if (value.length === 0) {
                    return "Please input your appId";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createAppIdAnswer = createAppIdAnswer;
function createAppSercetAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your appSercet",
            validate: (value) => {
                if (value.length === 0) {
                    return "Please input your appSercet";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createAppSercetAnswer = createAppSercetAnswer;
function createSaltAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your salt",
            validate: (value) => {
                if (value.length === 0 || !/^\d+$/.test(value)) {
                    return "Please input correct salt";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createSaltAnswer = createSaltAnswer;
function createTimeoutAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your timeout",
            validate: (value) => {
                if (value.length === 0 || !/^\d+$/.test(value)) {
                    return "Please input correct timeout";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createTimeoutAnswer = createTimeoutAnswer;
function createSourceLangAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your sourceLang",
            validate: (value) => {
                if (value.length === 0 ||
                    typeof value !== "string" ||
                    /^\d+$/.test(value)) {
                    return "Please input correct sourceLang";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createSourceLangAnswer = createSourceLangAnswer;
function createTargetLangAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield input({
            message: "Input your targetLang",
            validate: (value) => {
                if (value.length === 0 ||
                    typeof value !== "string" ||
                    /^\d+$/.test(value)) {
                    return "Please input correct targetLang";
                }
                else {
                    return true;
                }
            },
        });
        return instance;
    });
}
exports.createTargetLangAnswer = createTargetLangAnswer;
function createExitAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield select({
            message: "Are you sure to exit?",
            choices: [
                {
                    name: "Yes",
                    value: "yes",
                    description: "Exit the CLI",
                },
                {
                    name: "No",
                    value: "no",
                    description: "Continue to the CLI",
                },
            ],
        });
        return instance;
    });
}
exports.createExitAnswer = createExitAnswer;
