const transformComponent = (code: string) => {
  return `
    import React from 'react';

    const Component: FC = () => {
      return (
        ${code};
      )
    }
  `;
};

export default transformComponent;
