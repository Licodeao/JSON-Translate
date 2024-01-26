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
exports.NeteaseTranslator = void 0;
const index_1 = require("./index");
function truncate(q) {
    let len = q.length;
    if (len <= 20)
        return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}
/**
 * @param path 需要翻译的json文件
 * @param appid 百度翻译API的key / 有道云翻译API的appKey
 * @param appSecret 百度翻译API的密钥 / 有道云翻译API的appSecret
 * @param salt 随机数
 * @param timeout 翻译间隔时间
 * @param sourceLang 源语言
 * @param targetLang 目标语言
 */
function NeteaseTranslator(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path, appid, appSecret, salt = "1435660288", timeout, sourceLang, targetLang, } = options;
        // 使用有道云API
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
                const currentTime = Math.round(new Date().getTime() / 1000);
                const signString = appid + truncate(key) + salt + currentTime + appSecret;
                while (!dst) {
                    const sign = index_1.cryptoModule.createHash("sha256");
                    const hash = sign.update(signString).digest("hex");
                    try {
                        const res = yield index_1.axios.get("https://openapi.youdao.com/api", {
                            params: {
                                q: key,
                                appKey: appid,
                                salt: new Date().getTime(),
                                from: sourceLang,
                                to: targetLang,
                                sign: hash,
                                signType: "v3",
                                curtime: currentTime,
                            },
                        });
                        dst = res.data.translation[0] || "";
                        if (!dst) {
                            console.log(`当前中文字符：${key}为undefined, 重新翻译中...`);
                            yield new Promise((resolve) => setTimeout(resolve, timeout));
                        }
                    }
                    catch (error) {
                        if (error.response && error.response.data) {
                            console.log(error.response.data);
                        }
                        else {
                            console.log(error.message);
                        }
                        if (error.response &&
                            (error.response.data.errorCode === "207" || "411")) {
                            console.log("请求过于频繁，等待一段时间后重试...");
                            yield new Promise((resolve) => setTimeout(resolve, 5000));
                        }
                        else {
                            console.log(`翻译失败，错误信息：${error.message}`);
                            break;
                        }
                    }
                }
                console.log(key, dst);
                translations.push([key, dst]);
                cache[key] = dst;
            }
        }
        const orderedTranslations = translations.reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
        const orderedSourceObj = Object.entries(sourceObj)
            .sort(([key1], [key2]) => key1.localeCompare(key2))
            .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
        const newSource = JSON.stringify(Object.assign(Object.assign({}, orderedSourceObj), orderedTranslations), null, 2);
        index_1.fs.writeFileSync(path, newSource);
        console.log("所有中文已翻译完成...");
    });
}
exports.NeteaseTranslator = NeteaseTranslator;
