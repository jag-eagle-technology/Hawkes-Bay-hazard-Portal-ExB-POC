/** @jsx jsx */
import { React, jsx, css, classNames, ImmutableArray, IMState, ReactRedux, polished, UseDataSource } from 'jimu-core';
import { FontFamily, Indent, Size, LinkNode, ListValue, FormatType, Formats, RichTextFormatKeys } from 'jimu-ui/advanced/rich-text-editor';
import { Icon, Button, NumericInput, ButtonGroup, AlignValue, hooks } from 'jimu-ui';
import { SettingRow } from 'jimu-ui/advanced/setting-components';
import { LinkFormatValue } from 'jimu-ui/advanced/rich-text-editor';
import { Effects } from './effects';
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker';
const { useState } = React;

const textIcon = require('jimu-ui/lib/icons/uppercase.svg');
const fillIcon = require('jimu-ui/lib/icons/fill.svg');
const boldIcon = require('jimu-ui/lib/icons/bold.svg');
const italicIcon = require('jimu-ui/lib/icons/italic.svg');
const underlineIcon = require('jimu-ui/lib/icons/underscore.svg');
const strikeIcon = require('jimu-ui/lib/icons/strike-through.svg');
const leftIcon = require('jimu-ui/lib/icons/align-left.svg');
const centerIcon = require('jimu-ui/lib/icons/align-middle.svg');
const rightIcon = require('jimu-ui/lib/icons/align-right.svg');
const justifyIcon = require('jimu-ui/lib/icons/align-justify.svg');
const bulletIcon = require('jimu-ui/lib/icons/text-dots.svg');
const orderedIcon = require('jimu-ui/lib/icons/text-123.svg');
const linkIcon = require('jimu-ui/lib/icons/link.svg');

const DEFAULTLETTERSIZE = '0px';
const DEFAULLINESTACE = 1.5;

export interface FormatsNodePorps {
  widgetId: string;
  className?: string;
  style?: any;
  useDataSources?: ImmutableArray<UseDataSource>;
  formats?: Formats;
  onChange?: (key: RichTextFormatKeys, value: any, type: FormatType, id?: string) => void;
  disableLink?: boolean;
  disableIndent?: boolean;
}

const style = css`
> * {
  user-select: none;
}
.jimu-widget-setting--row {
  margin-top: ${polished.rem(12)}
}
`;

