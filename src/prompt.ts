const { input, select, Separator } = require("@inquirer/prompts");

async function createSelectAnswer() {
  const instance = await select({
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
      {
        name: "Exit",
        value: "exit",
        description: "Exit the CLI",
      },
      new Separator(),
      {
        name: "ChatGPT",
        value: "ChatGPT",
        disabled: "(ChatGPT is on road...)",
      },
    ],
  });
  return instance;
}

async function createPathAnswer() {
  const instance = await input({
    message: "Input your translate path",
    validate: (value) => {
      if (value.length === 0) {
        return "Please input your translate path";
      } else {
        return true;
      }
    },
  });
  return instance;
}

async function createAppIdAnswer() {
  const instance = await input({
    message: "Input your appId",
    validate: (value) => {
      if (value.length === 0) {
        return "Please input your appId";
      } else {
        return true;
      }
    },
  });
  return instance;
}

async function createAppSercetAnswer() {
  const instance = await input({
    message: "Input your appSercet",
    validate: (value) => {
      if (value.length === 0) {
        return "Please input your appSercet";
      } else {
        return true;
      }
    },
  });
  return instance;
}

async function createSaltAnswer() {
  const instance = await input({
    message: "Input your salt",
    validate: (value) => {
      if (value.length === 0 || !/^\d+$/.test(value)) {
        return "Please input correct salt";
      } else {
        return true;
      }
    },
  });
  return instance;
}

async function createTimeoutAnswer() {
  const instance = await input({
    message: "Input your timeout",
    validate: (value) => {
      if (value.length === 0 || !/^\d+$/.test(value)) {
        return "Please input correct timeout";
      } else {
        return true;
      }
    },
  });
  return instance;
}

async function createSourceLangAnswer() {
  const instance = await input({
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
  return instance;
}

async function createTargetLangAnswer() {
  const instance = await input({
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
  return instance;
}

async function createExitAnswer() {
  const instance = await select({
    message: "Are you sure to exit?",
    choices: [
      {
        name: "Yes",
        value: "yes",
        description: "Exit the CLI",
      },
      {
        name: "No",
        value: "no",
        description: "Continue to the CLI",
      },
    ],
  });
  return instance;
}

export {
  createSelectAnswer,
  createPathAnswer,
  createAppIdAnswer,
  createAppSercetAnswer,
  createSaltAnswer,
  createTimeoutAnswer,
  createSourceLangAnswer,
  createTargetLangAnswer,
  createExitAnswer,
};
