import { React, useIntl, themeUtils, ThemeNavType } from 'jimu-core';
import { defaultMessages, NavigationVariant } from 'jimu-ui';
import { MenuNavigationType } from '../runtime/menu-navigation';
const { useMemo } = React;

export const useTranslate = (message: any = defaultMessages) => {
  const intl = useIntl();
  return React.useCallback((id: string, values?: any) => {
    return intl.formatMessage({ id: id, defaultMessage: message[id] }, values);
  }, [intl, message]);
}

export const getMenuNavigationVariant = (type: MenuNavigationType, navStyle: ThemeNavType): NavigationVariant => {
  const variants = themeUtils.getThemeVariablesByCategory('navigation', false);
  return variants.find(_ => _.component === type)?.styles?.[navStyle];
}

//Get theme navigation variants from theme
export const useMenuNavigationVariant = (type: MenuNavigationType, menuStyle: ThemeNavType, advanced: boolean, advanceVariant: NavigationVariant): NavigationVariant => {
  return useMemo(() => {
    if (advanced) return advanceVariant;
    return getMenuNavigationVariant(type, menuStyle)
  }, [type, menuStyle, advanced, advanceVariant]);
}