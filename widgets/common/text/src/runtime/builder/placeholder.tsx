/* eslint-disable @typescript-eslint/no-unused-vars*/
import { React } from 'jimu-core';
import { hooks } from 'jimu-ui';
const { useEffect, useRef, useCallback, useState } = React;
import { RichTextEditorProps, Editor, Sources, RichTextEditor } from 'jimu-ui/advanced/rich-text-editor';
import { operatePlaceholder, getCleanStyle, getDefaultValue, setSecurityContent } from './utils';

export type EditorPlaceholderProps = Omit<RichTextEditorProps, 'defaultValue' | 'onChange' | 'value' | 'enabled'> & {
  enabled: boolean;
  value?: string;
  onChange?: (value: string, placeholder: string) => void;
};

const useRefValues = (enabled: boolean, value: string, placeholder: string, onChange) => {
  const ref = useRef({ enabled, value, placeholder, onChange });
  useEffect(() => {
    ref.current = { enabled, value, placeholder, onChange };
  }, [enabled, value, placeholder, onChange])
  return ref;
}

export const EditorPlaceholder = (props: EditorPlaceholderProps) => {
  const {
    editorRef: editorRefProp,
    value: valueProp,
    placeholder: placeholderProp,
    enabled,
    onChange,
    ...others
  } = props;

  const [editorRef, handleEditor] = hooks.useForwardRef<Editor>(editorRefProp);
  const [value, setValue] = useState(valueProp);
  const [placeholder, setPlacehodler] = useState(placeholderProp);
  const refValues = useRefValues(enabled, value, placeholder, onChange);

  const handleChange = useCallback((html: string, _, source: Sources) => {
    if (source === 'silent') return;
    const { enabled, value, placeholder } = refValues.current;
    //placeholder is editing
    if (operatePlaceholder(value, placeholder, enabled)) {
      setPlacehodler(html)
    } else {
      //Otherwise, value is editing
      setValue(html);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enabledRef = useRef(enabled);

  useEffect(() => {
    const { value, placeholder, onChange } = refValues.current;
    const editor = editorRef.current;
    if (!enabled) {
      if (enabledRef.current) {
        //when enabled from true to false, try set placeholder as rich content
        if (operatePlaceholder(value, placeholder)) {
          setSecurityContent(placeholder, editor);
        }
        onChange?.(value, placeholder);
      }
    } else {
      if (!enabledRef.current) {
        const editor = editorRef.current;
        //when enabled from false to true, try set placeholder style (content not included) as rich content
        if (operatePlaceholder(value, placeholder)) {
          const value = getCleanStyle(editor, placeholder);
          setSecurityContent(value, editor);
          editor.focus();
        }
      }
    }
    enabledRef.current = enabled;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  hooks.useUnmount(() => {
    const { value, placeholder, onChange } = refValues.current;
    onChange?.(value, placeholder);
  });

  return <RichTextEditor
    enabled={enabled}
    editorRef={handleEditor}
    onChange={handleChange}
    defaultValue={getDefaultValue(enabled, value, placeholder, editorRef.current)}
    {...others} />
}