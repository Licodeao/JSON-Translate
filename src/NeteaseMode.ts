import { fs, cryptoModule, axios } from "./index";
import type { ModeOptions } from "./types";

function truncate(q: string) {
  let len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export async function NeteaseTranslator(options: ModeOptions) {
  const {
    path,
    appid,
    appSecret,
    salt = "1435660288",
    timeout,
    sourceLang,
    targetLang,
  } = options;

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
      const signString = appid + truncate(key) + salt + currentTime + appSecret;
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
