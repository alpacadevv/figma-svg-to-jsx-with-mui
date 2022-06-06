import { API_BASE_URL } from '../../env.config';
import type { JSXInfo } from '../../types';

interface SVGToJSXParams {
  svgInfos: { name: string; svg: string }[];
}

interface SVGToJSXResponseData {
  jsxInfos: JSXInfo[];
}

type SVGtoJSX = (params: SVGToJSXParams) => Promise<JSXInfo[]>;

const svgToJSX: SVGtoJSX = async ({ svgInfos }) => {
  const res = await fetch(`${API_BASE_URL}/bulk-svg-to-jsx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      svgInfos,
    }),
  });

  const { data } = await res.json();
  const { jsxInfos } = data as SVGToJSXResponseData;

  return jsxInfos;
};

export default svgToJSX;
