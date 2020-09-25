/** @jsx jsx */
import { React, IMIconResult, css, jsx, ThemePaper } from 'jimu-core';
import { Button, Icon, Drawer, NavigationProps, Navigation, PanelHeader, AnchorDirection, NavigationVariant } from 'jimu-ui';
import { useDrawerAdvanceStyle, useNavAdvanceStyle } from './utils';

export type DrawerMenuProps = NavigationProps & {
  icon?: IMIconResult;
  anchor: AnchorDirection;
  advanced?: boolean;
  variant?: NavigationVariant;
  paper?: ThemePaper;
}

const style = css`
    width: 260px;
`;

export const DrawerMenu = (props: DrawerMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const {
    icon,
    anchor,
    advanced,
    type,
    variant,
    paper,
    vertical,
    ...others
  } = props;

  const toggle = () => setOpen(open => !open);
  const drawerStyle = useDrawerAdvanceStyle(advanced, variant, paper);
  const navStyle = useNavAdvanceStyle(advanced, type, variant, true);
  return <React.Fragment>
    <div className="button-container w-100 h-100 d-flex align-items-center justify-content-center">
      <Button icon type="tertiary" onClick={toggle}>
        <Icon className="caret-icon" icon={icon?.svg} color={icon?.properties?.color} size={icon?.properties?.size} />
      </Button>
    </div>
    <Drawer anchor={anchor} open={open} toggle={toggle} css={drawerStyle}>
      <PanelHeader className="header" onClose={toggle}></PanelHeader>
      <Navigation vertical={vertical} css={[style, navStyle]} type={type} {...others}></Navigation>
    </Drawer>
  </React.Fragment>;
}