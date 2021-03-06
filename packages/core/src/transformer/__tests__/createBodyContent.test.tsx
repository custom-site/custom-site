jest.unmock("../createBodyContent.tsx");
import * as fs from "fs";
import * as path from "path";
import * as ReactDOM from "react-dom/server";
import { applyMarkdownTextToMdxTag, transformRawStringToHtml } from "../createBodyContent";

const removeAllNewLine = (inputString: string): string => inputString.replace(/\r?\n|\r|\n|\s/g, "").trim();

describe("Create Body Content Test", () => {
  const templateText: string = `
# Hello World

body message

## h2 title

highlight
`;

  const rawResult: string = fs.readFileSync(path.join(__dirname, "./expectedResult.js"), { encoding: "utf8" });
  const resultTest = "<h1>Hello World</h1><p>body message</p><h2>h2 title</h2><p>highlight</p>";

  test("applyMarkdownTextToMdxReact", () => {
    const raw = removeAllNewLine(applyMarkdownTextToMdxTag(templateText));
    expect(raw).toEqual(removeAllNewLine(rawResult));
  });

  test("default converter", () => {
    const converter = transformRawStringToHtml({
      customComponents: {},
      props: {},
    });
    const component = converter(templateText);
    const renderResult = ReactDOM.renderToStaticMarkup(component);
    expect(renderResult).toEqual(resultTest);
  });
});
