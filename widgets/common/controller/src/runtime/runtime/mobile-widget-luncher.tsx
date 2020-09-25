import { React } from 'jimu-core';
import { MobilePanel } from 'jimu-ui';
import { useWidgetTitle } from '../common/utils';
import { WidgetRenderer } from './widget-renderer';

export interface MobileWidgetLuncherProps {
  widgetId: string;
  containerMapId: string;
  onClose?: (id?: string) => any;
}

export const MobileWidgetLuncher = (props: MobileWidgetLuncherProps) => {
  const { widgetId, containerMapId, onClose } = props;
  const title = useWidgetTitle(widgetId);

  const handleClose = React.useCallback((widgetId: string, evt?: React.MouseEvent<HTMLDivElement>) => {
    evt?.stopPropagation();
    evt?.nativeEvent.stopImmediatePropagation();
    onClose?.(widgetId);
  }, [onClose]);

  return <MobilePanel
    mapWidgetId={containerMapId}
    title={title}
    open={!!widgetId}
    toggle={() => handleClose(widgetId)}>
    <WidgetRenderer widgetId={widgetId}></WidgetRenderer>
  </MobilePanel>
}