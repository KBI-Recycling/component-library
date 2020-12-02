import React from 'react';
import {makeStyles, Grid, Typography} from '@material-ui/core';
import {PictureAsPdf} from '@material-ui/icons';
import PropTypes from 'prop-types';

const NoteThumbnail = ({src, allowOpen, pdf}) => {
  const styles = useStyles();
  if (!src) return 'Broken Img';

  const openInNewWindow = () => window.open(src, '__blank');
  const props = {
    className: allowOpen ? styles.imgWithLink : styles.img,
    src,
    style: pdf ? {} : {
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    },
    onClick: allowOpen ? openInNewWindow : null,
  };
  if (!pdf) return <div {...props} />;
  else {
    return (
      <Grid container justify='center' alignItems={'center'} direction='column' {...props}>
        <Typography variant='h5'>PDF Upload</Typography>
        <PictureAsPdf className={styles.icon} />
        <Typography variant='h5'>Not Visible in Print View</Typography>
      </Grid>
    );
  }
};

const useStyles = makeStyles(theme => ({
  imgWithLink: {
    width: '100%',
    height: '250px',
    cursor: 'pointer',
    border: '1px solid lightgrey',
    backgroundColor: 'ghostwhite',
  },
  img: {
    width: '100%',
    height: '250px',
    border: '1px solid lightgrey',
    backgroundColor: 'ghostwhite',
  },
  icon: {
    fontSize: '10em',
  },
}));

NoteThumbnail.defaultProps = {
  allowOpen: true,
};
NoteThumbnail.propTypes = {
  src: PropTypes.string,
  pdf: PropTypes.bool,
  allowOpen: PropTypes.bool,
};

export default NoteThumbnail;
