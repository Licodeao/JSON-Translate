#! /usr/bin/env node

const select = require("@inquirer/select");
const { Separator } = require("@inquirer/select");
const input = require("@inquirer/input");
const BaiduTranslatorModule = require("./dist/BaiduMode.js");
const NeteaseTranslatorModule = require("./dist/NeteaseMode.js");
const handleFileModule = require("./dist/handleZhCnFile.js");

async function handleCLI() {
  const selectAnswer = await select.default({
    message: "Select a translate mode",
    choices: [
      {
        name: "Baidu",
        value: "Baidu",
        description: "Use Baidu Translator Mode",
      },
      {
        name: "Netease",
        value: "Netease",
        description: "Use Netease Youdao Translator Mode",
      },
      {
        name: "Slef-copy(ZH-CN.json)",
        value: "slef-copy",
        description: "Slef-copy zh-cn.json Mode",
      },
      new Separator(),
      {
        name: "ChatGPT",
        value: "ChatGPT",
        disabled: "(ChatGPT is on road...)",
      },
    ],
  });

  const pathAnswer = await input.default({
    message: "Input your translate path",
    validate: (value) => {
      if (value.length === 0) {
        return "Please input your translate path";
      } else {
        return true;
      }
    },
  });

  const appIdAnswer = await input.default({
    message: "Input your appId",
    validate: (value) => {
      if (value.length === 0) {
        return "Please input your appId";
      } else {
        return true;
      }
    },
  });

  const appSercetAnswer = await input.default({
    message: "Input your appSercet",
    validate: (value) => {
      if (value.length === 0) {
        return "Please input your appSercet";
      } else {
        return true;
      }
    },
  });

  const saltAnswer = await input.default({
    message: "Input your salt",
    validate: (value) => {
      if (value.length === 0 || !/^\d+$/.test(value)) {
        return "Please input correct salt";
      } else {
        return true;
      }
    },
  });

  const timeoutAnswer = await input.default({
    message: "Input your timeout",
    validate: (value) => {
      if (value.length === 0 || !/^\d+$/.test(value)) {
        return "Please input correct timeout";
      } else {
        return true;
      }
    },
  });

  const sourceLangAnswer = await input.default({
    message: "Input your sourceLang",
    validate: (value) => {
      if (
        value.length === 0 ||
        typeof value !== "string" ||
        /^\d+$/.test(value)
      ) {
        return "Please input correct sourceLang";
      } else {
        return true;
      }
    },
  });

  const targetLangAnswer = await input.default({
    message: "Input your targetLang",
    validate: (value) => {
      if (
        value.length === 0 ||
        typeof value !== "string" ||
        /^\d+$/.test(value)
      ) {
        return "Please input correct targetLang";
      } else {
        return true;
      }
    },
  });

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
    }
  }
}
handleCLI();
