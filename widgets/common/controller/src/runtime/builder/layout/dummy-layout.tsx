/** @jsx jsx */
import { React, css, jsx, ReactRedux, IMState, getAppStore, Immutable, appActions, IMLayoutJson } from 'jimu-core';
import { Popper, Size, Placement, hooks } from 'jimu-ui';
import { useWidgetLayouts, useControlledWidgetsSelected, useWidgetTitle } from '../../common/utils';
import { CONTAINER_LAYOUT_NAME } from '../../../common/consts';
import { getAppConfigAction } from 'jimu-for-builder';
import { LayoutBuilder } from 'jimu-layouts/layout-builder'
import { useWidgetLayout } from '../../../common/utils';
const { useCallback, useRef, useEffect, useState } = React;

export interface DummyLayoutProps {
  reference: HTMLDivElement;
  placement?: Placement;
  widgetId: string;
  controllerId: string;
  version?: number;
  onClose: () => void;
  size: Size;
  onSizeChange?: (widgetId: string, size: Size) => void;
}

const style = css`
  /* hide rnd-resize bar for the outermost layout item */
  .controller-configuration-container .builder-layout-item > .select-wrapper > .action-area {
      > .rnd-resize-top,
      > .rnd-resize-right,
      > .rnd-resize-bottom,
      > .rnd-resize-left {
        display: none;
      }
    }

    .controller-configuration-container .builder-layout-item > .select-wrapper > .lock-layout-tip {
      display: none;
    }

  .selectable {
    > div {
      cursor: default;
    }
  }

  .widget-container {
    overflow: auto;
  }
`;

const MIN_SIZE = { width: 150, height: 150 };
const DEFAULT_SIZE = { width: 300, height: 300 };

const DRAGGABLE_PROPS = {
  bounds: 'body'
};

export const DummyLayout = (props: DummyLayoutProps) => {
  const {
    reference,
    placement,
    widgetId,
    controllerId,
    onClose,
    onSizeChange,
    size,
    version
  } = props;

  const elementIdRef = useRef('0');
  const layouts = useWidgetLayouts(controllerId, CONTAINER_LAYOUT_NAME);
  const layout = useWidgetLayout(controllerId, CONTAINER_LAYOUT_NAME);
  const selected = useControlledWidgetsSelected(controllerId);
  const layoutAbility = ReactRedux.useSelector((state: IMState) => state.widgetsState[controllerId]?.layoutAbility);
  const title = useWidgetTitle(widgetId);
  const [open, setOpen] = useState(!!widgetId);

  hooks.useUpdateEffect(() => {
    setOpen(false);
    setTimeout(() => {
      setOpen(!!widgetId);
    }, 100);
  }, [widgetId]);

  useEffect(() => {
    if (layoutAbility) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutAbility]);

  useEffect(() => {
    if (!selected) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (widgetId) {
      createLayoutElement(widgetId, layout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetId])

  const isItemAccepted = () => {
    return false;
  }

  const getLayoutElementJson = useCallback((widgetId: string) => {
    return {
      type: 'WIDGET',
      widgetId: widgetId,
      bbox: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      },
      id: elementIdRef.current
    };
  }, []);

  const createLayoutElement = useCallback((widgetId: string, layout: IMLayoutJson) => {
    if (layout) {
      let appConfig = getAppConfigAction().appConfig;
      const elementJson = getLayoutElementJson(widgetId);

      appConfig = appConfig.setIn(['layouts', layout.id, 'content', elementJson.id], elementJson)
        .setIn(['layouts', layout.id, 'order'], [elementJson.id]);
      getAppConfigAction(appConfig).exec();
      getAppStore().dispatch(appActions.selectionChanged((Immutable({ layoutId: layout.id, layoutItemId: elementIdRef.current }))));
    }
  }, [getLayoutElementJson]);

  const handleResize = useCallback((size) => {
    onSizeChange(widgetId, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetId]);

  return <React.Fragment>
    {open && <Popper
      floating={true}
      open={true}
      title={title}
      onTriggerClose={onClose}
      minSize={MIN_SIZE}
      onResize={handleResize}
      draggableProps={DRAGGABLE_PROPS}
      defaultSize={size || DEFAULT_SIZE}
      css={style}
      version={version}
      className="flex-grow-1"
      reference={reference}
      placement={placement}>
      <div className="widget-container controller-configuration-container d-flex p-1">
        <LayoutBuilder isItemAccepted={isItemAccepted} layouts={layouts} itemDraggable={false} itemResizable={true} showDefaultTools={false} />
      </div>
    </Popper>}
  </React.Fragment>
}