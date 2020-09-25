import { React, IMLayoutItemJson, classNames } from 'jimu-core';
import { withRnd } from 'jimu-layouts/layout-builder';
import { WidgetAvatarCardProps, WidgetAvatarCard } from '../../common';

const WidgetRndAvatarCard = withRnd(false)(WidgetAvatarCard as any);

export interface ControllerLayoutItemProps extends Omit<WidgetAvatarCardProps, 'onDragStart' | 'onDragEnd' | 'onMarkerClick'> {
  draggable?: boolean;
  layoutId: string;
  layoutItem: IMLayoutItemJson;
  layoutItemId: string;
  removeWidget: (widgetId: string) => void;
}

export const LayoutItem = (props: ControllerLayoutItemProps) => {
  const {
    className,
    draggable,
    layoutId,
    layoutItem,
    onClick,
    label,
    showLabel,
    labelGrowth,
    showMarker,
    avatar,
    active,
    removeWidget
  } = props;

  return <WidgetRndAvatarCard
    className={classNames({ 'no-drag-action': !draggable }, className)}
    layoutId={layoutId}
    layoutItem={layoutItem}
    widgetid={layoutItem.widgetId}
    layoutItemId={layoutItem.id}
    onMarkerClick={() => removeWidget(layoutItem.widgetId)}
    onClick={onClick as any}
    label={label}
    showMarker={showMarker}
    showLabel={showLabel}
    labelGrowth={labelGrowth}
    avatar={avatar}
    active={active}
  />
}