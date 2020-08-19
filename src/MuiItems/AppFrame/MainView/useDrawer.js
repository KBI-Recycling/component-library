import {useMemo} from 'react';
import {useTheme} from '@material-ui/core/styles';

const useDrawer = ({smallDevice, drawerOpen}) => {
  const theme = useTheme();

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
      // drawer is 300px width, thats why -300
      marginLeft: theme.spacing(4) + (drawerOpen ? 0 : -300),
    };
  }, [drawerOpen, smallDevice, theme]);

  return {drawerMargin, drawerOpen};
};

export default useDrawer;
