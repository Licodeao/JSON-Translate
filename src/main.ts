import { BaiduTranslator } from "./BaiduMode";
import { NeteaseTranslator } from "./NeteaseMode";

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
    BaiduTranslator(params);
  } else {
    NeteaseTranslator(params);
  }
}
