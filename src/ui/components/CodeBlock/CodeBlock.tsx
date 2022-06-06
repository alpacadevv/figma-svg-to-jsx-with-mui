import { useEffect } from 'react';
import type { FC } from 'react';
import Prism from 'prismjs';

import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="CodeBlock">
      <pre className="CodeBlock__pre">
        <code
          className={`language-${language} CodeBlock__code`}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
