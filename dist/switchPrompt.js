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
exports.prompt = void 0;
const prompt_1 = require("./prompt");
const BaiduTranslatorModule = require("../dist/BaiduMode.js");
const NeteaseTranslatorModule = require("../dist/NeteaseMode.js");
const handleFileModule = require("../dist/handleZhCnFile.js");
function prompt(selectAnswer) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathAnswer = yield (0, prompt_1.createPathAnswer)();
        const appIdAnswer = yield (0, prompt_1.createAppIdAnswer)();
        const appSercetAnswer = yield (0, prompt_1.createAppSercetAnswer)();
        const saltAnswer = yield (0, prompt_1.createSaltAnswer)();
        const timeoutAnswer = yield (0, prompt_1.createTimeoutAnswer)();
        const sourceLangAnswer = yield (0, prompt_1.createSourceLangAnswer)();
        const targetLangAnswer = yield (0, prompt_1.createTargetLangAnswer)();
        if (!selectAnswer) {
            throw new Error("Please select a translate mode");
        }
        else {
            switch (selectAnswer) {
                case "Baidu":
                    try {
                        yield BaiduTranslatorModule.BaiduTranslator({
                            path: pathAnswer,
                            appid: appIdAnswer,
                            appSecret: appSercetAnswer,
                            salt: saltAnswer,
                            timeout: timeoutAnswer,
                            sourceLang: sourceLangAnswer,
                            targetLang: targetLangAnswer,
                        });
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                    break;
                case "Netease":
                    try {
                        yield NeteaseTranslatorModule.NeteaseTranslator({
                            path: pathAnswer,
                            appid: appIdAnswer,
                            appSecret: appSercetAnswer,
                            salt: saltAnswer,
                            timeout: timeoutAnswer,
                            sourceLang: sourceLangAnswer,
                            targetLang: targetLangAnswer,
                        });
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                    break;
                case "slef-copy":
                    try {
                        yield handleFileModule.handleFile({
                            path: pathAnswer,
                        });
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                    break;
                default:
                    break;
            }
        }
    });
}
exports.prompt = prompt;
