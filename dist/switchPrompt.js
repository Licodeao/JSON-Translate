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
const ChatGPT_TranslatorModule = require("../dist/ChatGPTMode.js");
function prompt(selectAnswer) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!selectAnswer) {
            throw new Error("Please select a translate mode");
        }
        else {
            switch (selectAnswer) {
                case "Baidu":
                    const pathAnswer = yield (0, prompt_1.createPathAnswer)();
                    const appIdAnswer = yield (0, prompt_1.createAppIdAnswer)();
                    const appSercetAnswer = yield (0, prompt_1.createAppSercetAnswer)();
                    const saltAnswer = yield (0, prompt_1.createSaltAnswer)();
                    const timeoutAnswer = yield (0, prompt_1.createTimeoutAnswer)();
                    const sourceLangAnswer = yield (0, prompt_1.createSourceLangAnswer)();
                    const targetLangAnswer = yield (0, prompt_1.createTargetLangAnswer)();
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
                    const _pathAnswer = yield (0, prompt_1.createPathAnswer)();
                    const _appIdAnswer = yield (0, prompt_1.createAppIdAnswer)();
                    const _appSercetAnswer = yield (0, prompt_1.createAppSercetAnswer)();
                    const _saltAnswer = yield (0, prompt_1.createSaltAnswer)();
                    const _timeoutAnswer = yield (0, prompt_1.createTimeoutAnswer)();
                    const _sourceLangAnswer = yield (0, prompt_1.createSourceLangAnswer)();
                    const _targetLangAnswer = yield (0, prompt_1.createTargetLangAnswer)();
                    try {
                        yield NeteaseTranslatorModule.NeteaseTranslator({
                            path: _pathAnswer,
                            appid: _appIdAnswer,
                            appSecret: _appSercetAnswer,
                            salt: _saltAnswer,
                            timeout: _timeoutAnswer,
                            sourceLang: _sourceLangAnswer,
                            targetLang: _targetLangAnswer,
                        });
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                    break;
                case "self-copy":
                    const selfPathAnswer = yield (0, prompt_1.createPathAnswer)();
                    try {
                        yield handleFileModule.handleFile({
                            path: selfPathAnswer,
                        });
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                    break;
                case "ChatGPT":
                    const chatgptPathAnswer = yield (0, prompt_1.createPathAnswer)();
                    const chatgptSourceLangAnswer = yield (0, prompt_1.createSourceLangAnswer)();
                    const chatgptTargetLangAnswer = yield (0, prompt_1.createTargetLangAnswer)();
                    const chatgptAnswer = yield (0, prompt_1.createChatGPTAnswer)();
                    try {
                        yield ChatGPT_TranslatorModule.ChatGPT_Translator({
                            sourceLang: chatgptSourceLangAnswer,
                            targetLang: chatgptTargetLangAnswer,
                            path: chatgptPathAnswer,
                            API_Key: chatgptAnswer,
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
