'use client';
import DropdownComponent from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import { SelectEventHandler } from 'rc-menu/lib/interface';

type DropdownProps = {
  children: React.ReactElement;
  menuItems: { key: string; text: string }[];
  onSelect?: SelectEventHandler;
};

export const Dropdown = ({ children, menuItems, onSelect }: DropdownProps) => {
  const menu = (
    <Menu onSelect={onSelect}>
      {menuItems.map(({ key, text }) => (
        <MenuItem
          key={key}
          className='cursor-pointer !px-[16px] !py-[4px] hover:bg-primary'
        >
          {text}
        </MenuItem>
      ))}
    </Menu>
  );
  return (
    <DropdownComponent
      minOverlayWidthMatchTrigger
      trigger={['click']}
      overlay={menu}
      animation='slide-up'
    >
      {children}
    </DropdownComponent>
  );
};
