import { React, IMState, ReactRedux } from 'jimu-core';
import { AvatarCard, AvatarCardProps } from './avatar-card';
import { Loading } from 'jimu-ui';
const MARK_ICON = require('jimu-ui/lib/icons/close-12.svg');

export interface WidgetAvatarCardProps extends Omit<AvatarCardProps, 'onClick'> {
  widgetid?: string;
  showMarker?: boolean;
  onMarkerClick?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const WidgetAvatarCard = (props: WidgetAvatarCardProps) => {
  const {
    showMarker,
    onMarkerClick,
    widgetid,
    showLabel,
    labelGrowth,
    avatar,
    onClick,
    active,
    className
  } = props;

  const widgetJson = ReactRedux.useSelector((state: IMState) => state.appConfig.widgets?.[widgetid])

  if (widgetJson) {
    return <AvatarCard
      data-widgetid={widgetid}
      showLabel={showLabel}
      labelGrowth={labelGrowth}
      avatar={avatar}
      label={widgetJson.label}
      icon={widgetJson.icon as any}
      autoFlip={widgetJson?.manifest?.properties?.flipIcon}
      marker={showMarker ? MARK_ICON : ''}
      onMarkerClick={onMarkerClick}
      onClick={onClick}
      active={active}
      className={className}/>;
  }
  return <Loading />;
}



