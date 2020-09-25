import {
  React, classNames, AllWidgetProps, IMState, RepeatedDataSource, css, appActions, AppMode, Immutable,
  ReactRedux, IntlShape, IMExpressionMap, expressionUtils, ExpressionMap
} from 'jimu-core';
import { IMConfig } from '../config';
import { Editor } from 'jimu-ui/advanced/rich-text-editor';
import { Displayer } from './displayer';
import defaultMessages from './translations/default';
const { useCallback } = React;
import { hooks, richTextUtils } from 'jimu-ui';
const { useSelector, useDispatch } = ReactRedux;
const { useState, useMemo, useEffect, useRef } = React;

enum RepeatType { None, Main, Sub }

const translate = (id: string, intl: IntlShape) => {
  return intl ? intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : '';
}

const translatePlaceholder = (placeholder: string, intl: IntlShape) => {
  if (placeholder === defaultMessages.placeholder) {
    placeholder = translate('placeholder', intl);
  }
  return placeholder;
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const {
    builderSupportModules,
    id,
    intl,
    useDataSources: propUseDataSources,
    repeatedDataSource,
    useDataSourcesEnabled,
    isInlineEditing,
    config
  } = props;

  const dispatch = useDispatch();
  const isInBuilder = useSelector((state: IMState) => state.appContext.isInBuilder);
  const appMode = useSelector((state: IMState) => state.appRuntimeInfo.appMode);

  const getAppConfigAction = builderSupportModules?.jimuForBuilderLib.getAppConfigAction;
  const RichEditor = builderSupportModules?.widgetModules.Editor;
  const builderUtils = builderSupportModules?.widgetModules.builderUtils;

  //Check whether the widget is selected in builder
  const active = hooks.useWidgetSelected(id);

  const wrap = config?.style?.wrap;
  const text = config?.text;
  const tooltip = config?.tooltip;
  const placeholder = translatePlaceholder(config?.placeholder, intl);
  const useDataSources = useDataSourcesEnabled ? propUseDataSources : undefined;
  const [repeat, setRepeat] = useState(2);
  //The expressions in rich-text
  const [expressions, setExpressions] = useState<IMExpressionMap>(null);

  //Check whether the text is in the list widget according to the repeatedDataSource
  //  If there is no repeatedDataSource, it is not in the list widget => RepeatType.None
  //  If repeatedDataSource.recordIndex is 0, means that it is the edited one in the list widget => RepeatType.Main
  //  If repeatedDataSource.recordIndex is not 0, means that it is the widget in the list that only displays text => RepeatType.Sub
  useEffect(() => {
    let repeat;
    if (!repeatedDataSource) {
      repeat = RepeatType.None;
    } else {
      if ((repeatedDataSource as RepeatedDataSource).recordIndex === 0) {
        repeat = RepeatType.Main;
      } else {
        repeat = RepeatType.Sub;
      }
    }
    setRepeat(repeat);
  }, [repeatedDataSource]);

  //When appMode changed, set `isInlineEditing` to false
  useEffect(() => {
    if (appMode === AppMode.Run) {
      dispatch(appActions.setWidgetIsInlineEditingState(id, false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appMode]);

  // Automatically activate editing for newly added text widget
  const activeRef = hooks.useRefValue(active);
  useEffect(() => {
    if (activeRef.current) {
      dispatch(appActions.setWidgetIsInlineEditingState(id, true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When `isInlineEditing` changed, set `showExpression` to false
  useEffect(() => {
    if (!isInlineEditing) {
      dispatch(appActions.widgetStatePropChange(id, 'showExpression', false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInlineEditing]);

  // Determine whether it can be edited:
  //   The widget is activated (selected) and is not only used to display the text in the list(RepeatType.Sub), it is editable
  const editable = useMemo(() => {
    return active && repeat !== RepeatType.Sub;
  }, [repeat, active]);

  const style = useMemo(() => {
    return css`
      display: flex;
      /* if editable, make the editor wrea scrollable, otherwise, set overflow as hidden*/
      overflow: ${editable ? 'auto' : 'hidden'};
      /* Ensure that the cursor can be displayed when automatic width of layout */
      min-width: 12px;
    `
  }, [editable]);

  // Send `editor` instance to setting through `widgetMutableStatePropChange`
  const onEditorCreate = (editor: Editor) => {
    dispatch(appActions.widgetMutableStatePropChange(id, 'editor', editor));
  }

  const onEditorDestory = () => {
    dispatch(appActions.widgetMutableStatePropChange(id, 'editor', null));
  }

  const unMountingRef = useRef(false);

  useEffect(() => {
    return () => {
      unMountingRef.current = true;
    }
  }, []);

  hooks.useUpdateEffect(() => {
    let expressions = richTextUtils.getAllExpressions(text);
    expressions = expressions || Immutable({}) as IMExpressionMap;
    expressions = expressions.merge((tooltip ? { tooltip } : {}) as ExpressionMap);
    setExpressions(expressions);
  }, [text, tooltip]);

  //Save text and placeholder to config
  const onEditorChange = useCallback((value: string, placeholder: string) => {
    if (unMountingRef.current) return;
    if (!isInBuilder) return;
    getAppConfigAction().editWidget({ id, config: config.set('text', value).set('placeholder', placeholder) }).exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  //When `expressions` changed, put the fields in `useDataSources`
  hooks.useUpdateEffect(() => {
    if (unMountingRef.current) return;
    if (!isInBuilder) return;
    if (!useDataSources) return;
    const hasFields = expressionUtils.whetherHasFieldsInUseDataSources(useDataSources);
    const parts = builderUtils.getExpressionParts(expressions);
    if (!hasFields && !parts?.length) return;

    let udsWithFields = expressionUtils.getUseDataSourceFromExpParts(parts, useDataSources) as any;
    const udsWithoutFields = expressionUtils.getUseDataSourcesWithoutFields(useDataSources);
    udsWithFields = expressionUtils.mergeUseDataSources(udsWithoutFields, udsWithFields);

    getAppConfigAction().editWidget({
      id,
      useDataSources: udsWithFields as any
    }).exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expressions]);

  return <div
    data-testid="text-widget"
    css={style}
    className={classNames('widget-text jimu-widget p-1')}>
    {editable && <RichEditor
      widgetId={id}
      nowrap={!wrap}
      useDataSources={useDataSources}
      enabled={!!isInlineEditing}
      onCreate={onEditorCreate}
      onDestory={onEditorDestory}
      onChange={onEditorChange}
      placeholder={placeholder}
      preserveWhitespace={true}
      value={text}>
    </RichEditor>}
    {!editable && <Displayer
      value={text}
      tooltip={tooltip}
      wrap={wrap}
      preview={isInBuilder && appMode === AppMode.Run}
      placeholder={placeholder}
      useDataSources={useDataSources}
      widgetId={id}
      repeatedDataSource={repeatedDataSource as RepeatedDataSource} />}
  </div>;
}

export default Widget;