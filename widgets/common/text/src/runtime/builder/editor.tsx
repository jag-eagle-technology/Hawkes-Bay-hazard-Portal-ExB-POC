/** @jsx jsx */
import { jsx, ImmutableArray, UseDataSource } from 'jimu-core';
import { Editor as EditorType } from 'jimu-ui/advanced/rich-text-editor';
import { EditorPlaceholder, EditorPlaceholderProps } from './placeholder';
import { useInvalidStyle, usePlugin, useEditorCycle, TEXT_MODULES } from './hooks';

interface EditorProps extends Omit<EditorPlaceholderProps, 'modules' | 'plugin' | 'editorRef'> {
  widgetId: string;
  useDataSources?: ImmutableArray<UseDataSource>;
  onCreate?: (editor: EditorType) => void;
  onDestory?: () => void;
  value?: string;
}

export const Editor = (props: EditorProps) => {
  const {
    value,
    widgetId,
    useDataSources,
    onChange,
    onCreate: onEditorCreate,
    onDestory: onEditorDestory,
    ...others
  } = props;

  const setEditor = useEditorCycle(onEditorCreate, onEditorDestory);
  const plugin = usePlugin(widgetId, useDataSources);
  const style = useInvalidStyle(value, useDataSources);

  return <EditorPlaceholder
    editorRef={setEditor}
    css={style}
    value={value}
    modules={TEXT_MODULES}
    plugin={plugin}
    onChange={onChange}
    {...others}
  />;
}