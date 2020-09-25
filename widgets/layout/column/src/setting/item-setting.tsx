/** @jsx jsx */
import { React, jsx, css, Immutable, LayoutItemType, APP_FRAME_NAME_IN_BUILDER, IMBoundingBox } from 'jimu-core';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { UnitTypes, Checkbox, LinearUnit, Select } from 'jimu-ui';
import { LayoutItemSizeModes, utils as layoutUtils } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from 'jimu-layouts/layout-builder';
import { CommonLayoutItemSetting, CommonTransformSetting } from 'jimu-layouts/layout-builder';
import { SizeEditor, InputRatio } from 'jimu-ui/advanced/style-setting-components';

const inputStyle = { width: '7.5rem' };

const heightModes = [LayoutItemSizeModes.Auto, LayoutItemSizeModes.Custom, LayoutItemSizeModes.Stretch];
const availableWidthUnits = [UnitTypes.PIXEL, UnitTypes.PERCENTAGE];
const availableHeightUnits = [UnitTypes.PIXEL];

export default class FlexboxItemSetting extends React.PureComponent<LayoutItemSettingProps> {
  updateBBox = (prop: string, value: LinearUnit) => {
    let bbox = this.props.layoutItem.bbox as IMBoundingBox;
    const { distance, unit } = value;
    const originalValue = bbox[prop];
    const contaienrRect = this.getSizeOfContainer();
    let newValue: string | number = distance.toFixed(2);
    let pixelValue: number;

    if (layoutUtils.isPercentage(originalValue) && unit === UnitTypes.PIXEL) { // change from percentage to pixel
      if (contaienrRect) {
        if (prop === 'left' || prop === 'right' || prop === 'width') {
          newValue = Math.round(parseFloat(originalValue) * contaienrRect.width / 100);
        } else {
          newValue = Math.round(parseFloat(originalValue) * contaienrRect.height / 100);
        }
        pixelValue = newValue;
      }
    } else if (!layoutUtils.isPercentage(originalValue) && unit === UnitTypes.PERCENTAGE) { // change from pixel to percentage
      if (contaienrRect) {
        if (prop === 'left' || prop === 'right' || prop === 'width') {
          newValue = (parseFloat(originalValue) * 100 / contaienrRect.width).toFixed(4);
        } else {
          newValue = (parseFloat(originalValue) * 100 / contaienrRect.height).toFixed(4);
        }
      }
      pixelValue = parseFloat(originalValue);
    }

    if (!pixelValue && unit === UnitTypes.PERCENTAGE) {
      // change percentage value
      const total = prop === 'width' ? contaienrRect.width : contaienrRect.height;
      pixelValue = Math.round(distance * total / 100);
    } else if (!pixelValue && unit === UnitTypes.PIXEL){
      pixelValue = distance;
    }

    bbox = bbox.set(prop, unit === UnitTypes.PERCENTAGE ? `${newValue}%` : `${newValue}px`);

    if (this.props.layoutItem.setting?.heightMode === 'ratio') {
      const ratio = this.props.layoutItem.setting.aspectRatio;
      if (prop === 'width') {
        const height = pixelValue * ratio;
        if (layoutUtils.isPercentage(bbox.height)) {
          const newValue = (height * 100 / contaienrRect.height).toFixed(4);
          bbox = bbox.set('height', `${newValue}%`);
        } else {
          bbox = bbox.set('height', `${Math.round(height)}px`);
        }
      } else {
        const width = pixelValue / ratio;
        if (layoutUtils.isPercentage(bbox.width)) {
          const newValue = (width * 100 / contaienrRect.width).toFixed(4);
          bbox = bbox.set('width', `${newValue}%`);
        } else {
          bbox = bbox.set('width', `${Math.round(width)}px`);
        }
      }
    }

    this.props.onPosChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      bbox
    );
  }

  updateAspectSetting = (heightMode?: string) => {
    let setting = this.props.layoutItem.setting || Immutable({});
    setting = setting.set('heightMode', heightMode);
    if (heightMode === 'ratio') {
      const itemRect = this.getSizeOfItem();
      if (itemRect) {
        setting = setting.set('aspectRatio', Number((itemRect.height / itemRect.width).toFixed(2)));
      }
    } else {
      let bbox = this.props.layoutItem.bbox as IMBoundingBox;
      const rect = this.getSizeOfItem();
      if (layoutUtils.isPercentage(bbox.width)) {
        const contaienrRect = this.getSizeOfContainer();
        bbox = bbox.set('width', `${(rect.width * 100 / contaienrRect.width).toFixed(4)}%`);
      } else {
        bbox = bbox.set('width', `${Math.round(rect.width)}px`);
      }
      bbox = bbox.set('height', `${Math.round(rect.height)}px`);
      this.props.onPosChange(
        {
          layoutId: this.props.layoutId,
          layoutItemId: this.props.layoutItem.id,
        },
        bbox
      );
    }

    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting,
    );
  }

  updateAlignSelf = (e) => {
    let setting = this.props.layoutItem.setting || Immutable({});
    setting = setting.setIn(['style', 'alignSelf'], e.target.value);
    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting,
    );
  }

  updateHeightMode = (mode: LayoutItemSizeModes) => {
    const setting = this.props.layoutItem.setting || Immutable({});

    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting.setIn(['autoProps', 'height'], mode)
    );
  }

  updateWidthMode = (mode: LayoutItemSizeModes) => {
    const setting = this.props.layoutItem.setting || Immutable({});

    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting.setIn(['autoProps', 'width'], mode)
    );
  }

  updateAspectRatio = (newRatio) => {
    let setting = this.props.layoutItem.setting || Immutable({});
    setting = setting.set('aspectRatio', newRatio);
    this.props.onSettingChange(
      {
        layoutId: this.props.layoutId,
        layoutItemId: this.props.layoutItem.id,
      },
      setting,
    );
  }

  getSizeOfContainer(): ClientRect {
    const layoutElem = this.querySelector(`div.flexbox-layout[data-layoutid="${this.props.layoutId}"]`);
    if (layoutElem) {
      return layoutElem.getBoundingClientRect();
    }
    return null;
  }

  getSizeOfItem(): ClientRect {
    const { layoutId, layoutItem } = this.props;
    const layoutElem = this.querySelector(
      `div.exb-rnd[data-layoutid="${layoutId}"][data-layoutitemid="${layoutItem.id}"]`);
    if (layoutElem) {
      return layoutElem.getBoundingClientRect();
    }
    return null;
  }

  querySelector(selector: string): HTMLElement {
    const appFrame: HTMLFrameElement = document.querySelector(`iframe[name="${APP_FRAME_NAME_IN_BUILDER}"]`);
    if (appFrame) {
      const appFrameDoc = appFrame.contentDocument || appFrame.contentWindow.document;
      return appFrameDoc.querySelector(selector);
    }
    return null;
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  getStyle() {
    return css`
      .rotation-setting, .rotation-setting input {
        height: 26px;
      }

      .ratio-value {
        font-size: 12px;
      }

      .align-select {
        .dropdown-button, .dropdown-button:hover {
          height: 26px;
        }
      }
    `;
  }

  // getAspectRatio() {
  //   const ratio = this.props.layoutItem.setting?.aspectRatio ?? -1;
  //   if (ratio < 0) {
  //     return '';
  //   }
  //   const width = 100;
  //   const height = Math.round(ratio * 100);
  //   const common = layoutUtils.gcd(width, height);
  //   return `${width / common} : ${height / common}`;
  // }

  render() {
    const { layoutId, layoutItem, isLockLayout } = this.props;
    if (!layoutItem) {
      return null;
    }
    const setting = layoutItem.setting || {};
    const style = setting.style || {};
    const bbox = layoutItem.bbox || {};
    const isAutoWidth = setting.autoProps?.width !== LayoutItemSizeModes.Custom;
    const heightMode = setting.autoProps?.height ?? LayoutItemSizeModes.Custom;
    const keepAspectRatio = setting.heightMode === 'ratio';

    return (
      <div className="column-item-setting" css={this.getStyle()}>
        {!isLockLayout && <React.Fragment>
          <SettingSection title={this.formatMessage('size')}>
            <SettingRow label={this.formatMessage('width')}>
              <div style={inputStyle}>
                <SizeEditor
                  label="W"
                  mode={isAutoWidth ? LayoutItemSizeModes.Stretch : LayoutItemSizeModes.Custom}
                  sizeModes={[LayoutItemSizeModes.Custom, LayoutItemSizeModes.Stretch]}
                  value={bbox?.width}
                  availableUnits={availableWidthUnits}
                  onChange={value => this.updateBBox('width', value)}
                  onModeChange={this.updateWidthMode}
                ></SizeEditor>
              </div>
            </SettingRow>
            <SettingRow label={this.formatMessage('height')}>
              <div style={inputStyle}>
                <SizeEditor
                  label="H"
                  mode={heightMode || LayoutItemSizeModes.Custom}
                  sizeModes={heightModes}
                  value={bbox.height}
                  availableUnits={availableHeightUnits}
                  onChange={value => this.updateBBox('height', value)}
                  onModeChange={this.updateHeightMode}
                  disabled={keepAspectRatio}
                ></SizeEditor>
              </div>
            </SettingRow>
            {heightMode === LayoutItemSizeModes.Custom &&
            <SettingRow>
              <Checkbox
                checked={keepAspectRatio}
                onChange={(e) => this.updateAspectSetting(e.target.checked ? 'ratio' : 'fixed')}
                className="mr-2"
              ></Checkbox>
              {this.formatMessage('keepAspectRatio')}
            </SettingRow>}
            {keepAspectRatio &&
            <SettingRow label={this.formatMessage('aspectRatio')}>
              <InputRatio value={setting.aspectRatio} style={inputStyle} onChange={this.updateAspectRatio}/>
            </SettingRow>}
            {!isAutoWidth && <SettingRow label={this.formatMessage('align')}>
              <Select className="align-select" value={style.alignSelf ?? 'flex-start'} onChange={this.updateAlignSelf} style={inputStyle}>
                <option value="flex-start">{this.formatMessage('start')}</option>
                <option value="flex-end">{this.formatMessage('end')}</option>
                <option value="center">{this.formatMessage('center')}</option>
              </Select>
            </SettingRow>}
            <CommonTransformSetting
              layoutId={layoutId}
              layoutItemId={layoutItem.id}
              setting={setting}
              onSettingChange={this.props.onSettingChange}
              formatMessage={this.props.formatMessage}/>
          </SettingSection>
        </React.Fragment>}
        {(layoutItem.widgetId || layoutItem.sectionId) && <CommonLayoutItemSetting
          layoutId={layoutId}
          layoutItemId={layoutItem.id}
          isSection={layoutItem.type === LayoutItemType.Section}
          style={this.props.style}
          onStyleChange={this.props.onStyleChange}
          onSettingChange={this.props.onSettingChange}
          formatMessage={this.props.formatMessage}/>}
      </div>
    );
  }
}
