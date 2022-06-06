import type { FC, PropsWithChildren } from 'react';

import './List.scss';

interface ListProps {
  className?: string;
}

const List: FC<PropsWithChildren<ListProps>> = ({
  children,
  className = '',
}) => {
  return <ul className={`List ${className}`}>{children}</ul>;
};

export default List;
