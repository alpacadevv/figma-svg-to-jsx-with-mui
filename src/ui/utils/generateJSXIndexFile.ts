import { JSXInfo } from '../../../types';

const generateJSXIndexFile = (jsxInfos: JSXInfo[]): string => {
  return jsxInfos
    .map(
      (jsxInfo) =>
        `export { default as ${jsxInfo.name} } from './${jsxInfo.name}';\n`,
    )
    .join('');
};

export default generateJSXIndexFile;
