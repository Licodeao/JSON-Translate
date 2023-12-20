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
const BaiduMode_1 = require("./BaiduMode");
const NeteaseMode_1 = require("./NeteaseMode");
/**
 *
 * @param path 需要翻译的json文件
 * @param appid 百度翻译API的key / 有道云翻译API的appKey
 * @param appSecret 百度翻译API的密钥 / 有道云翻译API的appSecret
 * @param salt 随机数
 * @param timeout 翻译间隔时间
 * @param sourceLang 源语言
 * @param targetLang 目标语言
 */
function translateText(path, appid, appSecret, salt = "1435660288", timeout, sourceLang, targetLang) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            path,
            appid,
            appSecret,
            salt,
            timeout,
            sourceLang,
            targetLang,
        };
        if (appid.length === 17) {
            (0, BaiduMode_1.BaiduTranslator)(params);
        }
        else {
            (0, NeteaseMode_1.NeteaseTranslator)(params);
        }
    });
}
