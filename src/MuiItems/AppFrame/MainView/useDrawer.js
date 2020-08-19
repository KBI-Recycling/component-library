import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@material-ui/core/styles';
import {useSmallDeviceCheck} from 'hooks';

const useDrawer = () => {
  const theme = useTheme();
  const drawerOpen = useSelector(state => state.ui.drawerOpen);
  const {smallDevice} = useSmallDeviceCheck();

  const drawerMargin = useMemo(() => {
    const duration = theme.transitions.duration.enteringScreen;
    const defaultStyle = {transition: `all ${duration}ms ease-in-out`};
    const smallStyle = {
      ...defaultStyle,
      margin: theme.spacing(2),
      marginTop: theme.spacing(8),
    };

    if (smallDevice) return smallStyle;
    return {
      ...defaultStyle,
      margin: theme.spacing(4),
      marginTop: theme.spacing(9),
      marginLeft: theme.spacing(4) + (drawerOpen ? 300 : 0),
    };
  }, [drawerOpen, smallDevice, theme]);

  return {drawerMargin, drawerOpen};
};

export default useDrawer;
