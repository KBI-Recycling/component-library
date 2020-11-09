import {useMemo} from 'react';
import {useMediaQuery} from 'react-responsive';
import {useTheme} from '@material-ui/core/styles';

const useDrawer = ({smallDevice, drawerOpen}) => {
  const theme = useTheme();
  const isPrintView = useMediaQuery({query: 'print'});

  const drawerMargin = useMemo(() => {
    const duration = theme.transitions.duration.enteringScreen;
    const defaultStyle = {transition: `all ${duration}ms ease-in-out`};

    const smallStyle = {
      ...defaultStyle,
      margin: theme.spacing(2),
      marginTop: theme.spacing(2) + 48,
    };
    const printStyle = {
      ...defaultStyle,
      margin: theme.spacing(0),
    };

    if (isPrintView) return printStyle;
    else if (smallDevice) return smallStyle;
    else {
      return {
        ...defaultStyle,
        margin: theme.spacing(4),
        // 48 is the size of the toolbar
        marginTop: theme.spacing(4) + 48,
        // drawer is 300px width, thats why -300
        marginLeft: theme.spacing(4) + (drawerOpen ? 0 : -300),
      };
    }
  }, [drawerOpen, smallDevice, theme, isPrintView]);

  return {drawerMargin, drawerOpen};
};

export default useDrawer;
