/* eslint-disable max-len */
import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Table} from '../';
import {Add, Search, ExpandMore} from '@material-ui/icons';
import {
  Accordion,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import {NotesModal} from './NotesPanel/';

const NotesPanel = ({notesForTable, tableActionsPerRow, tableActionsBar, tableProps, modalSubmission, currentUser, Storage, parentDocumentId, storagePath, defaultExpanded}) => {
  const [selectedNoteToView, setSelectedNoteToView] = useState(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const notesModal = {
    selectedNoteToView,
    close: () => {
      setSelectedNoteToView(null);
      setNoteModalOpen(false);
    },
    storagePath,
    Storage,
    parentDocumentId,
    currentUser,
    handleSubmit: modalSubmission,
  };

  const notesTable = {
    isLoading: !notesForTable,
    data: notesForTable || [],
    columns: [
      {Header: 'Note', accessor: 'Note', wrapBodyText: true},
      {Header: 'Created By', accessor: 'CreatedBy'},
      {Header: 'Date', accessor: 'CreatedOn', type: 'datetime', datetimeFormat: 'MM/DD/YY hh:mm a'},
      {Header: 'Attached Files', accessor: 'numberOfAttachedFiles', type: 'numeric'},
    ],
    actionsPerRow: [
      {
        icon: Search,
        tooltip: 'View Note',
        onClick: ({rowData}) => {
          setSelectedNoteToView(rowData);
          setNoteModalOpen(true);
        },
      },
      ...tableActionsPerRow,
    ],
    actionsBar: [
      {
        icon: Add,
        text: 'Add Note',
        onClick: () => setNoteModalOpen(true),
      },
      ...tableActionsBar,
    ],
    sortInitial: [{id: 'CreatedOn', desc: true}],
    ...tableProps,
  };

  return (
    <Fragment>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Notes</Typography>
        </AccordionSummary>
        <Table {...notesTable} />
      </Accordion>
      {noteModalOpen && <NotesModal {...notesModal} />}
    </Fragment>
  );
};

NotesPanel.defaultProps = {
  tableProps: {},
  tableActionsBar: [],
  tableActionsPerRow: [],
  defaultExpanded: false,
};

NotesPanel.propTypes = {
  /** Property that will spread over the notes table. See Table component for details */
  tableProps: PropTypes.object,
  /** Property that will spread into the table's actionBar property. See Table component for details */
  tableActionsBar: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonProps: PropTypes.object,
  })),
  /** Property that will spread into the table's actionsPerRow property. See Table component for details */
  tableActionsPerRow: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    hide: PropTypes.bool,
    disable: PropTypes.bool,
  })),
  /** The firebase Storage object that will be used by the modal to retrieve files */
  Storage: PropTypes.object.isRequired,
  /** <p>The list of notes to populate the table.</p><p>***Default Object Shape***: {Note: string, CreatedBy: string, Date: Date, numberOfAttachedFiles: number, FileNames: [string] }</p><p>This shape can be anything desired that will fit into the Table data prop, but in order to display you must overwrite the Table columns prop by passing a new columns prop into tableProps</p> */
  notesForTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Property will be ran inside the formik submission of the modal. ***await***ed by the submission.<p>***Function Shape: *** (newNote, fileArray, formikValues, formikActions) => return {success: bool} - <ul><li>If success, modal will proceed with successful submission. Else the modal will present a failured submission.</li><li>Can return a promise due to it being awaited. Submission of modal will not finish until this function returns.</li></ul></p> */
  modalSubmission: PropTypes.func.isRequired,
  /** The firestore ID of the document that will be the parent of any entered notes. Is used in tangent with the storagePath to retrieve images for modals */
  parentDocumentId: PropTypes.string.isRequired,
  /** The storage path used to store the files in Firestore Storage. Is used in tangent with the parentDocumentId to retrieve images for modals */
  storagePath: PropTypes.string.isRequired,
  /** Property is used by the modal submission to attach the currentUser to the newNote passed as an argument to modalSubmission */
  currentUser: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  /** A bool that defines whether the Accordian component is expanded by default */
  defaultExpanded: PropTypes.bool,
};

export default NotesPanel;
