import { React, classNames, IMLayoutItemJson, BoundingBox } from 'jimu-core';
import { LayoutItemProps, utils, LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItem } from 'jimu-layouts/layout-runtime';

interface OwnProps {
  layoutItem: IMLayoutItemJson;
  index: number;
  space: number;
  children?: any;
}

export class FlexboxItem extends React.PureComponent<LayoutItemProps & OwnProps> {
  isStretchInCrossAxis() {
    const { layoutItem } = this.props;
    return layoutItem.setting?.autoProps?.width !== LayoutItemSizeModes.Custom;
  }

  calHeight(itemSetting, bbox: BoundingBox) {
    if (itemSetting.autoProps?.height === LayoutItemSizeModes.Auto || itemSetting.heightMode === 'ratio') {
      if (itemSetting.heightMode === 'ratio') {
        return { height: 'auto', flex: '0 0 auto' };
      }
      return { height: 'auto' };
    }
    if (itemSetting.autoProps?.height === LayoutItemSizeModes.Stretch || itemSetting.heightMode === 'fit') {
      return { flexGrow: 1, flexShrink: 1 };
    }
    return { height: bbox.height, flexShrink: 0 };
  }

  render() {
    const { index, layoutId, layoutItem, space, onClick, animationStyle, isPlaying } = this.props;
    if (!layoutItem || layoutItem.isPending) {
      return null;
    }
    const bbox = layoutItem.bbox || ({} as any);
    const mergedClass = classNames('flexbox-layout-item', 'd-flex');
    const layoutSetting = layoutItem.setting || {};
    const isStretch = this.isStretchInCrossAxis();
    const keepAspectRatio = layoutSetting.heightMode === 'ratio';
    const ratio = utils.parseAspectRatio(layoutSetting.aspectRatio);

    const style: any = {
      // position related style
      marginTop: index > 0 ? space : 'unset',
      ...this.calHeight(layoutSetting, bbox),
    };

    if (isStretch) {
      style.width = 'auto';
      style.alignSelf = 'stretch';
    } else {
      style.width = bbox.width;
      style.alignSelf = layoutSetting.style?.alignSelf ?? 'auto';
    }

    return (
      <LayoutItem
        style={JSON.stringify(style)}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        onClick={onClick}
        className={mergedClass}
        forceAspectRatio={keepAspectRatio}
        aspectRatio={ratio}
        animationStyle={animationStyle}
        isPlaying={isPlaying}
      />
    );
  }
}
