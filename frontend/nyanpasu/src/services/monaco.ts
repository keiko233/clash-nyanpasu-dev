// features
// langs
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";
import "monaco-editor/esm/vs/basic-languages/lua/lua.contribution.js";
import "monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js";
import "monaco-editor/esm/vs/editor/editor.all.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// language services
import "monaco-editor/esm/vs/language/typescript/monaco.contribution.js";

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2020,
  allowNonTsExtensions: true,
  allowJs: true,
});

const source = `declare type ClashConfig = {
  proxies: any[];
};

/**
 * @deprecated since Clash Nyanpasu 1.6.0
 */
declare function main(params: ClashConfig): ClashConfig;

declare function config(params: ClashConfig): ClashConfig;

default function(config: ClashConfig): ClashConfig;
`;

const dtsuri = "ts:filename/clash-config.d.ts";

monaco.languages.typescript.javascriptDefaults.addExtraLib(source, dtsuri);

monaco.editor.createModel(source, "typescript", monaco.Uri.parse(dtsuri));

export { monaco };
