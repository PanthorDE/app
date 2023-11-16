import React from 'react';
import {Avatar, type AvatarIconProps} from 'react-native-paper';
import {ITEM_ICONS} from '../../resources/market_icons';

export type TItemIconProps = {
  item: string;
  avatarIconProps?: AvatarIconProps;
};

export const ItemIcon: React.FC<TItemIconProps> = ({item, ...avatarIconProps}) => {
  return (
    <Avatar.Image
      size={40}
      source={ITEM_ICONS.has(item) ? ITEM_ICONS.get(item) : require('../../resources/search.png')}
      style={{marginLeft: 16, backgroundColor: 'transparent'}}
      {...avatarIconProps}
    />
  );
};
