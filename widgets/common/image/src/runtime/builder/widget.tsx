import { React, MutableStoreManager, getAppStore, appActions, Immutable } from 'jimu-core';
import { IMConfig } from '../../config';
import {ImageResourceItemInfo} from 'jimu-for-builder';
import {CropType, CropParam, CropPosition} from 'jimu-ui';
import {ImageCrop} from 'jimu-ui/basic/imagecrop';
import {getAppConfigAction} from 'jimu-for-builder';

interface OwnProps {
  widgetId: string;
  config: IMConfig;

  widgetWidth: number;
  widgetHeight: number;
  imageWidth: number;
  imageHeight: number;
}

export default class _BuilderWidget extends React.PureComponent<OwnProps, {}> {

  constructor(props) {
    super(props);
  }

  getCropZoomInCropTool = (cropParam, widgetWidth, widgetHeight, imageWidth: number, imageHeight: number): number => {
    const cropPixel = cropParam && cropParam.cropPixel;
    const cropZoom = cropParam && cropParam.cropZoom;
    let relativeZoomInWidget = null;

    let zoomInCropTool = null;

    let imageWidthInSvg = null;
    let imageHeightInSvg = null;

    if (!cropPixel || !cropZoom) {
      if (widgetWidth / widgetHeight >= imageWidth / imageHeight) {
        imageWidthInSvg = widgetWidth;
        imageHeightInSvg = imageHeight / imageWidth * imageWidthInSvg;
      } else {
        imageHeightInSvg = widgetHeight;
        imageWidthInSvg = imageWidth / imageHeight * imageHeightInSvg;
      }

      relativeZoomInWidget = 1;
    } else {
      const cropWindowWidth = cropPixel.width;
      const cropWindowHeight = cropPixel.height;

      let scale = null;
      if (widgetWidth / widgetHeight >= imageWidth / imageHeight) {
        imageWidthInSvg = widgetWidth;
        imageHeightInSvg = imageHeight / imageWidth * imageWidthInSvg;

        if (widgetWidth / widgetHeight >= cropWindowWidth / cropWindowHeight) {
          scale = widgetWidth / (cropWindowWidth * cropZoom);
          relativeZoomInWidget = imageHeight * cropZoom *  scale / imageHeightInSvg;
        } else {
          scale = widgetHeight / (cropWindowHeight * cropZoom);
          relativeZoomInWidget = imageHeight * cropZoom *  scale / imageHeightInSvg;
        }
      } else {
        imageHeightInSvg = widgetHeight;
        imageWidthInSvg = imageWidth / imageHeight * imageHeightInSvg;

        if (widgetWidth / widgetHeight >= cropWindowWidth / cropWindowHeight) {
          scale = widgetWidth / (cropWindowWidth * cropZoom);
          relativeZoomInWidget = imageHeight * cropZoom *  scale / imageHeightInSvg;
        } else {
          scale = widgetHeight / (cropWindowHeight * cropZoom);
          relativeZoomInWidget = imageHeight * cropZoom *  scale / imageHeightInSvg;
        }
      }
    }

    zoomInCropTool = imageWidthInSvg * relativeZoomInWidget / imageWidth;
    return zoomInCropTool;
  }

  getCropPositonInCropTool = (cropParam: CropParam, zoomInCropTool: number): CropPosition => {
    const cropPosition = cropParam && cropParam.cropPosition;
    if (!cropPosition) {
      return {
        x: 0,
        y: 0
      }
    }

    return {
      x: zoomInCropTool * cropPosition.x / cropParam.cropZoom,
      y: zoomInCropTool * cropPosition.y / cropParam.cropZoom
    }
  }

  onCancelCrop = () => {
    getAppStore().dispatch(appActions.setWidgetIsInlineEditingState(this.props.widgetId, false));
  }

  onConfirmCrop = (cropParam: CropParam, imageResourceItemInfo?: ImageResourceItemInfo) => {
    let tempImageParam = this.props.config.functionConfig.imageParam;
    if (cropParam.cropType === CropType.Real && imageResourceItemInfo) {
      tempImageParam = tempImageParam.set('url', imageResourceItemInfo.blobUrl).set('fileFormat', imageResourceItemInfo.fileFormat);
    }

    tempImageParam = tempImageParam.set('cropParam', cropParam);

    if (cropParam.cropPixel) {
      getAppStore().dispatch(appActions.setWidgetIsInlineEditingState(this.props.widgetId, false));

      let functionConfig = Immutable(this.props.config.functionConfig);
      functionConfig = functionConfig.set('isCropped', true);
      functionConfig = functionConfig.set('imageParam', tempImageParam);
      getAppConfigAction().editWidgetConfig(this.props.widgetId, this.props.config.set('functionConfig', functionConfig)).exec();
    }
  }

  render() {
    // open crop tool
    const clientRect = MutableStoreManager.getInstance().getStateValue([this.props.widgetId, 'clientRect']);
    const cropParam = this.props.config.functionConfig.imageParam && this.props.config.functionConfig.imageParam.cropParam;

    const widgetWidth = this.props.widgetWidth;
    const widgetHeight = this.props.widgetHeight;
    const zoomInCropTool = this.getCropZoomInCropTool(cropParam, widgetWidth, widgetHeight, this.props.imageWidth, this.props.imageHeight);
    const cropPositionInCropTool = this.getCropPositonInCropTool(cropParam, zoomInCropTool);

    let originalUrl = null;
    if (this.props.config.functionConfig.imageParam.originalUrl) {
      originalUrl = this.props.config.functionConfig.imageParam.originalUrl;
    } else {
      originalUrl = this.props.config.functionConfig.imageParam.url;
    }

    return <ImageCrop crop={cropPositionInCropTool} cropZoom={zoomInCropTool}
      imageFormat={this.props.config.functionConfig.imageParam.fileFormat} onCancelCrop={this.onCancelCrop} widgetArea={clientRect}
      cropParam={cropParam} originId={this.props.config.functionConfig.imageParam.originalId}
      widgetId={this.props.widgetId} image={originalUrl} onConfirmCrop={this.onConfirmCrop}
      cropType={this.props.config.functionConfig.imageParam.imgSourceType === 'BY_URL' ? CropType.Fake : null}></ImageCrop>
  }
}