export const FormatsNode = (props: FormatsNodePorps) => {
  const appTheme = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.theme);

  const { formats = {}, onChange, className, style: propStyle, useDataSources, widgetId, disableLink, disableIndent } = props;
  const [openLink, setOpenLink] = useState(false)

  const translate = hooks.useTranslate();

  const highlightPickerBlockProps = {
    tertiary: false,
    icon: fillIcon,
    title: translate('highlight'),
    width: 16,
    height: 4
  };

  const textColorPickerBlockProps = {
    tertiary: false,
    icon: textIcon,
    title: translate('fontColor'),
    width: 16,
    height: 4
  }

  const handleListChange = (value: ListValue) => {
    const list = formats.list === value ? false : value;
    onChange?.(RichTextFormatKeys.List, list, FormatType.BLOCK);
  }

  const handleLinkChange = (key: RichTextFormatKeys, value: LinkFormatValue, type: FormatType) => {
    onChange?.(key, value, type);
    setOpenLink(v => !v);
  }

  const toggleLinkOpen = () => {
    setOpenLink(v => !v);
  }

  const handleLinespaceChange = (evt: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const value = +evt.currentTarget.value;
    onChange?.(RichTextFormatKeys.Linespace, value, FormatType.BLOCK);
  }

  return <div css={style} style={propStyle} className={classNames(className, 'format-panel')}>
    <SettingRow>
      <div className="d-flex align-items-center justify-content-between w-100">
        <FontFamily style={{ width: '61%' }} font={formats.font} onChange={v => onChange(RichTextFormatKeys.Font, v, FormatType.INLINE)}></FontFamily>
        <Size style={{ width: '35%' }} value={formats.size} onChange={v => onChange(RichTextFormatKeys.Size, v, FormatType.INLINE)}></Size>
      </div>
    </SettingRow>

    <SettingRow>
      <div className="d-flex align-items-center justify-content-between w-100">
        <ButtonGroup size="sm">
          <Button title={translate('bold')} active={!!formats[RichTextFormatKeys.Bold]} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Bold, !formats[RichTextFormatKeys.Bold], FormatType.INLINE)}>
            <Icon size={12} icon={boldIcon}></Icon>
          </Button>
          <Button title={translate('italic')} active={!!formats[RichTextFormatKeys.Italic]} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Italic, !formats[RichTextFormatKeys.Italic], FormatType.INLINE)}>
            <Icon size={12} icon={italicIcon}></Icon>
          </Button>
          <Button title={translate('strike')} active={!!formats[RichTextFormatKeys.Strike]} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Strike, !formats[RichTextFormatKeys.Strike], FormatType.INLINE)}>
            <Icon size={12} icon={strikeIcon}></Icon>
          </Button>
          <Button title={translate('underline')} active={!!formats[RichTextFormatKeys.Underline]} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Underline, !formats[RichTextFormatKeys.Underline], FormatType.INLINE)}>
            <Icon size={12} icon={underlineIcon}></Icon>
          </Button>
        </ButtonGroup>

        <div className="d-flex align-items-center justify-content-between" style={{ width: '50%' }}>
          <ThemeColorPicker specificTheme={appTheme} pickerBlockProps={highlightPickerBlockProps}
            value={formats.background} onChange={v => onChange(RichTextFormatKeys.Background, v, FormatType.INLINE)}></ThemeColorPicker>
          <ThemeColorPicker specificTheme={appTheme} pickerBlockProps={textColorPickerBlockProps}
            value={formats.color} onChange={v => onChange(RichTextFormatKeys.Color, v, FormatType.INLINE)}></ThemeColorPicker>
          <Button style={{ width: 42 }} title={translate('link')} disabled={disableLink} active={!!formats[RichTextFormatKeys.Link]} icon size="sm"
            onClick={toggleLinkOpen}>
            <Icon size={12} icon={linkIcon}></Icon>
          </Button>
          <LinkNode
            useDataSources={useDataSources}
            open={openLink}
            onClose={toggleLinkOpen}
            value={formats.link}
            widgetId={widgetId}
            onChange={handleLinkChange}
            className="mr-2_5"></LinkNode>
        </div>

      </div>
    </SettingRow>

    <SettingRow>
      <div className="d-flex align-items-center justify-content-between w-100">

        <ButtonGroup>
          <Button title={translate('left')} active={formats.align === AlignValue.LEFT} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Align, AlignValue.LEFT, FormatType.BLOCK)}>
            <Icon size={12} icon={leftIcon}></Icon>
          </Button>
          <Button title={translate('center')} active={formats.align === AlignValue.CENTER} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Align, AlignValue.CENTER, FormatType.BLOCK)}>
            <Icon size={12} icon={centerIcon}></Icon>
          </Button>
          <Button title={translate('right')} active={formats.align === AlignValue.RIGHT} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Align, AlignValue.RIGHT, FormatType.BLOCK)}>
            <Icon size={12} icon={rightIcon}></Icon>
          </Button>
          <Button title={translate('justify')} active={formats.align === AlignValue.JUSTIFY} icon size="sm"
            onClick={() => onChange(RichTextFormatKeys.Align, AlignValue.JUSTIFY, FormatType.BLOCK)}>
            <Icon size={12} icon={justifyIcon}></Icon>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button title={translate('bullet')} active={formats.list === ListValue.BULLET} icon size="sm" onClick={() => handleListChange(ListValue.BULLET)}>
            <Icon size={12} icon={bulletIcon}></Icon>
          </Button>
          <Button title={translate('numbering')} active={formats.list === ListValue.ORDERED} icon size="sm" onClick={() => handleListChange(ListValue.ORDERED)}>
            <Icon size={12} icon={orderedIcon}></Icon>
          </Button>
        </ButtonGroup>

        <Indent disabled={disableIndent} value={formats.indent} onClick={(value) => onChange(RichTextFormatKeys.Indent, value, FormatType.BLOCK)}></Indent>
      </div>
    </SettingRow>

    <SettingRow flow="no-wrap" label={translate('characterSpacing')}>
      <Size style={{ width: '35%' }} value={formats.letterspace || DEFAULTLETTERSIZE} onChange={v => onChange(RichTextFormatKeys.Letterspace, v, FormatType.INLINE)} ></Size>
    </SettingRow>

    <SettingRow flow="no-wrap" label={translate('lineSpacing')}>
      <NumericInput style={{ width: '35%' }} size="sm" value={formats.linespace || DEFAULLINESTACE}
        showHandlers={false} onPressEnter={handleLinespaceChange} onBlur={handleLinespaceChange}></NumericInput>
    </SettingRow>

    <SettingRow flow="wrap" label={translate('characterEffect')}>
      <Effects value={formats.textshadow} onChange={v => onChange(RichTextFormatKeys.Textshadow, v, FormatType.INLINE)} />
    </SettingRow>

  </div >
}