import { fs, cryptoModule, axios } from "./index";
import type { ModeOptions } from "./types";

export async function BaiduTranslator(options: ModeOptions) {
  const {
    path,
    appid,
    appSecret,
    salt = "1435660288",
    timeout,
    sourceLang,
    targetLang,
  } = options;

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
}
