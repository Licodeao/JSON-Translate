import { fs, pathModule } from "./index";
import type { HandleFileOptions } from "./types";

export function handleFile(params: HandleFileOptions) {
  const { path } = params;
  fs.readFile(
    pathModule.resolve(__dirname, path),
    { encoding: "utf8" },
    (err, data) => {
      if (err) {
        throw err;
      }

      const sourceObj = JSON.parse(data);

      for (let key in sourceObj) {
        if (Object.hasOwnProperty.call(sourceObj, key)) {
          sourceObj[key] = key;
        }
      }

      fs.writeFile(
        pathModule.resolve(__dirname, path),
        JSON.stringify(sourceObj),
        "utf8",
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log("work done!");
        }
      );
    }
  );
}
