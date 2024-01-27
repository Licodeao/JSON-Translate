import OpenAI from "openai";
import type { ChatGPTOptions } from "./types";
import { fs } from "./index";

export async function ChatGPT_Translator(options: ChatGPTOptions) {
  const { sourceLang, targetLang, path, API_Key } = options;

  const openai = new OpenAI({
    apiKey: API_Key,
  });

  const source = fs.readFileSync(path);
  const sourceObj = JSON.parse(source);
  const translations: [string, string][] = [];
  const cache: Record<string, string> = {};

  for (const [key, _] of Object.entries(sourceObj)) {
    if (cache[key]) {
      translations.push([key, cache[key]]);
    } else {
      let dst: string | undefined;
      while (!dst) {
        const completion = await openai.completions.create({
          model: "gpt-3.5-turbo-instruct",
          prompt: `Translate the text: ${key} from ${sourceLang} to ${targetLang}`,
        });
        dst = completion.choices[0].text.replace(/\n/g, "") || "";
        if (!dst) {
          console.log(`当前字符：${key} 为undefined, 重新翻译中...`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        console.log(`源Key: ${key}, 被翻译为: ${dst}`);
        translations.push([key, dst]);
        cache[key] = dst;
      }
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
