import type { Config } from '@svgr/core';
import {
  identifier,
  jsxClosingElement,
  jsxElement,
  jsxIdentifier,
  jsxOpeningElement,
  jsxSpreadAttribute,
} from '@babel/types';

type TemplateWithMUI = Config['template'];

const templateWithMUI: TemplateWithMUI = (
  { jsx, componentName, props },
  { tpl },
) => {
  // https://phelipetls.github.io/posts/automating-svg-to-jsx-conversion-with-svgr/
  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('SvgIcon'), [
      ...jsx.openingElement.attributes,
      jsxSpreadAttribute(identifier('props')),
    ]),
    jsxClosingElement(jsxIdentifier('SvgIcon')),
    jsx.children,
    false,
  );

  const name = `${componentName}: FC<SvgIconProps>`;

  return tpl`
    import type { FC } from 'react';
    import type { SvgIconProps } from '@mui/material/SvgIcon';
    import SvgIcon from '@mui/material/SvgIcon';

    const ${name} = (props) => {
      return (
        ${wrappedJsx}
      );
    };

    export default ${componentName};
  `;
};

export default templateWithMUI;
