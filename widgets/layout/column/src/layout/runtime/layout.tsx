/** @jsx jsx */
import { React, ReactRedux, jsx, css, classNames, Immutable, OneByOneAnimation } from 'jimu-core';
import { styleUtils } from 'jimu-ui';
import { utils, LayoutProps, StateToLayoutProps } from 'jimu-layouts/layout-runtime';
import { FlexboxItem } from './layout-item';
import { IMFlexboxConfig } from '../../config';
import { defaultConfig } from '../../default-config';

interface OwnProps {
  config: IMFlexboxConfig;
}

type FlexLayoutProps = LayoutProps & StateToLayoutProps & OwnProps;

class Layout extends React.PureComponent<FlexLayoutProps> {
  createItem(itemId: string, index: number, layoutStyle: any) {
    const { layout, config } = this.props;

    return (
      <FlexboxItem
        key={itemId}
        index={index}
        space={+config.space >= 0 ? +config.space : defaultConfig.space}
        layoutId={layout.id}
        layoutItemId={itemId}
        layoutItem={layout.content[itemId]}>
      </FlexboxItem>
    );
  }

  render() {
    const { layout, className, config } = this.props;

    const content = layout.order || Immutable([]);
    const layoutStyle = config.style || defaultConfig.style;

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(layoutStyle as any),
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    };
    const outClass = classNames('layout flexbox-layout d-flex w-100', className);

    return (<div className={outClass} style={mergedStyle} data-layoutid={layout.id}>
      <OneByOneAnimation
        className="trail-container d-flex flex-column w-100"
        css={css`height: 100%; overflow-y: auto; overflow-x: hidden;`}
      >
        { (content.asMutable()).map((layoutItem, index) => this.createItem(layoutItem, index, layoutStyle)) }
      </OneByOneAnimation>
    </div>);
  }
}

export default ReactRedux.connect<StateToLayoutProps, {}, LayoutProps & OwnProps>(utils.mapStateToLayoutProps)(Layout);