import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { MenuContent } from "../../Menu"

type RightMenuProps = {
  menuContent: Array<MenuContent>;
};

export default function SwipeableTemporaryDrawer(props: RightMenuProps) {
  const [state, setState] = React.useState({
    open: false,
    menuContent: props.menuContent
  });

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, ['open']: open });
    };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {state['menuContent'].map((content) => (
          <Link href={content.menuLink}>
            <ListItemButton key={content.menuText}>
              <ListItemIcon>
                {content.menuIcon}
              </ListItemIcon>
              <ListItemText primary={content.menuText} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open right menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Typography>
        <SwipeableDrawer
          anchor='right'
          open={state['open']}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </Typography>
    </div>
  );
}
