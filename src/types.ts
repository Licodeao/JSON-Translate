export interface ModeOptions {
  path: string;
  appid: string;
  appSecret: string;
  salt: string | number;
  timeout: number;
  sourceLang: string;
  targetLang: string;
}

export interface HandleFileOptions {
  path: string;
}

export enum BaiduErrorType {
  SUCCESS = `STATUS_CODE: 52000, MESSAGE: SUCCESS`,
  TIMEOUT = `STATUS_CODE: 52001, MESSAGE: TIMEOUT`,
  SYSTEM_ERROR = `STATUS_CODE: 52002, MESSAGE: SYSTEM_ERROR`,
  UNAUTHORIZED_USER = `STATUS_CODE: 52003, MESSAGE: UNAUTHORIZED_USER`,
  PARAMETER_ERROR = `STATUS_CODE: 54000, MESSAGE: PARAMETER_ERROR`,
  SIGN_ERROR = `STATUS_CODE: 54001, MESSAGE: SIGN_ERROR`,
  ACCESS_FREQUENCY = `STATUS_CODE: 54003, MESSAGE: ACCESS_FREQUENCY`,
  ACCOUNT_BALANCE = `STATUS_CODE: 54004, MESSAGE: ACCOUNT_BALANCE`,
  QUERY_TOO_LONG = `STATUS_CODE: 54005, MESSAGE: QUERY_TOO_LONG`,
  INVAID_IP = `STATUS_CODE: 58000, MESSAGE: INVAID_IP`,
  LANG_NOT_SUPPORT = `STATUS_CODE: 58001, MESSAGE: LANG_NOT_SUPPORT`,
  SERVICE_NOT_SUPPORT = `STATUS_CODE: 58002, MESSAGE: SERVICE_NOT_SUPPORT`,
  PERMISSION_NOT_SUPPORT = `STATUS_CODE: 90107, MESSAGE: PERMISSION_NOT_SUPPORT`,
}

export enum ChatGPT_API {
  CHATGPT_API = "https://api.openai.com/v1/chat/completions",
}

export interface ChatGPTOptions {
  sourceLang: string;
  targetLang: string;
  path: string;
  API_Key: string;
}
