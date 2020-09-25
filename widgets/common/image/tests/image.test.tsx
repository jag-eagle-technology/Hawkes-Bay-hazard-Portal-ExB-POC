import {React, Immutable, UrlParameters} from 'jimu-core';
import ImageWidget from '../src/runtime/widget';
import {shallow, configure} from 'enzyme';
import {wrapWidget} from 'jimu-for-test';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('image widget test', function() {

  describe('default config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'image' } as any;
    beforeAll(function () {
      config = {
        functionConfig: {
          altText: '',
          toolTip: '',
          linkParam: {},
          scale: 'Fit'
        },
        styleConfig: {
        }
      };
      Widget = wrapWidget(ImageWidget, {
        config: config,
        manifest: manifest,
        queryObject: Immutable({} as UrlParameters)
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('image widget should be render', () => {
      expect(wrapper.find('.widget-image').length).toEqual(1);
    });

    // it('image widget should be render with WidgetPlaceholder', () => {
    //   expect(wrapper.find('Connect(WithTheme(_WidgetPlaceholder))').length).toEqual(1);
    // });
  });

  describe('test value config', function() {
    let config, Widget, wrapper;
    const manifest = { name: 'image' } as any;
    beforeAll(function () {
      config = {
        functionConfig: {
          altText: 'testAltText',
          toolTip: 'testToolTip',
          linkParam: {
            value: 'detail-page',
            linkType: 'PAGE'
          },
          imageParam: {
            url: 'http://www.rowanpalmsprings.com/images/1700-960/palm-springs-sign-ddc63cf9.jpg'
          },
          scale: 'Fit'
        },
        styleConfig: {
        }
      };
      Widget = wrapWidget(ImageWidget, {
        config: config,
        manifest: manifest,
        queryObject: Immutable({} as UrlParameters)
      });
      wrapper = shallow(<Widget/>).shallow();
    });

    it('image widget should be render', () => {
      expect(wrapper.find('.widget-image').length).toEqual(1);
    });

    it('switch placeHolder', () => {
      expect(wrapper.find('Connect(WithTheme(_WidgetPlaceholder))').length).toEqual(0);
    });

    it('link ok', () => {
      expect(wrapper.find('Styled(WithTheme(_Link))').length).toEqual(1);
    });

    it('use ImageWithParam component', () => {
      expect(wrapper.find('.image-param').length).toEqual(1);
    });
  });
});