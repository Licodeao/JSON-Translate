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
