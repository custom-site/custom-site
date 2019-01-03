import * as fs from "fs";

import { Options } from "@custom-site/cli";
import { HtmlMetaProperties } from "@custom-site/page";
import * as path from "path";

const loadJsonFile = (filePath: string) => JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }));

export interface LoadConfigOption extends Options {
  global?: HtmlMetaProperties;
}

export const getDefaultConfig = (dirname: string, filename: string = "config.json"): LoadConfigOption => {
  const filePath = path.join(dirname, filename);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return loadJsonFile(filePath);
  }
  return {
    global: {
      lang: "en",
    },
  };
};
