# i18n-json-translate

提升国际化翻译效率

## 背景

在进行国际化业务时，可能遇到在提取中文后，需要手动进行翻译的情况。

## 使用场景

针对于以下场景进行使用：

> 将 key 的翻译结果作为其 value

```json
{
  "你好": "",
  "苹果": ""
}
```

## 集成支持

| 厂商                 | 使用条件             |
| -------------------- | -------------------- |
| 百度翻译             | 需注册百度翻译账号   |
| 有道云翻译           | 需注册有道云翻译账号 |
| ChatGPT（接入中...） |                      |

## 使用

```bash
# npm
$ npm install i18n-json-translate

# Usage
$ json-translate
```

| 模式                  | 描述           |
| --------------------- | -------------- |
| Baidu                 | 使用百度翻译   |
| Netease               | 使用有道云翻译 |
| Slef-copy(ZH-CN.json) | 键值对复制     |

## ⚠提示

- 翻译结果并不是百分百正确
- 有道云翻译 API 的限制比百度更严格，因此延迟请求的时间更长

## 效果

<img src="https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/image-20230906002748145.png" width="100%" />

<img src="https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/image-20230628232354634.png" width="100%" />