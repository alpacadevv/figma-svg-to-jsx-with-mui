import { MessageInitializeUI, MessageInitializeUIData } from '../types';
import { createMessage, checkSpecial } from '../utils';

figma.showUI(__html__, { width: 600, height: 500 });

figma.ui.onmessage = async (message) => {
  if (message.type === 'initialize-main') {
    const svgInfos: MessageInitializeUIData[] = [];
    const { selection: selectionScene } = figma.currentPage;

    for (let i = 0, max = selectionScene.length; i < max; i++) {
      const isLast = i + 1 === max;
      const svgAsUnit8Array = await selectionScene[i].exportAsync({
        format: 'SVG',
      });

      let name = selectionScene[i].name.replace(/(\s*)/g, '');

      if (checkSpecial(name)) {
        name = `Icon${i}`;
      }

      const svg = ab2str(svgAsUnit8Array);
      svgInfos.push({
        name,
        svg,
      });

      if (isLast) {
        figma.ui.postMessage(
          createMessage<MessageInitializeUI>({
            type: 'initialize-ui',
            data: svgInfos,
          }),
        );
      }
    }
  }
};

function ab2str(buf): string {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
