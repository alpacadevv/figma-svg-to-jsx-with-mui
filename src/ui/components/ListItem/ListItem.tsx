import type { FC, PropsWithChildren } from 'react';

import './ListItem.scss';

interface ListItemProps {
  onClick?: () => void;
}

const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  children,
  onClick,
}) => {
  return (
    <li className="ListItem" onClick={onClick}>
      {children}
    </li>
  );
};

export default ListItem;
