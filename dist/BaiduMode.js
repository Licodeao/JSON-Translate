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
exports.BaiduTranslator = void 0;
const index_1 = require("./index");
const types_1 = require("./types");
/**
 * @param path 需要翻译的json文件
 * @param appid 百度翻译API的key / 有道云翻译API的appKey
 * @param appSecret 百度翻译API的密钥 / 有道云翻译API的appSecret
 * @param salt 随机数
 * @param timeout 翻译间隔时间
 * @param sourceLang 源语言
 * @param targetLang 目标语言
 */
function BaiduTranslator(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path, appid, appSecret, salt = "1435660288", timeout, sourceLang, targetLang, } = options;
        // 使用百度API
        const source = index_1.fs.readFileSync(path);
        const sourceObj = JSON.parse(source);
        // 存储翻译结果
        const translations = [];
        // 翻译缓存
        const cache = {};
        for (const [key, _] of Object.entries(sourceObj)) {
            if (cache[key]) {
                translations.push([key, cache[key]]);
            }
            else {
                let dst;
                while (!dst) {
                    const sign = `${appid}${key}${salt}${appSecret}`;
                    const md5 = index_1.cryptoModule.createHash("md5");
                    const hash = md5.update(sign).digest("hex");
                    const res = yield index_1.axios.get("https://fanyi-api.baidu.com/api/trans/vip/translate", {
                        params: {
                            q: key,
                            from: sourceLang,
                            to: targetLang,
                            appid,
                            salt,
                            sign: hash,
                        },
                    });
                    if (res.data.error_code) {
                        switch (res.data.error_code) {
                            case 52000:
                                throw new Error(types_1.BaiduErrorType.SUCCESS);
                            case 52001:
                                throw new Error(types_1.BaiduErrorType.TIMEOUT);
                            case 52002:
                                throw new Error(types_1.BaiduErrorType.SYSTEM_ERROR);
                            case 52003:
                                throw new Error(types_1.BaiduErrorType.UNAUTHORIZED_USER);
                            case 54000:
                                throw new Error(types_1.BaiduErrorType.PARAMETER_ERROR);
                            case 54001:
                                throw new Error(types_1.BaiduErrorType.SIGN_ERROR);
                            case 54003:
                                throw new Error(types_1.BaiduErrorType.ACCESS_FREQUENCY);
                            case 54004:
                                throw new Error(types_1.BaiduErrorType.ACCOUNT_BALANCE);
                            case 54005:
                                throw new Error(types_1.BaiduErrorType.QUERY_TOO_LONG);
                            case 58000:
                                throw new Error(types_1.BaiduErrorType.INVAID_IP);
                            case 58001:
                                throw new Error(types_1.BaiduErrorType.LANG_NOT_SUPPORT);
                            case 58002:
                                throw new Error(types_1.BaiduErrorType.SERVICE_NOT_SUPPORT);
                            case 90107:
                                throw new Error(types_1.BaiduErrorType.PERMISSION_NOT_SUPPORT);
                            default:
                                break;
                        }
                    }
                    [dst] = res.data.trans_result || [];
                    if (!dst) {
                        console.log(`当前字符：${key} 为undefined, 重新翻译中...`);
                        yield new Promise((resolve) => setTimeout(resolve, timeout));
                    }
                }
                console.log(`源Key: ${key}, 被翻译为: ${dst}`);
                translations.push([key, dst.dst]);
                cache[key] = dst.dst;
            }
        }
        const orderedTranslations = translations.reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
        const orderedSourceObj = Object.entries(sourceObj)
            .sort(([key1], [key2]) => key1.localeCompare(key2))
            .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
        const newSource = JSON.stringify(Object.assign(Object.assign({}, orderedSourceObj), orderedTranslations), null, 2);
        index_1.fs.writeFileSync(path, newSource);
        console.log("所有语言数据已翻译完成...");
    });
}
exports.BaiduTranslator = BaiduTranslator;
