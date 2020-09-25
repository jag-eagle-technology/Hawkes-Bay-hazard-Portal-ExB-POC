/** @jsx jsx */
import { React, jsx, css, ReactResizeDetector, IMExpression, ExpressionResolverComponent, expressionUtils } from 'jimu-core';
import { RichTextDisplayer, RichTextDisplayerProps } from 'jimu-ui';
import { Button, Icon, Tooltip } from 'jimu-ui';
const { useState, useCallback, useEffect, useRef } = React;
const iconMore = require('jimu-ui/lib/icons/more-16.svg');

export type DisplayerProps = Omit<RichTextDisplayerProps, 'sanitize'> & {
  tooltip?: IMExpression;
  wrap?: boolean;
}

const LEAVEDELAY = 500;

const tooltipStyle = css`
 .tooltip {
    max-width: 360px;
    max-height: 240px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 5px;
    text-align: left;
  }
`;

export const Displayer = (props: DisplayerProps) => {
  const {
    value,
    placeholder,
    repeatedDataSource,
    useDataSources,
    widgetId,
    wrap,
    tooltip: propTooltip,
    preview,
    ...others
  } = props;

  const isTextTooltip = expressionUtils.isSingleStringExpression(propTooltip as any);
  const [tooltip, setTooltip] = useState('');
  const [height, setHeight] = useState(-1);
  const [contentHeight, setContentHeight] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [showAnchor, setShowAnchor] = useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if(propTooltip && isTextTooltip){
      const tooltip = expressionUtils.getSingleStringExpressionText(propTooltip as any);
      setTooltip(tooltip);
    }
  }, [propTooltip, isTextTooltip]);

  const cliped = height ? contentHeight > height : false;

  useEffect(() => {
    setShowAnchor(cliped && hover);
  }, [cliped, hover])

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const text = node.textContent;
      setTitle(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAnchor])

  const handleHeight = useCallback((_, height: number) => {
    setHeight(height);
  }, []);

  const handleContentHeight = useCallback((_, height: number) => {
    setContentHeight(height);
  }, []);

  const timeoutRef = useRef<any>();

  const handleHover = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHover(true);
  }

  const delayLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHover(false);
      timeoutRef.current = null;
    }, LEAVEDELAY)
  }

  const onTiptipResolved = res => {
    if (res?.isSuccessful) {
      setTooltip(res.value);
    }
  }

  const getStyle = (wrap?: boolean) => {

    const nowrap = css`
      .rich-displayer {
        white-space: nowrap !important;
      }
   `;

    return css`
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: hidden;
      .fit-content {
        width: 100%;
        height: fit-content;
        .rich-displayer {
          width: 100%;
          height: fit-content;
        }
      }

      ${!wrap && nowrap};
      .more {
        padding: 0 !important;
        position: absolute;
        right: 0;
        bottom: 0;
        .icon-btn-sizer {
          min-height: unset;
          min-width: unset;
          width: 16px;
          height: 8px;
        }
      }
    `;
  }

  return <div css={getStyle(wrap)} {...others} onMouseOver={handleHover} onMouseLeave={delayLeave} title={tooltip}>
    <ReactResizeDetector handleHeight onResize={handleHeight} />

    <div className="fit-content">
      <ReactResizeDetector handleHeight onResize={handleContentHeight} />

      <RichTextDisplayer
        ref={ref}
        widgetId={widgetId}
        repeatedDataSource={repeatedDataSource}
        useDataSources={useDataSources}
        preview={preview}
        value={value}
        placeholder={placeholder} />
    </div>

    {
      showAnchor && <Tooltip css={tooltipStyle} title={title} showArrow interactive leaveDelay={LEAVEDELAY}>
        <Button className="more" type="default" icon onMouseOver={handleHover}>
          <Icon size={12} icon={iconMore}></Icon>
        </Button>
      </Tooltip>
    }
    {
      (!isTextTooltip && propTooltip) && <ExpressionResolverComponent useDataSources={useDataSources} expression={propTooltip} widgetId={widgetId}
        onChange={onTiptipResolved} />
    }
  </div >;

}