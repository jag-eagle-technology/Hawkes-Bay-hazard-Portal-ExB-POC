/** @jsx jsx */
import { React, css, jsx, polished, ThemeVariables, IMState, Immutable, ImmutableArray, ReactRedux, IMThemeButtonStylesByState } from 'jimu-core';
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder';
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
import { defaultMessages as jimuLayoutMessages } from 'jimu-layouts/layout-runtime';
import { IMConfig, DisplayType } from '../config';
import { Switch, Radio, NumericInput, Select, Label, ButtonGroup, Button, Icon, defaultMessages as jimuUiDefaultMessages, MultiSelect, Tabs, Tab, hooks } from 'jimu-ui';
import defaultMessages from './translations/default';
import { Shapes, ShapeType } from './shapes';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';
import { FontStyle } from 'jimu-ui/advanced/style-setting-components';
import { useWidgetIdsOfControllerLayout } from '../common/utils';
import { BASE_LAYOUT_NAME } from '../common/consts';
const { useSelector } = ReactRedux;

const DEFAULT_COLOR = '#080808';

const rightArrowIcon = require('jimu-ui/lib/icons/direction-right.svg');
const downArrowIcon = require('jimu-ui/lib/icons/direction-down.svg');

const DEFAULT_OPEN_START = 'none';

type ControlledWidgets = ImmutableArray<{
  label: string,
  value: string
}>;

const style = css`
    font-size: 13px;
    font-weight: lighter;
    .setting-row-item {
      width: 100%;
      display: flex;
      margin-top: 0.5rem;
      > span.jimu-radio {
        flex-shrink: 0;
        margin-top: 0.1rem;
      }
      > label {
        margin-bottom: 0;
      }
    }
    .font-setting-row {
      display: flex;
      align-items: center;
    }
    .jimu-multi-select {
      width: 100%;
      > .jimu-dropdown {
        width: 100%;
      }
      > .jimu-menu-item {
        width: 100%;
        height: ${polished.rem(26)};
      }
    }
  `;

export type ControllerSettingProps = AllWidgetSettingProps<IMConfig>;

const useControlledWidgets = (id: string, layoutName: string): ControlledWidgets => {
  const controlledWidgets = useWidgetIdsOfControllerLayout(id, layoutName);
  const widgets = useSelector((state: IMState) => state.appStateInBuilder.appConfig.widgets);
  const imControlledWidgets = Immutable(controlledWidgets || []);
  return imControlledWidgets.map((widgetId) => ({
    label: widgets[widgetId]?.label,
    value: widgetId
  })) as any
}

const getButtonVariant = (theme: ThemeVariables, config: IMConfig): IMThemeButtonStylesByState => {
  const type = config?.appearance?.card.avatar?.type || 'primary';
  let variant = theme?.components?.button?.variants?.[type];
  variant = variant.setIn(['default', 'color'], DEFAULT_COLOR);
  variant = variant.setIn(['active', 'color'], DEFAULT_COLOR);
  return variant;
}

