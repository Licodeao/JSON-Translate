#! /usr/bin/env node

const { createSelectAnswer, createExitAnswer } = require("./dist/prompt.js");
const { prompt } = require("./dist/switchPrompt.js");

async function handleCLI() {
  const selectAnswer = await createSelectAnswer();
  if (selectAnswer === "exit") {
    let exitAnswer = await createExitAnswer();
    while (exitAnswer === "no") {
      const selectAnswerOnce = await createSelectAnswer();
      exitAnswer = await createExitAnswer();
      prompt(selectAnswerOnce);
    }
    process.exit(0);
  } else {
    prompt(selectAnswer);
  }
}

handleCLI();
