import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Button, Typography, Fab, makeStyles} from '@material-ui/core';
import {Collapse, Alert, Formik} from '../../';
import {NoteThumbnail} from './NotesModal/';
import {CheckCircleOutline, DeleteForeverOutlined} from '@material-ui/icons';
import {object, string} from 'yup';
import Dropzone from 'react-dropzone';
import Jimp from 'jimp/es';
const {FormikForm, TextField, SubmitButton, FormButton} = Formik;

const NotesModal = ({close, storagePath, parentDocumentId, selectedNoteToView, Storage, handleSubmit, currentUser}) => {
  const styles = useStyles();

  const [stage, setStage] = useState('setNote');
  const [fileArray, setFileArray] = useState([]);
  const [fileAlert, setFileAlert] = useState('');

  useEffect(() => {
    if (selectedNoteToView) {
      const arrayOfUrlRequests = [];
      selectedNoteToView.FileNames.forEach(name => {
        arrayOfUrlRequests.push(Storage?.ref(`${storagePath}/${parentDocumentId}/${selectedNoteToView.id}/${name}`).getDownloadURL());
      });
      Promise.all(arrayOfUrlRequests).then(values => {
        setFileArray(selectedNoteToView.FileNames.map((name, index) => ({
          base64: values[index],
          fileName: name,
        })));
      }).catch(error => {
        setFileAlert('There was an error loading the images.');
      });
    }
  }, [Storage, parentDocumentId, selectedNoteToView, storagePath]);

  const handleClose = () => {
    setStage('setNote');
    setFileAlert('');
    setFileArray([]);
    close();
  };

  const dialogProps = {
    fullWidth: true,
    maxWidth: 'md',
    open: true,
    scroll: 'body',
    transitionDuration: {exit: 0},
  };
  const formProps = {
    initialStatus: {alert: ''},
    initialValues: {
      note: selectedNoteToView ? selectedNoteToView.Note : '',
    },
    validationSchema: object().shape({
      note: string().required('Note is a required field.'),
    }),
    onSubmit: async (values, actions) => {
      const newNote = {
        Note: values.note,
        CreatedBy: currentUser.displayName,
        CreatedOn: new Date(),
        FileNames: fileArray.map(file => file.fileName),
      };

      const response = await handleSubmit(newNote, fileArray, values, actions);

      if (response.success) {
        actions.setStatus({alert: response.error});
        setStage('success');
      } else {
        actions.setStatus({alert: response.error});
        actions.setSubmitting(false);
      }
    },

  };
  const dropzoneProps = {
    main: {
      accept: 'application/pdf, image/*',
      multiple: false,
      onDropAccepted: async file => {
        setFileAlert('');

        let fileForState = null;
        if (file[0].type === 'application/pdf') {
          fileForState = {
            fileName: file[0].name,
            base64: null,
            file: file[0],
          };
        } else {
          const jimpObj = await Jimp.read(URL.createObjectURL(file[0]));

          const getImageBase64 = async () => {
            let src = null;
            if (jimpObj.bitmap.width < 600) src = jimpObj.getBase64Async(Jimp.MIME_JPEG);
            else src = await jimpObj.quality(60).getBase64Async(Jimp.MIME_JPEG);
            return src;
          };
          const getImageBuffer = async () => {
            let src = null;
            if (jimpObj.bitmap.width < 600) src = jimpObj.getBufferAsync(Jimp.MIME_JPEG);
            else src = await jimpObj.quality(60).getBufferAsync(Jimp.MIME_JPEG);
            return src;
          };

          fileForState = {
            fileName: file[0].name.split('.')[0] + '.jpeg',
            base64: await getImageBase64(),
            buffer: await getImageBuffer(),
          };
        }

        setFileArray([fileForState, ...fileArray]);
      },
      onDropRejected: (file, event) => {
        setFileAlert('The file type must be an image or PDF.');
      },
    },
  };
  const deleteButton = index => ({
    size: 'small',
    color: 'secondary',
    className: styles.fab,
    onClick: (e) => {
      const newFileArray = [...fileArray];
      newFileArray.splice(index, 1);
      setFileArray(newFileArray);
    },
  });
  return (
    <Dialog {...dialogProps}>
      <FormikForm {...formProps}>
        {({status}) => (
          <Fragment>
            <DialogTitle>
              <Collapse in={stage !== 'success'}>
                Note
              </Collapse>
            </DialogTitle>
            <DialogContent>
              <Collapse in={stage === 'setNote'}>
                {!selectedNoteToView && <DialogContentText>Add relevant notes or files:</DialogContentText>}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField name="note" label="Note" required multiline disabled={Boolean(selectedNoteToView)} />
                  </Grid>
                  {!selectedNoteToView ? <Grid item xs={12}>
                    <Dropzone {...dropzoneProps.main}>
                      {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className={styles.fileDrop}>
                          <input {...getInputProps()} />
                          <div className={styles.divStyles}>
                            <Typography variant='subtitle1'>
                              Drop File Here or Click Inside the Box to Attach
                            </Typography>
                            <Typography variant='subtitle1'>
                              Accepts Images and PDF
                            </Typography>
                            <Typography variant='body2'>
                              (Not Required)
                            </Typography>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </Grid>: null}
                  {fileArray.map((file, index) => (
                    <Grid item xs={12} sm={6} key={`Image#${index}`} container style={{position: 'relative'}}>
                      {!selectedNoteToView && <Fab {...deleteButton(index)}><DeleteForeverOutlined size='small' /></Fab>}
                      <NoteThumbnail pdf={file.fileName.split('.').pop().toLowerCase() === 'pdf'} src={file.base64} allowOpen={Boolean(selectedNoteToView)} />
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
              <Collapse in={stage === 'success'}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <CheckCircleOutline style={{fontSize: '10em'}} />
                  <Typography variant="h6" style={{textAlign: 'center'}} gutterBottom>
                    Note has been successfully added.
                  </Typography>
                </div>
              </Collapse>
              <Alert in={Boolean(status.alert)} text={status.alert || ''} severity='error' />
              <Alert in={Boolean(fileAlert)} text={fileAlert} severity='error' />
            </DialogContent>
            <Collapse in={stage !== 'success' && !selectedNoteToView}>
              <DialogActions style={{justifyContent: 'space-between'}}>
                <FormButton onClick={handleClose} color="secondary" variant='text'>
                      Cancel
                </FormButton>
                <SubmitButton color="primary" variant='text'>
                      Submit
                </SubmitButton>
              </DialogActions>
            </Collapse>
            <Collapse in={stage === 'success' || Boolean(selectedNoteToView)}>
              <DialogActions>
                <Button onClick={handleClose} color="primary" variant='text'>
                  Close
                </Button>
              </DialogActions>
            </Collapse>
          </Fragment>
        )}
      </FormikForm>
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'rgb(255,0,87,0.6)',
  },
  divStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  fileDrop: {
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    border: '2px gray dotted',
    display: 'flex',
    height: '200px',
    justifyContent: 'center',
  },

}));

NotesModal.propTypes = {
  close: PropTypes.func.isRequired,
  parentDocumentId: PropTypes.string.isRequired,
  storagePath: PropTypes.string.isRequired,
  selectedNoteToView: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Note: PropTypes.string.isRequired,
    FileNames: PropTypes.arrayOf(PropTypes.string),
  }),
  Storage: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};
export default NotesModal;
