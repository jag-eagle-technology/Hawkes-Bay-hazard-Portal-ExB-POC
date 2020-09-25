import * as utils from '../src/runtime/builder/utils';
import { Immutable, UseDataSource } from 'jimu-core';

describe('utils test', function () {

  it('test:replaceUseDataSourcesFields', () => {
    const useDataSources = Immutable([Immutable({
      dataSourceId: 'ds-1',
      fields: ['a']
    })]);

    let useDataSources2 = Immutable([Immutable({
      dataSourceId: 'ds-2',
      fields: ['b']
    })]);

    expect(utils.replaceUseDataSourcesFields(useDataSources as any, null)).toEqual(Immutable([Immutable({
      dataSourceId: 'ds-1',
      fields: []
    })]) as any);

    expect(utils.replaceUseDataSourcesFields(useDataSources as any, useDataSources2 as any)).toEqual(Immutable([Immutable({
      dataSourceId: 'ds-1',
      fields: []
    })]) as any);

    useDataSources2 = Immutable([Immutable({
      dataSourceId: 'ds-1',
      fields: ['b']
    })]);

    expect(utils.replaceUseDataSourcesFields(useDataSources as any, useDataSources2 as any)).toEqual(Immutable([Immutable({
      dataSourceId: 'ds-1',
      fields: ['b']
    })]) as any);

  });

  it('test:getUseDataSourceIds', () => {
    const html = `<p> ddd<exp data-uniqueid="e3c" data-dsid="ds_1" data-expression="{name: value}">{Rank}</exp>
    * <a href="#" target="_blank" data-uniqueid="9721" data-dsid="ds_2" data-link="{name:value}">link</a></p>`;
    expect(utils.getUseDataSourceIds(html)).toEqual(['ds_1', 'ds_2']);
  });

  it('test:getInvalidDataSourceIds', () => {
    const html = `<p> ddd<exp data-uniqueid="e3c" data-dsid="ds_1" data-expression="{name: value}">{Rank}</exp>
    * <a href="#" target="_blank" data-uniqueid="9721" data-dsid="ds_2" data-link="{name:value}">link</a></p>`;

    const useDataSources = Immutable([{
      dataSourceId: 'ds_1',
      fields: ['a']
    } as UseDataSource]);
    expect(utils.getInvalidDataSourceIds(html, useDataSources)).toEqual(['ds_2']);
  });

  it('test:getExpressionParts', () => {
    const expressions = Immutable({
      exp1: {
        parts: [1]
      },
      exp2: {
        parts: [2]
      }
    }) as any;
    expect(utils.getExpressionParts(expressions as any)).toEqual([1, 2] as any);
  });

  it('usePlaceholder', () => {
    expect(utils.operatePlaceholder('', 'foo')).toBeTruthy();
    expect(utils.operatePlaceholder('foo', 'bar')).toBeFalsy();
    expect(utils.operatePlaceholder('', 'foo', false)).toBeTruthy();
    expect(utils.operatePlaceholder('', 'foo', true)).toBeFalsy();
  })

  it('getCleanStyle', () => {
    expect(utils.getCleanStyle(null, '<strong>foo</strong>')).toBe('<strong>\uFEFF</strong>');
    expect(utils.getCleanStyle(null, 'foo')).toBe('\uFEFF');
  })

  it('useDefaultValue', () => {
    expect(utils.getDefaultValue(true, '', '<strong>foo</strong>', null)).toBe('<strong>\uFEFF</strong>');
    expect(utils.getDefaultValue(false, '', '<strong>foo</strong>', null)).toBe('<strong>foo</strong>');

    expect(utils.getDefaultValue(true, 'foo', '<strong>foo</strong>', null)).toBe('foo');
    expect(utils.getDefaultValue(false, 'foo', '<strong>foo</strong>', null)).toBe('foo');
  })

});