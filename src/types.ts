/**
 * message type: initialize-main
 */
export interface MessageInitializeMain {
  type: 'initialize-main';
}

/**
 * message type: initialize-ui
 */
export interface MessageInitializeUIData {
  name: string;
  svg: string;
}

export interface MessageInitializeUI {
  type: 'initialize-ui';
  data: MessageInitializeUIData[];
}

export interface SVGInfo {
  name: string;
  svg: string;
}

export interface JSXInfo {
  name: string;
  svg: string;
  jsx: string;
}
