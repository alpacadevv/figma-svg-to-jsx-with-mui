import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

import { transform } from '@svgr/core';
import SVGROptimizePlugin from '@svgr/plugin-svgo';
import SVGJSXPlugin from '@svgr/plugin-jsx';
import SVGRPrettierPlugin from '@svgr/plugin-prettier';

import type { SVGInfo, JSXInfo } from '../types';

import templateWithMUI from './svgr-templates/template-with-mui';

(() => {
  const port = 8000;
  const app: Express = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/bulk-svg-to-jsx', (req: Request, res: Response) => {
    const { svgInfos, optimize = true } = req.body as {
      svgInfos: SVGInfo[];
      optimize?: boolean;
    };

    const jsxInfos: JSXInfo[] = [];

    for (let i = 0, max = svgInfos.length; i < max; i++) {
      const svgInfo = svgInfos[i];

      const jsx = transform.sync(
        svgInfo.svg,
        {
          plugins: [SVGROptimizePlugin, SVGJSXPlugin, SVGRPrettierPlugin],
          expandProps: 'end',
          typescript: true,
          template: templateWithMUI,
        },
        { componentName: svgInfo.name || 'SVGComponent' },
      );

      jsxInfos.push({
        name: svgInfo.name,
        svg: svgInfo.svg,
        jsx,
      });
    }

    res.send({
      data: { jsxInfos },
    });
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });
})();
