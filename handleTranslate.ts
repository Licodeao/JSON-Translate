const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
import axios from "axios";

const appid = ""; // 你所申请的百度翻译appid
const salt = ""; // 随机数
const miyao = ""; // 你所根据百度翻译api指引所生成的密钥
const translatedTextPath = path.resolve(__dirname, "./en-US.json");

async function translateText(path: string): Promise<void> {
  const source = fs.readFileSync(path);
  const sourceObj = JSON.parse(source);
  // 存储翻译结果
  const translations: [string, string][] = [];
  // 翻译缓存
  const cache: Record<string, string> = {};
  for (const [key, value] of Object.entries(sourceObj)) {
    if (cache[key]) {
      translations.push([key, cache[key]]);
    } else {
      let dst: string | undefined;
      while (!dst) {
        const sign = `${appid}${key}${salt}${miyao}`;
        const md5 = crypto.createHash("md5");
        const hash = md5.update(sign).digest("hex");
        const res = await axios.get(
          "https://fanyi-api.baidu.com/api/trans/vip/translate",
          {
            params: {
              q: key,
              from: "zh",
              to: "en",
              appid,
              salt,
              sign: hash,
            },
          }
        );
        [dst] = res.data.trans_result || [];
        if (!dst) {
          console.log(`当前值：${key}为undefined, 重新翻译中...`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      console.log(key, dst);
      translations.push([key, (dst as any).dst]);
      cache[key] = (dst as any).dst;
    }
  }
  const orderedTranslations = translations.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
  const orderedSourceObj = Object.entries(sourceObj)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const newSource = JSON.stringify(
    { ...orderedSourceObj, ...orderedTranslations },
    null,
    2
  );
  fs.writeFileSync(translatedTextPath, newSource);
  console.log("所有中文已翻译完成...");
}

translateText(translatedTextPath);
