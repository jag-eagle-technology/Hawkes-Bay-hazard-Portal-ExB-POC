/** @jsx jsx */
import { React, css, jsx, ReactRedux, IMState, WidgetManager, ErrorBoundary, WidgetState, classNames } from 'jimu-core';
import { Loading } from 'jimu-ui';
import { dispatchActiveWidget } from '../common/utils';
const { useEffect } = React;

export interface WidgetRendererProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  widgetId?: string;
  canCrossLayoutBoundary?: boolean;
}

const useStyle = (canCrossLayoutBoundary?: boolean) => {

  return css`
      overflow: ${canCrossLayoutBoundary ? 'visible' : 'hidden'};
      position: relative;
      .widget-content {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 0;
      }
  `;
}

export const WidgetRenderer = (props: WidgetRendererProps) => {
  const { widgetId, canCrossLayoutBoundary, className, ...others } = props;
  const isClassLoaded = ReactRedux.useSelector((state: IMState) => state.widgetsRuntimeInfo?.[widgetId]?.isClassLoaded);
  const isActive = ReactRedux.useSelector((state: IMState) => state.widgetsRuntimeInfo?.[widgetId]?.state === WidgetState.Active);

  const loadWidgetClass = () => {
    if (widgetId && !isClassLoaded) {
      WidgetManager.getInstance().loadWidgetClass(widgetId);
    }
  }

  useEffect(() => {
    loadWidgetClass();
  });

  let WidgetClass;
  if (widgetId) {
    WidgetClass = WidgetManager.getInstance().getWidgetClass(widgetId);
  }

  const onMouseDown = () => {
    if (window.jimuConfig.isBuilder) {
      return;
    }
    if (isActive) {
      return;
    }
    dispatchActiveWidget(widgetId);
  }

  const classes = classNames('widget-renderer  w-100', className)
  const style = useStyle();

  return <div
    css={style}
    className={classes}
    onMouseDownCapture={onMouseDown}
    {...others}>
    <div className="widget-content p-1">
      {WidgetClass &&
        <ErrorBoundary>
          <WidgetClass />
        </ErrorBoundary>}
      {!WidgetClass && <Loading />}
    </div>

  </div>
}