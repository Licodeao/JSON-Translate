const fs = require("fs");
const path = require("path");
const cryptos = require("crypto");
const axios = require("axios");

/**
 *
 * @param path: json文件路径
 * @param appid: 你所申请的百度翻译appid
 * @param salt: 随机数
 * @param miyao: 你所根据百度翻译api指引生成的密钥
 */
export async function translateText(
  path: string,
  appid: string,
  salt: string,
  miyao: string
): Promise<void> {
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
        const md5 = cryptos.createHash("md5");
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
          console.log(`当前中文字符：${key}为undefined, 重新翻译中...`);
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
  fs.writeFileSync(path, newSource);
  console.log("所有中文已翻译完成...");
}

// Just Uncomment the following code and pass in the corresponding parameters
// translateText(path, appid, salt, miyao);
