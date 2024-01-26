import { fs, cryptoModule, axios } from "./index";
import type { ModeOptions } from "./types";
import { BaiduErrorType } from "./types";

/**
 * @param path 需要翻译的json文件
 * @param appid 百度翻译API的key / 有道云翻译API的appKey
 * @param appSecret 百度翻译API的密钥 / 有道云翻译API的appSecret
 * @param salt 随机数
 * @param timeout 翻译间隔时间
 * @param sourceLang 源语言
 * @param targetLang 目标语言
 */
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

        if (res.data.error_code) {
          switch (res.data.error_code) {
            case 52000:
              throw new Error(BaiduErrorType.SUCCESS);
            case 52001:
              throw new Error(BaiduErrorType.TIMEOUT);
            case 52002:
              throw new Error(BaiduErrorType.SYSTEM_ERROR);
            case 52003:
              throw new Error(BaiduErrorType.UNAUTHORIZED_USER);
            case 54000:
              throw new Error(BaiduErrorType.PARAMETER_ERROR);
            case 54001:
              throw new Error(BaiduErrorType.SIGN_ERROR);
            case 54003:
              throw new Error(BaiduErrorType.ACCESS_FREQUENCY);
            case 54004:
              throw new Error(BaiduErrorType.ACCOUNT_BALANCE);
            case 54005:
              throw new Error(BaiduErrorType.QUERY_TOO_LONG);
            case 58000:
              throw new Error(BaiduErrorType.INVAID_IP);
            case 58001:
              throw new Error(BaiduErrorType.LANG_NOT_SUPPORT);
            case 58002:
              throw new Error(BaiduErrorType.SERVICE_NOT_SUPPORT);
            case 90107:
              throw new Error(BaiduErrorType.PERMISSION_NOT_SUPPORT);
            default:
              break;
          }
        }

        [dst] = res.data.trans_result || [];
        if (!dst) {
          console.log(`当前字符：${key} 为undefined, 重新翻译中...`);
          await new Promise((resolve) => setTimeout(resolve, timeout));
        }
      }
      console.log(`源Key: ${key}, 被翻译为: ${dst}`);
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
  console.log("所有语言数据已翻译完成...");
}
