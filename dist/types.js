"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPT_API = exports.BaiduErrorType = void 0;
var BaiduErrorType;
(function (BaiduErrorType) {
    BaiduErrorType["SUCCESS"] = "STATUS_CODE: 52000, MESSAGE: SUCCESS";
    BaiduErrorType["TIMEOUT"] = "STATUS_CODE: 52001, MESSAGE: TIMEOUT";
    BaiduErrorType["SYSTEM_ERROR"] = "STATUS_CODE: 52002, MESSAGE: SYSTEM_ERROR";
    BaiduErrorType["UNAUTHORIZED_USER"] = "STATUS_CODE: 52003, MESSAGE: UNAUTHORIZED_USER";
    BaiduErrorType["PARAMETER_ERROR"] = "STATUS_CODE: 54000, MESSAGE: PARAMETER_ERROR";
    BaiduErrorType["SIGN_ERROR"] = "STATUS_CODE: 54001, MESSAGE: SIGN_ERROR";
    BaiduErrorType["ACCESS_FREQUENCY"] = "STATUS_CODE: 54003, MESSAGE: ACCESS_FREQUENCY";
    BaiduErrorType["ACCOUNT_BALANCE"] = "STATUS_CODE: 54004, MESSAGE: ACCOUNT_BALANCE";
    BaiduErrorType["QUERY_TOO_LONG"] = "STATUS_CODE: 54005, MESSAGE: QUERY_TOO_LONG";
    BaiduErrorType["INVAID_IP"] = "STATUS_CODE: 58000, MESSAGE: INVAID_IP";
    BaiduErrorType["LANG_NOT_SUPPORT"] = "STATUS_CODE: 58001, MESSAGE: LANG_NOT_SUPPORT";
    BaiduErrorType["SERVICE_NOT_SUPPORT"] = "STATUS_CODE: 58002, MESSAGE: SERVICE_NOT_SUPPORT";
    BaiduErrorType["PERMISSION_NOT_SUPPORT"] = "STATUS_CODE: 90107, MESSAGE: PERMISSION_NOT_SUPPORT";
})(BaiduErrorType || (exports.BaiduErrorType = BaiduErrorType = {}));
var ChatGPT_API;
(function (ChatGPT_API) {
    ChatGPT_API["CHATGPT_API"] = "https://api.openai.com/v1/chat/completions";
})(ChatGPT_API || (exports.ChatGPT_API = ChatGPT_API = {}));