const Setting = (props: ControllerSettingProps) => {
  const { id, config, theme, onSettingChange } = props;
  const onlyOpenOne = config?.behavior?.onlyOpenOne;
  const displayType = config?.behavior?.displayType;
  const vertical = config?.behavior?.vertical;
  const openStarts = config?.behavior?.openStarts;
  const space = config?.appearance?.space;
  const advanced = config?.appearance?.advanced;
  const showLabel = config?.appearance.card?.showLabel;
  const labelGrowth = config?.appearance.card?.labelGrowth ?? 0;
  const size = config?.appearance.card?.avatar?.size;
  const shape = config?.appearance.card?.avatar?.shape;

  const openStart = openStarts?.[0] ?? DEFAULT_OPEN_START;
  const iconInterval = vertical ? space : labelGrowth;

  const appTheme = useSelector((state: IMState) => state.appStateInBuilder.theme);
  const controlledWidgets = useControlledWidgets(id, BASE_LAYOUT_NAME);

  const translate = hooks.useTranslate(jimuUiDefaultMessages);
  const translateLayout = hooks.useTranslate(jimuLayoutMessages);
  const translateLocal = hooks.useTranslate(defaultMessages);

  const variant = advanced ? config?.appearance?.card.variant : getButtonVariant(appTheme, config);
  const regular = variant?.default;
  const active = variant?.active;
  const hover = variant?.hover;

  const onSettingConfigChange = (key: string | string[], value: any) => {
    let newConfig = null;
    if (Array.isArray(key)) {
      newConfig = config.setIn(key, value);
    } else {
      newConfig = config.set(key, value);
    }
    onSettingChange({
      id: id,
      config: newConfig
    });
  }

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, value: any) => {
    const checked = e.currentTarget.checked;
    if (!checked) {
      return;
    }
    let newConfig = null;
    if (key === 'onlyOpenOne') {
      newConfig = config.setIn(['behavior', 'openStarts'], Immutable([])).setIn(['behavior', key], value)
    } else if (key === 'displayType') {
      value = value ? DisplayType.Stack : DisplayType.SideBySide;
      newConfig = config.setIn(['behavior', key], value);
    }
    onSettingChange({
      id,
      config: newConfig
    });
  }

  const handleOpenStartMultipleClick = (_, value: string, selectedValues: string[]) => {
    const values = onlyOpenOne ? (selectedValues.length ? [value] : []) : selectedValues;
    onSettingConfigChange(['behavior', 'openStarts'], values);
  }

  const handleOpenStartSingleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    let openStarts = [];
    if (value !== DEFAULT_OPEN_START) {
      openStarts = [value];
    }
    onSettingConfigChange(['behavior', 'openStarts'], openStarts);
  }

  const renderMultiSelectText = (values: string[]) => {
    if (onlyOpenOne && values.length) {
      const widget = controlledWidgets.find(w => w.value === values[0]);
      return widget?.label;
    } else {
      const widgetNumber = values?.length || 0;
      return translateLocal('widgetsSelected', { widgetNumber });
    }
  }

  const onIconIntervalChanged = (value: number) => {
    value = +value;
    if (isNaN(value)) {
      value = 0;
    }

    let newConfig = config;
    if (newConfig.behavior.vertical) {
      newConfig = newConfig.setIn(['appearance', 'space'], value).setIn(['appearance', 'card', 'labelGrowth'], 0);
    } else {
      newConfig = newConfig.setIn(['appearance', 'card', 'labelGrowth'], value).setIn(['appearance', 'space'], 0);
    }
    onSettingChange({
      id,
      config: newConfig
    });
  }

  const onAdvancedChange = () => {
    const advanced = !config?.appearance?.advanced;
    let newConfig = config.setIn(['appearance', 'advanced'], advanced);
    if (advanced) {
      const variant = getButtonVariant(appTheme, config);
      newConfig = newConfig.setIn(['appearance', 'card', 'variant'], variant);
    } else {
      newConfig = newConfig.setIn(['appearance', 'card', 'variant'], undefined);
    }

    onSettingChange({
      id,
      config: newConfig
    });
  }

  const onDirectionChanged = (vertical: boolean) => {
    let newConfig = config.setIn(['behavior', 'vertical'], vertical).setIn(['appearance', 'card', 'labelGrowth'], 0);
    if (!vertical) {
      newConfig = newConfig.setIn(['appearance', 'space'], 10);
    }
    onSettingChange({
      id,
      config: newConfig
    });
    getAppConfigAction().exchangeWidthAndHeight().exec();
  }

  return <div className="widget-setting-controller jimu-widget-setting" css={style}>
    <SettingSection>
      <SettingRow flow="no-wrap" label={translateLocal('direction')}>
        <ButtonGroup>
          <Button title={translateLocal('horizontal')} type="secondary" icon size="sm" active={!vertical} onClick={() => onDirectionChanged(false)}>
            <Icon icon={rightArrowIcon}></Icon>
          </Button>
          <Button title={translateLocal('vertical')} type="secondary" icon size="sm" active={vertical} onClick={() => onDirectionChanged(true)}>
            <Icon icon={downArrowIcon}></Icon>
          </Button>
        </ButtonGroup>
      </SettingRow>
    </SettingSection>
    <SettingSection title={translateLocal('behavior')}>
      <SettingRow flow="wrap" label={translateLocal('openWidget')}>
        <div className="setting-row-item">
          <Radio id="only-open-one" style={{ cursor: 'pointer' }}
            name="only-open-one" onChange={e => onRadioChange(e, 'onlyOpenOne', true)} checked={onlyOpenOne} />
          <Label style={{ cursor: 'pointer' }} for="only-open-one" className="ml-2">{translate('single')}</Label>
        </div>
        <div className="setting-row-item">
          <Radio id="open-multiple" style={{ cursor: 'pointer' }}
            name="only-open-one" onChange={e => onRadioChange(e, 'onlyOpenOne', false)} checked={!onlyOpenOne} />
          <Label style={{ cursor: 'pointer' }} for="open-multiple" className="ml-2">{translate('multiple')}</Label>
        </div>
      </SettingRow>

      <SettingRow flow="wrap" label={translateLocal('openStart')}>
        {!onlyOpenOne && <MultiSelect
          values={openStarts}
          items={controlledWidgets}
          onClickItem={handleOpenStartMultipleClick}
          displayByValues={renderMultiSelectText} />}
        {
          onlyOpenOne && <Select value={openStart} onChange={handleOpenStartSingleChange} className="w-100">
            <option value={DEFAULT_OPEN_START}>{translate('none')}</option>
            {
              controlledWidgets?.map(item => {
                return <option key={item.value} value={item.value}>{item.label}</option>
              })
            }
          </Select>
        }
      </SettingRow>
      {!onlyOpenOne && <SettingRow flow="wrap" label={translateLocal('displayType')}>
        <div className="setting-row-item">
          <Radio id="display-stack" style={{ cursor: 'pointer' }}
            name="display-type" onChange={e => onRadioChange(e, 'displayType', true)}
            checked={displayType === DisplayType.Stack} />
          <Label style={{ cursor: 'pointer' }} for="display-stack" className="ml-2">{translateLayout('stack')}</Label>
        </div>
        <div className="setting-row-item">
          <Radio id="display-side-by-side" style={{ cursor: 'pointer' }}
            name="display-type" onChange={e => onRadioChange(e, 'displayType', false)}
            checked={displayType === DisplayType.SideBySide} />
          <Label style={{ cursor: 'pointer' }} for="display-side-by-side" className="ml-2">{translateLocal('sideBySide')}</Label>
        </div>
      </SettingRow>}

    </SettingSection>

    <SettingSection title={translateLocal('appearance', true)}>
      <SettingRow flow="wrap" label={translateLocal('iconStyle')}>
        <Shapes type={ShapeType.Circle} title={translate('circle', true)} className="mr-2" active={shape === 'circle'} theme={theme}
          onClick={() => onSettingConfigChange(['appearance', 'card', 'avatar', 'shape'], 'circle')}></Shapes>
        <Shapes type={ShapeType.Rectangle} title={translate('rectangle')} active={shape === 'rectangle'} theme={theme}
          onClick={() => onSettingConfigChange(['appearance', 'card', 'avatar', 'shape'], 'rectangle')}></Shapes>
      </SettingRow>
      <SettingRow label={translateLocal('showIconLabel')}>
        <Switch checked={showLabel} onChange={(evt) => onSettingConfigChange(['appearance', 'card', 'showLabel'], evt.target.checked)}></Switch>
      </SettingRow>
      <SettingRow flow="no-wrap" label={translateLocal('iconSize')}>
        <Select value={size} onChange={(e) => onSettingConfigChange(['appearance', 'card', 'avatar', 'size'], e.target.value)} className="w-50">
          <option value="sm">{translate('small')}</option>
          <option value="default">{translate('medium')}</option>
          <option value="lg">{translate('large')}</option>
        </Select>
      </SettingRow>
      <SettingRow flow="no-wrap" label={translateLocal('iconInterval')}>
        <NumericInput className="w-50" min={0} max={999} value={iconInterval} showHandlers={false} onAcceptValue={onIconIntervalChanged}></NumericInput>
      </SettingRow>
    </SettingSection>

    <SettingSection>
      <SettingRow flow="no-wrap" label={translateLocal('advance')}>
        <Switch checked={advanced} onChange={onAdvancedChange}></Switch>
      </SettingRow>

      {advanced && <SettingRow label={translateLocal('states')} flow="wrap">
        <Tabs pills className="flex-grow-1 w-100 h-100" fill>
          <Tab id="regular" className="tab-title-item" defaultActive={true} title={translateLocal('regular')}>
            <SettingRow className="mt-2" label={translateLocal('textFormat')} flow="no-wrap">
              <div className="font-setting-row">
                <FontStyle bold={regular?.bold} italic={regular?.italic} underline={regular?.underline} strike={regular?.strike}
                  onChange={(key, value) => onSettingConfigChange(['appearance', 'card', 'variant', 'default', key], value)}></FontStyle>
                <ThemeColorPicker specificTheme={appTheme} value={regular?.color}
                  onChange={(value) => onSettingConfigChange(['appearance', 'card', 'variant', 'default', 'color'], value)}></ThemeColorPicker>
              </div>
            </SettingRow>
            <SettingRow className="mt-2" label={translateLocal('iconBackground')} flow="no-wrap">
              <ThemeColorPicker specificTheme={appTheme} value={regular?.bg}
                onChange={(value) => onSettingConfigChange(['appearance', 'card', 'variant', 'default', 'bg'], value)}></ThemeColorPicker>
            </SettingRow>
          </Tab>
          <Tab id="selected" className="tab-title-item" title={translateLocal('selected')}>
            <SettingRow className="mt-2" label={translateLocal('textFormat')} flow="no-wrap">
              <div className="font-setting-row">
                <FontStyle bold={active?.bold} italic={active?.italic} underline={active?.underline} strike={active?.strike}
                  onChange={(key, value) => onSettingConfigChange(['appearance', 'card', 'variant', 'active', key], value)}></FontStyle>
                <ThemeColorPicker specificTheme={appTheme} value={active?.color}
                  onChange={(value) => onSettingConfigChange(['appearance', 'card', 'variant', 'active', 'color'], value)}></ThemeColorPicker>
              </div>
            </SettingRow>
            <SettingRow className="mt-2" label={translateLocal('iconBackground')} flow="no-wrap">
              <ThemeColorPicker specificTheme={appTheme} value={active?.bg}
                onChange={(value) => onSettingConfigChange(['appearance', 'card', 'variant', 'active', 'bg'], value)}></ThemeColorPicker>
            </SettingRow>

          </Tab>
          <Tab id="jover" className="tab-title-item" title={translateLocal('hover')}>
            <SettingRow className="mt-2" label={translateLocal('textFormat')} flow="no-wrap">
              <div className="font-setting-row">
                <FontStyle bold={hover?.bold} italic={hover?.italic} underline={hover?.underline} strike={hover?.strike}
                  onChange={(key, value) => onSettingConfigChange(['appearance', 'card', 'variant', 'hover', key], value)}></FontStyle>
                <ThemeColorPicker specificTheme={appTheme} value={hover?.color}
                  onChange={(value) => onSettingConfigChange(['appearance', 'card', 'variant', 'hover', 'color'], value)}></ThemeColorPicker>
              </div>
            </SettingRow>
            <SettingRow className="mt-2" label={translateLocal('iconBackground')} flow="no-wrap">
              <ThemeColorPicker specificTheme={appTheme} value={hover?.bg}
                onChange={(value) => onSettingConfigChange(['appearance', 'card', 'variant', 'hover', 'bg'], value)}></ThemeColorPicker>
            </SettingRow>
          </Tab>
        </Tabs>
      </SettingRow>}
    </SettingSection>
  </div>
}

export default Setting;