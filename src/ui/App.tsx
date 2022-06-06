import { useState, useEffect } from 'react';
import type { FC } from 'react';

import Button from './components/Button';
import List from './components/List';
import ListItem from './components/ListItem';
import CodeBlock from './components/CodeBlock';
import { createUIMessage } from './utils';
import svgToJSX from './apis/svgToJSX';
import type { JSXInfo } from '../../types';
import { MessageInitializeMain, MessageInitializeUIData } from '../types';
import generateJSXIndexFile from './utils/generateJSXIndexFile';

import * as JSZip from 'jszip';

import './App.scss';

const App: FC = () => {
  const [jsxInfos, setJSXInfos] = useState<JSXInfo[]>([]);
  const [currentJSX, setCurrentJSX] = useState<JSXInfo>(undefined);

  const handleExportClick = async () => {
    let zip = new JSZip();

    const svgComponents = zip.folder('svg-components');
    for (let i = 0, max = jsxInfos.length; i < max; i++) {
      const jsxInfo = jsxInfos[i];
      svgComponents.file(`${jsxInfo.name}.tsx`, jsxInfo.jsx);
    }

    svgComponents.file('index.ts', generateJSXIndexFile(jsxInfos));

    await zip.generateAsync({ type: 'blob' }).then((content) => {
      const blobURL = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = 'svg-components.zip';
      link.click();
    });
  };

  const handleSVGClick = (jsxInfo: JSXInfo) => {
    setCurrentJSX(jsxInfo);
  };

  useEffect(() => {
    parent.postMessage(
      createUIMessage<MessageInitializeMain>({
        type: 'initialize-main',
      }),
      '*',
    );
  }, []);

  useEffect(() => {
    const messageEventListner = async (event) => {
      const { type, data } = event.data.pluginMessage;
      if (type === 'initialize-ui') {
        const svgInfos = data as MessageInitializeUIData[];
        const normalizedSVGInfos = svgInfos.map((svgInfo) => ({
          name: svgInfo.name,
          svg: svgInfo.svg,
        }));

        const jsxInfos = await svgToJSX({ svgInfos: normalizedSVGInfos });
        setJSXInfos(jsxInfos);
        setCurrentJSX(jsxInfos[0]);
      }
    };

    window.addEventListener('message', messageEventListner);
    return () => {
      window.removeEventListener('message', messageEventListner);
    };
  }, []);

  if (jsxInfos.length <= 0) {
    return <div className="App">Nothing</div>;
  }

  return (
    <div className="App">
      <Button onClick={handleExportClick} className="App__exportButton">
        Export
      </Button>
      <div className="App__preview">
        <List className="App__jsxList">
          {jsxInfos.map((jsxInfo) => (
            <ListItem
              key={jsxInfo.name}
              onClick={() => handleSVGClick(jsxInfo)}
            >
              {jsxInfo.name}
            </ListItem>
          ))}
        </List>
        <CodeBlock code={currentJSX.jsx} language="javascript" />
      </div>
    </div>
  );
};

export default App;
