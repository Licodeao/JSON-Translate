import {
  createPathAnswer,
  createAppIdAnswer,
  createAppSercetAnswer,
  createSaltAnswer,
  createTimeoutAnswer,
  createSourceLangAnswer,
  createTargetLangAnswer,
} from "./prompt";

const BaiduTranslatorModule = require("../dist/BaiduMode.js");
const NeteaseTranslatorModule = require("../dist/NeteaseMode.js");
const handleFileModule = require("../dist/handleZhCnFile.js");

async function prompt(selectAnswer) {
  const pathAnswer = await createPathAnswer();
  const appIdAnswer = await createAppIdAnswer();
  const appSercetAnswer = await createAppSercetAnswer();
  const saltAnswer = await createSaltAnswer();
  const timeoutAnswer = await createTimeoutAnswer();
  const sourceLangAnswer = await createSourceLangAnswer();
  const targetLangAnswer = await createTargetLangAnswer();

  if (!selectAnswer) {
    throw new Error("Please select a translate mode");
  } else {
    switch (selectAnswer) {
      case "Baidu":
        try {
          await BaiduTranslatorModule.BaiduTranslator({
            path: pathAnswer,
            appid: appIdAnswer,
            appSecret: appSercetAnswer,
            salt: saltAnswer,
            timeout: timeoutAnswer,
            sourceLang: sourceLangAnswer,
            targetLang: targetLangAnswer,
          });
        } catch (e) {
          throw new Error(e);
        }
        break;
      case "Netease":
        try {
          await NeteaseTranslatorModule.NeteaseTranslator({
            path: pathAnswer,
            appid: appIdAnswer,
            appSecret: appSercetAnswer,
            salt: saltAnswer,
            timeout: timeoutAnswer,
            sourceLang: sourceLangAnswer,
            targetLang: targetLangAnswer,
          });
        } catch (e) {
          throw new Error(e);
        }
        break;
      case "slef-copy":
        try {
          await handleFileModule.handleFile({
            path: pathAnswer,
          });
        } catch (e) {
          throw new Error(e);
        }
        break;
      default:
        break;
    }
  }
}

export { prompt };
