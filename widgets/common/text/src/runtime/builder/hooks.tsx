import { React, ImmutableArray, UseDataSource, css } from 'jimu-core';
import { getInvalidDataSourceIds } from './utils';
import { TextPlugins } from './plugins';
import { RenderPlugin } from 'jimu-ui/advanced/rich-text-editor';
const { useMemo, useCallback } = React;

const INVALID_STYLE = css`
  opacity: 0.5;
  background: red;
  outline: 1px solid white;
`;

export const TEXT_MODULES = {
  toolbar: false,
  autoformat: {
    link: {
      trigger: /[\s]/,
      find: /https?:\/\/[\S]+|(www\.[\S]+)/gi,
      transform: function (value: string, noProtocol: boolean) {
        return noProtocol ? 'http://' + value : value;
      },
      format: 'link'
    }
  },
  clipboard: {
    matchers: [
      ['img', () => ({ ops: [], length: 0 })]
    ]
  }
};

export const usePlugin = (widgetId: string, useDataSources: ImmutableArray<UseDataSource>): RenderPlugin => {
  return useMemo(() => {
    return ({ editor }) => {
      return <TextPlugins editor={editor} widgetId={widgetId} useDataSources={useDataSources}></TextPlugins>
    }
  }, [useDataSources, widgetId]);
};

export const useInvalidStyle = (value: string, useDataSources: ImmutableArray<UseDataSource>) => {
  return useMemo(() => {
    //Find the invalid data source from the text
    //Because the text in config is not saved in real time,
    //so the update of invalid data source here may be delayed. [TODO]
    const dsids = getInvalidDataSourceIds(value, useDataSources);
    let expressionStyles;
    if (dsids) {
      expressionStyles = dsids.map(dsid => {
        return css`
          exp[data-dsid*="${dsid}"] {
           ${INVALID_STYLE}
          }
        `;
      });
    }
    return css`${expressionStyles}`;
  }, [value, useDataSources]);
}

export const useEditorCycle = (onEditorCreate, onEditorDestory) => {
  return useCallback(editor => {
    return editor ? onEditorCreate?.(editor) : onEditorDestory?.()
  }, [onEditorCreate, onEditorDestory]);
}