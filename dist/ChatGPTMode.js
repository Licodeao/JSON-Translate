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
exports.ChatGPT_Translator = void 0;
const openai_1 = require("openai");
const index_1 = require("./index");
function ChatGPT_Translator(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sourceLang, targetLang, path, API_Key } = options;
        const openai = new openai_1.default({
            baseURL: "https://one.aiskt.com/v1",
            apiKey: API_Key,
        });
        const source = index_1.fs.readFileSync(path);
        const sourceObj = JSON.parse(source);
        const translations = [];
        const cache = {};
        for (const [key, _] of Object.entries(sourceObj)) {
            if (cache[key]) {
                translations.push([key, cache[key]]);
            }
            else {
                let dst;
                while (!dst) {
                    const completion = yield openai.completions.create({
                        model: "gpt-3.5-turbo-instruct",
                        prompt: `Translate the text: ${key} from ${sourceLang} to ${targetLang}`,
                    });
                    dst = completion.choices[0].text.replace(/\n/g, "") || "";
                    if (!dst) {
                        console.log(`当前中文字符：${key}为undefined, 重新翻译中...`);
                        yield new Promise((resolve) => setTimeout(resolve, 2000));
                    }
                    console.log(`源 Key: ${key}, 被翻译为: ${dst}`);
                    translations.push([key, dst]);
                    cache[key] = dst;
                }
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
exports.ChatGPT_Translator = ChatGPT_Translator;
