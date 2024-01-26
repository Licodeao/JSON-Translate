import {
  createPathAnswer,
  createAppIdAnswer,
  createAppSercetAnswer,
  createSaltAnswer,
  createTimeoutAnswer,
  createSourceLangAnswer,
  createTargetLangAnswer,
  createChatGPTAnswer,
} from "./prompt";
const BaiduTranslatorModule = require("../dist/BaiduMode.js");
const NeteaseTranslatorModule = require("../dist/NeteaseMode.js");
const handleFileModule = require("../dist/handleZhCnFile.js");
const ChatGPT_TranslatorModule = require("../dist/ChatGPTMode.js");

async function prompt(selectAnswer) {
  if (!selectAnswer) {
    throw new Error("Please select a translate mode");
  } else {
    switch (selectAnswer) {
      case "Baidu":
        const pathAnswer = await createPathAnswer();
        const appIdAnswer = await createAppIdAnswer();
        const appSercetAnswer = await createAppSercetAnswer();
        const saltAnswer = await createSaltAnswer();
        const timeoutAnswer = await createTimeoutAnswer();
        const sourceLangAnswer = await createSourceLangAnswer();
        const targetLangAnswer = await createTargetLangAnswer();

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
        const _pathAnswer = await createPathAnswer();
        const _appIdAnswer = await createAppIdAnswer();
        const _appSercetAnswer = await createAppSercetAnswer();
        const _saltAnswer = await createSaltAnswer();
        const _timeoutAnswer = await createTimeoutAnswer();
        const _sourceLangAnswer = await createSourceLangAnswer();
        const _targetLangAnswer = await createTargetLangAnswer();

        try {
          await NeteaseTranslatorModule.NeteaseTranslator({
            path: _pathAnswer,
            appid: _appIdAnswer,
            appSecret: _appSercetAnswer,
            salt: _saltAnswer,
            timeout: _timeoutAnswer,
            sourceLang: _sourceLangAnswer,
            targetLang: _targetLangAnswer,
          });
        } catch (e) {
          throw new Error(e);
        }
        break;
      case "self-copy":
        const selfPathAnswer = await createPathAnswer();

        try {
          await handleFileModule.handleFile({
            path: selfPathAnswer,
          });
        } catch (e) {
          throw new Error(e);
        }
        break;
      case "ChatGPT":
        const chatgptPathAnswer = await createPathAnswer();
        const chatgptSourceLangAnswer = await createSourceLangAnswer();
        const chatgptTargetLangAnswer = await createTargetLangAnswer();
        const chatgptAnswer = await createChatGPTAnswer();
        try {
          await ChatGPT_TranslatorModule.ChatGPT_Translator({
            sourceLang: chatgptSourceLangAnswer,
            targetLang: chatgptTargetLangAnswer,
            path: chatgptPathAnswer,
            API_Key: chatgptAnswer,
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
