import { React, themeUtils, classNames, IMLayoutJson } from 'jimu-core';
import { ScrollListProps, ScrollList, ScrollListRefProps } from '../../common/scroll-list';
import { useWidgetLayouts, useOpeningWidgets, getListItemLength } from '../../common/utils';
import { BASE_LAYOUT_NAME, DROP_ZONE_PLACEHOLDER_WIDTH } from '../../../common/consts';
import { AvatarCardProps, getItemLength } from '../../common/avatar-card';
import { LayoutContext } from 'jimu-layouts/layout-runtime';
import { DrapZone } from './drop-zone';
import { LayoutItem } from './layout-item';
import { isLayoutItemAcceptedForController, useDeleteSyncWidgetFromLayout, useInsertSyncWidgetToLayout } from '../utils';
import { InsertWidge } from './insert-widget';
import { IconPosition } from 'jimu-ui';
import { useWidgetLayout, getVisibleOrderFromLayout } from '../../../common/utils';
const { useMemo, forwardRef } = React;

export interface LayoutListProps extends Omit<ScrollListProps, 'lists' | 'createItem' | 'itemLength'> {
  widgetId: string;
  itemStyle?: AvatarCardProps;
  draggable?: boolean;
  space: number;
  dropZoneRef?: (ref: HTMLDivElement) => void;
  onItemClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
  scrollListRef?: React.RefObject<ScrollListRefProps>
}

const useInsertWidgetPlaceholder = (layout: IMLayoutJson, item: AvatarCardProps, empty: boolean, insertSyncWidgetToLayout) => {

  return useMemo(() => {
    const avatarProps = {
      ...item,
      showLabel: !empty ? item?.showLabel : false,
      avatar: item?.avatar
    }
    const itemLength = getItemLength(item?.avatar?.size, item?.showLabel, item?.avatar?.shape);
    return {
      position: 'end' as IconPosition,
      length: itemLength,
      node: <InsertWidge className="scroll-list-item" insertSyncWidgetToLayout={insertSyncWidgetToLayout} layout={layout} item={avatarProps} />
    }
  }, [item, layout, empty, insertSyncWidgetToLayout])
}

export const LayoutList = forwardRef((props: LayoutListProps, ref: React.RefObject<HTMLDivElement>) => {

  const { widgetId, draggable, itemStyle, vertical, className, space, dropZoneRef, onItemClick, onClick, scrollListRef, ...others } = props;

  const layouts = useWidgetLayouts(widgetId, BASE_LAYOUT_NAME);
  const layout = useWidgetLayout(widgetId, BASE_LAYOUT_NAME);
  const order = getVisibleOrderFromLayout(layout);
  const builderTheme = themeUtils.getBuilderThemeVariables();
  const openingWidgets = useOpeningWidgets(widgetId, BASE_LAYOUT_NAME);
  const itemLength = getListItemLength(itemStyle, space);
  const placeholderProps = {
    color: builderTheme?.colors.palette.primary[700],
    size: [itemLength, DROP_ZONE_PLACEHOLDER_WIDTH]
  }

  const removeSyncWidgetFromLayout = useDeleteSyncWidgetFromLayout(widgetId, BASE_LAYOUT_NAME);

  const createItem = (itemId: string, className: string) => {
    const layoutItem = layout.content[itemId];
    const widgetId = (layoutItem && layoutItem.widgetId) || '';
    const active = openingWidgets.indexOf(widgetId) > -1;

    return (
      <LayoutItem
        key={itemId}
        {...itemStyle}
        widgetid={widgetId}
        layoutId={layout.id}
        layoutItemId={itemId}
        draggable={draggable}
        showMarker={draggable}
        layoutItem={layoutItem}
        onClick={onItemClick}
        active={active}
        removeWidget={removeSyncWidgetFromLayout}
        className={classNames(`layout-${layout?.id}-item layout-item`, className)} />
    );
  }
  const insertSyncWidgetToLayout = useInsertSyncWidgetToLayout(widgetId, BASE_LAYOUT_NAME);
  const placeholder = useInsertWidgetPlaceholder(layout, itemStyle, order.length === 0, insertSyncWidgetToLayout);

  return <LayoutContext.Provider value={{ isItemAccepted: isLayoutItemAcceptedForController }}>
    <div
      ref={ref}
      onClick={onClick}
      className="layout controller-layout w-100 h-100"
      data-layoutid={layout.id}>
      <DrapZone
        widgetId={widgetId}
        vertical={vertical}
        layout={layout}
        childClass={`layout-${layout.id}-item`}
        placeholder={placeholderProps}
        layouts={layouts} />
      <ScrollList
        {...others}
        ref={scrollListRef}
        placeholder={placeholder}
        className={classNames(className, 'layout-item-list')}
        itemLength={itemLength}
        space={space}
        autoHideArrow
        lists={order as any}
        autoScrollEnd={true}
        createItem={createItem} />
    </div>
  </LayoutContext.Provider>

})