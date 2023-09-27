# i18n-json-translate

Improve international translation efficiency

## Background

When conducting international business, you may encounter situations where you need to manually translate after extracting Chinese.

## Usage Scenery

For use in the following scenarios：

> Use the translation result of key as its value

```json
{
  "你好": "",
  "苹果": ""
}
```

## Integration support

| manufacturers            | condition |
| ------------------------ | --------- |
| Baidu translate          | Sign up   |
| Netease Youdao translate | Sign up   |
| ChatGPT（loading...）    |           |

## Usage

```bash
# npm
$ npm install i18n-json-translate

# Usage(If you can't use this command, you can configure in the package.json file, as following)
$ json-translate

# package.json
{
  "i18n-json-translate": "json-translate"
}
$ npm run i18n-json-translate
```

| Mode                  | Description                  |
| --------------------- | ---------------------------- |
| Baidu                 | Use Baidu translate          |
| Netease               | Use Netease Youdao translate |
| Slef-copy(ZH-CN.json) | Key-value copy               |

## ⚠Tips

- The translation is not 100% correct
- Youdao translation API has stricter restrictions than Baidu, so requests are delayed longer

## Effects

<img src="https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/image-20230906002748145.png" width="100%" />

<img src="https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/image-20230628232354634.png" width="100%" />