import { React, ThemeContext, IntlShape, injectIntl, IMState, appActions, getAppStore, ReactRedux, ImmutableArray, UseDataSource } from 'jimu-core';
import { Editor, Formats, Bubble, Expression } from 'jimu-ui/advanced/rich-text-editor';
import { mixinFormats } from '../../utils';
import { defaultMessages } from 'jimu-ui';
const { useContext, useCallback, useMemo } = React;

export const translate = (id: string, intl: IntlShape) => {
  return intl ? intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : '';
}

export interface TextPliuginsProps {
  editor: Editor;
  useDataSources: ImmutableArray<UseDataSource>;
  widgetId: string;
}

interface ExtraProps {
  showExpression?: boolean;
}

interface ExtraProps2 {
  intl: IntlShape;
}

export const _TextPlugins = (props: TextPliuginsProps & ExtraProps & ExtraProps2) => {
  const theme = useContext(ThemeContext);
  const { editor, showExpression, useDataSources, intl, widgetId } = props;

  const mixinFormat = useCallback((formats: Formats = {}): Formats => {
    return mixinFormats(theme, formats);
  }, [theme]);

  const headerProps = useMemo(() => ({
    title: translate('dynamicContent', intl),
    onClose: () => getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showExpression', false))
  }), [widgetId, intl])

  return <React.Fragment>
    <Bubble editor={editor} mixFormats={mixinFormat} source="user" ></Bubble>
    <Expression
      source="user"
      editor={editor}
      open={showExpression}
      useDataSources={useDataSources}
      header={headerProps}
      widgetId={widgetId}
    ></Expression>
  </React.Fragment>
}

const mapState = (state: IMState, ownProps: TextPliuginsProps) => {
  const showExpression = !!(state.widgetsState[ownProps.widgetId]?.showExpression);
  return { showExpression };
}

export const TextPlugins = ReactRedux.connect<ExtraProps, {}, TextPliuginsProps>(mapState)(injectIntl(_TextPlugins));