import { Immutable, ImmutableArray, ThemeVariables, IMUseDataSource, ExpressionPart, IMExpressionMap, UseDataSource } from 'jimu-core';
import { Formats, Editor } from 'jimu-ui/advanced/rich-text-editor';
import { sanitizer, richTextUtils, styleUtils } from 'jimu-ui';

type IMUseDataSources = ImmutableArray<UseDataSource>;

export const DATA_SOURCE_ID_REGEXP = /data-dsid=\"(((?![\=|\>|\"]).)*)[\"\>|"\s)]/gm;

export const getDataSourceIds = (useDataSources: ImmutableArray<UseDataSource> = Immutable([])): ImmutableArray<string> => {
  return useDataSources.map(ds => ds.dataSourceId);
}

export const getTextFormats = (theme: ThemeVariables): Formats => {
  const font = (theme && theme.typography.fontFamilyBase) || 'Avenir Next';
  const linespace = (theme && theme.typography.lineHeights.medium) || '1.5';
  const color = theme && theme.body.color; //todo header?
  let size = (theme && theme.typography.fontSizeBase) || '14px';
  size = styleUtils.remToPixel(size);
  return { font, linespace, color, size };
}

/**
 * Replace fields in uds1 with fields in uds2, if uds1 does not have a corresponding uds2, set its fields as an empty array
 * @param uds1 {dataSourceId: 'ds_1', fields: ['name'], dataSourceId: 'ds_2', fields: ['pop']}
 * @param uds2 {dataSourceId: 'ds_1', fields: ['state']}
 * @returns {dataSourceId: 'ds_1', fields: ['state'], dataSourceId: 'ds_2', fields: []}
 */
export const replaceUseDataSourcesFields = (uds1: IMUseDataSources, uds2: IMUseDataSources): ImmutableArray<UseDataSource> => {
  if (!uds1) {
    return;
  }
  return uds1.map(uds => {
    const dsid = uds.dataSourceId;
    const dataSource = uds2 ? getUseDataSourceById(uds2, dsid) : null;
    if (!dataSource) {
      return uds.set('fields', []);
    }
    const fields = dataSource.fields;
    return uds.set('fields', fields);
  }) as any;
}

export const getUseDataSourceById = (useDataSources: IMUseDataSources, id: string): IMUseDataSource => {
  return useDataSources.filter(val => val.dataSourceId === id)[0];
}

/**
 * Getting the data source ids from html string through regular expressions
 *
 * @param html
 *
 * <p> ddd<exp data-uniqueid="e3c" data-dsid="ds_1" data-expression="{name: value}">{Rank}</exp>
 * <a href="#" target="_blank" data-uniqueid="9721" data-dsid="ds_2" data-link="{name:value}">link</a></p>
 *
 * @returns ['ds_1', 'ds_2']
 */
export const getUseDataSourceIds = (html: string): string[] => {
  const regexp = DATA_SOURCE_ID_REGEXP;
  let strings = [];
  let matches;
  while ((matches = regexp.exec(html)) !== null) {
    let ids = matches[1];
    if (ids.indexOf(',') > 0) {
      ids = ids.split(',');
      strings = strings.concat(ids)
    } else {
      strings.push(ids);
    }
  }
  return strings;
}

export const getInvalidDataSourceIds = (text: string, useDataSources: ImmutableArray<UseDataSource>): string[] => {
  const ids = this.getUseDataSourceIds(text);
  if (!ids || !ids.length) {
    return;
  }
  const uds = getDataSourceIds(useDataSources);
  const dsids = ids.filter(id => uds.indexOf(id) < 0);
  if (dsids.length) {
    return dsids;
  }
}

/**
 * Get expression parts from expressions
 * @param expressions
 */
export const getExpressionParts = (expressions: IMExpressionMap): ExpressionPart[] => {
  let parts = [];
  for (const uniqueid in expressions) {
    const expression = expressions[uniqueid];
    const iparts = expression && expression.parts;
    if (iparts) {
      parts = parts.concat(iparts);
    }
  }
  return parts;
}


export const BLANK_CHARATER = '\uFEFF';
const TEMP_NODE = document.createElement('div');

const getTextContent = (html: string) => {
  TEMP_NODE.innerHTML = html;
  return TEMP_NODE.textContent;
}

export const operatePlaceholder = (value: string, placeholder: string, enabled?: boolean) => {
  const onlyPlaceholder = richTextUtils.isBlankRichText(value) && placeholder;
  if (typeof enabled !== 'undefined') {
    return !enabled && onlyPlaceholder;
  }
  return onlyPlaceholder;
}

export const sanitizeHTML = (html: string) => {
  if (!html) return html;
  return sanitizer.sanitize(html);
}

/**
 *
 * Remove the text content of the placeholder and keep its external html tag
 *
 * @param editor
 * @param placeholder <p><strong>foo</strong></p>
 *
 * @returns <p><strong>\uFEFF</strong></p>
 */
export const getCleanStyle = (editor: Editor, placeholder: string) => {
  if (!placeholder) return;
  const plaintext = editor ? editor.getText() : getTextContent(placeholder);
  return placeholder?.replace(plaintext?.trim(), BLANK_CHARATER);
}

export const getDefaultValue = (enabled: boolean, value: string, placeholder: string, editor: Editor) => {
  let defaultValue = value;
  if (enabled) {
    //when enabled from false to true, try set placeholder (content not included) as rich content
    if (operatePlaceholder(value, placeholder)) {
      defaultValue = getCleanStyle(editor, placeholder);
    }
  } else {
    const usePlaceholder = operatePlaceholder(value, placeholder);
    defaultValue = usePlaceholder ? placeholder : value;
  }

  return sanitizeHTML(defaultValue);
}

/**
 * Sanitize rich text and set as content of editor
 * @param html
 * @param editor
 */
export const setSecurityContent = (html: string, editor: Editor) => {
  if (!editor) return;
  html = sanitizeHTML(html);
  editor.setContents(editor.clipboard.convert(html), 'silent');
};