import { includes, isArray, isObject, isString, some } from "lodash-es";
import { EnvInfos } from "@nyanpasu/interface";
import { cn as classNames } from "@nyanpasu/ui";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const containsSearchTerm = (obj: any, term: string): boolean => {
  if (!obj || !term) return false;

  if (isString(obj)) {
    return includes(obj.toLowerCase(), term.toLowerCase());
  }

  if (isObject(obj) || isArray(obj)) {
    return some(obj, (value: any) => containsSearchTerm(value, term));
  }

  return false;
};

export function formatEnvInfos(envs: EnvInfos) {
  let result = "----------- System -----------\n";
  result += `OS: ${envs.os}\n`;
  result += `Arch: ${envs.arch}\n`;
  result += `----------- Device -----------\n`;
  for (const cpu of envs.device.cpu) {
    result += `CPU: ${cpu}\n`;
  }
  result += `Memory: ${envs.device.memory}\n`;
  result += `----------- Core -----------\n`;
  for (const key in envs.core) {
    result += `${key}: \`${envs.core[key]}\`\n`;
  }
  result += `----------- Build Info -----------\n`;
  for (const k of Object.keys(envs.build_info) as string[]) {
    const key = k
      .split("_")
      .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
      .join(" ");
    result += `${key}: ${envs.build_info[k]}\n`;
  }
  return result;
}

export { classNames };
