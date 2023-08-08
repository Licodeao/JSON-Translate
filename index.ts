const fs = require("fs");
const axios = require("axios");
const cryptoModule = require("crypto");

function truncate(q: string) {
  let len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

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
async function translateText(
  path: string,
  appid: string,
  appSecret: string,
  salt: string | number = "1435660288",
  timeout: number,
  sourceLang: string,
  targetLang: string
): Promise<void> {
  if (appid.length === 17) {
    // 使用百度API
    const source = fs.readFileSync(path);
    const sourceObj = JSON.parse(source);
    // 存储翻译结果
    const translations: [string, string][] = [];
    // 翻译缓存
    const cache: Record<string, string> = {};
    for (const [key, _] of Object.entries(sourceObj)) {
      if (cache[key]) {
        translations.push([key, cache[key]]);
      } else {
        let dst: string | undefined;
        while (!dst) {
          const sign = `${appid}${key}${salt}${appSecret}`;
          const md5 = cryptoModule.createHash("md5");
          const hash = md5.update(sign).digest("hex");
          const res = await axios.get(
            "https://fanyi-api.baidu.com/api/trans/vip/translate",
            {
              params: {
                q: key,
                from: sourceLang,
                to: targetLang,
                appid,
                salt,
                sign: hash,
              },
            }
          );
          [dst] = res.data.trans_result || [];
          if (!dst) {
            console.log(`当前中文字符：${key}为undefined, 重新翻译中...`);
            await new Promise((resolve) => setTimeout(resolve, timeout));
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
  } else {
    // 使用有道云API
    const source = fs.readFileSync(path);
    const sourceObj = JSON.parse(source);
    // 存储翻译结果
    const translations: [string, string][] = [];
    // 翻译缓存
    const cache: Record<string, string> = {};
    for (const [key, _] of Object.entries(sourceObj)) {
      if (cache[key]) {
        translations.push([key, cache[key]]);
      } else {
        let dst: string | undefined;
        const currentTime = Math.round(new Date().getTime() / 1000);
        const signString =
          appid + truncate(key) + salt + currentTime + appSecret;
        while (!dst) {
          const sign = cryptoModule.createHash("sha256");
          const hash = sign.update(signString).digest("hex");
          try {
            const res = await axios.get("https://openapi.youdao.com/api", {
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
              await new Promise((resolve) => setTimeout(resolve, timeout));
            }
          } catch (error) {
            if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.message);
            }
            if (
              error.response &&
              (error.response.data.errorCode === "207" || "411")
            ) {
              console.log("请求过于频繁，等待一段时间后重试...");
              await new Promise((resolve) => setTimeout(resolve, 5000));
            } else {
              console.log(`翻译失败，错误信息：${error.message}`);
              break;
            }
          }
        }
        console.log(key, dst);
        translations.push([key, dst as string]);
        cache[key] = dst as string;
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
}
