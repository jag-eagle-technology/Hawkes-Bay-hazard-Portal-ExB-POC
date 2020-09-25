import { React, classNames, LayoutItemJson, IMLayoutItemJson, BoundingBox } from 'jimu-core';
import { LayoutItemProps, StateToLayoutItemProps, utils, LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemInBuilder } from 'jimu-layouts/layout-builder';

interface OwnProps {
  layoutItem: IMLayoutItemJson;
  activeIds?: string;
  index: number;
  space: number;
  editingSectionId?: string;
  children?: any;
  onResizeStart: (id: string) => void;
  onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
  onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => void;
}

interface State {
  isResizing: boolean;
  dw: number;
  dh: number;
}

export class FlexboxItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & OwnProps, State> {
  initWidth: number;
  initHeight: number;
  state: State = {
    isResizing: false,
    dw: 0,
    dh: 0,
  };

  onResizeStart = (id: string, initW: number, initH: number) => {
    this.initWidth = initW;
    this.initHeight = initH;
    this.props.onResizeStart(id);
    this.setState({
      isResizing: true,
    });
  };

  onResizing = (id: string, x: number, y: number, dw: number, dh: number) => {
    this.props.onResizing(id, x, y, dw, dh);
    this.setState({
      dw,
      dh,
      isResizing: true,
    });
  };

  onResizeEnd = (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => {
    const { layoutItem } = this.props;
    this.props.onResizeEnd(id, x, y, dw, dh, layoutItem);
    this.setState({
      isResizing: false,
      dw: 0,
      dh: 0,
    });
  };

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
    const { index, layoutId, layoutItem, space, draggable, resizable, selectable, showDefaultTools, animationStyle, isPlaying } = this.props;
    if (!layoutItem || layoutItem.isPending) {
      return null;
    }
    const { dw, dh, isResizing } = this.state;
    const bbox = layoutItem.bbox || ({} as any);
    const layoutSetting = layoutItem.setting || {};
    const mergedClass = classNames('flexbox-layout-item d-flex');
    const isStretch = this.isStretchInCrossAxis();
    const heightMode = layoutSetting.autoProps?.height ?? LayoutItemSizeModes.Custom;
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

    if (isResizing && (dw || dh)) {
      style.height = this.initHeight + dh;
      style.width = this.initWidth + dw;
    }

    return (
      <LayoutItemInBuilder
        style={JSON.stringify(style)}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        onResizeStart={this.onResizeStart}
        onResizing={this.onResizing}
        onResizeEnd={this.onResizeEnd}
        left={!isStretch}
        right={!isStretch}
        top={false}
        bottom={heightMode === LayoutItemSizeModes.Custom && !keepAspectRatio}
        draggable={draggable}
        resizable={resizable}
        selectable={selectable}
        showDefaultTools={showDefaultTools}
        onClick={this.props.onClick}
        className={mergedClass}
        forceAspectRatio={keepAspectRatio}
        aspectRatio={ratio}
        animationStyle={animationStyle}
        isPlaying={isPlaying}
      />
    );
  }
}
