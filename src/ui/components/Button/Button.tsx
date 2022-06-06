import type { FC, PropsWithChildren } from 'react';

import './Button.scss';

type Variant = 'primary';

interface ButtonProps {
  variant?: Variant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: String;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`Button ${getStyleByVariant(variant)} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

function getStyleByVariant(variant: Variant) {
  switch (variant) {
    case 'primary': {
      return 'Button--primary';
    }
  }
}
