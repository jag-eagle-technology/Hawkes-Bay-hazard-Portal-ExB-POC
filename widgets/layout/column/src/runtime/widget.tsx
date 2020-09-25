/** @jsx jsx */
import { BaseWidget, AllWidgetProps, jsx } from 'jimu-core';
import { IMFlexboxConfig } from '../config';
import { WidgetPlaceholder } from 'jimu-ui';
import defaultMessages from './translations/default';
import FlexboxLayout from '../layout/runtime/layout';

const IconImage = require('./assets/icon.svg');

export default class Widget extends BaseWidget<AllWidgetProps<IMFlexboxConfig>>{
  render() {
    const { layouts, id, intl, builderSupportModules } = this.props;
    const LayoutComponent = !window.jimuConfig.isInBuilder ?
      FlexboxLayout : builderSupportModules.widgetModules.FlexboxLayoutForBuilder;

    if (!LayoutComponent) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        No layout component!
      </div>;
    }
    const layoutName = Object.keys(layouts)[0];

    return <div className="widget-column-layout w-100 h-100" style={{overflow: 'auto'}}>
      <LayoutComponent layouts={layouts[layoutName]} config={this.props.config}>
        <WidgetPlaceholder icon={IconImage} widgetId={id}
          style={{
            border: 'none',
            height: '100%',
            pointerEvents: 'none',
            position: 'absolute'
          }}
          message={intl.formatMessage({ id: 'tips', defaultMessage: defaultMessages.tips })}></WidgetPlaceholder>
      </LayoutComponent>
    </div>;
  }
}