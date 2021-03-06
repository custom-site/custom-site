import { Plugin } from "@custom-site/interfaces/lib/plugin";
import normalize = require("normalize-path");
import * as path from "path";
// tslint:disable
const Module = require("module");

export const getPluginPath = (pluginName: string, fromDir?: string, searchNodeModules?: boolean): string | undefined => {
  const filename = normalize(path.join(fromDir || "", pluginName));
  const resolveFileName = () =>
    Module._resolveFilename(pluginName, {
      id: filename,
      filename: filename,
      paths: searchNodeModules ? Module._nodeModulePaths(fromDir) : [fromDir],
    });
  try {
    return resolveFileName();
  } catch (err) {
    console.error(err);
    return;
  }
};

export const resolvePluginByName = <T>(
  pluginName: string,
  fromDir?: string,
  searchNodeModules: boolean = true,
): { path: string; funcMap: T } | undefined => {
  const pluginPath = getPluginPath(pluginName, fromDir || process.cwd(), searchNodeModules);
  if (pluginPath) {
    return {
      path: pluginPath,
      funcMap: require(pluginPath),
    };
  }
  return undefined;
};

/**
 * プラグインを探索する
 */
export const resolvePlugin = <T>(plugin: Plugin): { path: string; funcMap: T } | undefined => {
  if (typeof plugin === "string") {
    return resolvePluginByName(normalize(plugin));
  }
  return resolvePluginByName(plugin.name, plugin.resolve, false);
};
