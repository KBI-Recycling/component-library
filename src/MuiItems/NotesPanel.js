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

const NotesPanel = ({notesForTable, tableActionsPerRow, tableActionsBar, tableProps, modalProps, modalSubmission, currentUser, Storage, parentDocumentId, storagePath}) => {
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
    ...modalProps,
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
      <Accordion>
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
  modalProps: {},
};

NotesPanel.propTypes = {
  tableProps: PropTypes.object,
  tableActionsBar: PropTypes.arrayOf(PropTypes.shape({

  })),
  tableActionsPerRow: PropTypes.arrayOf(PropTypes.shape({

  })),
  Storage: PropTypes.object.isRequired,
  modalProps: PropTypes.object,
  notesForTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalSubmission: PropTypes.func.isRequired,
  parentDocumentId: PropTypes.string.isRequired,
  storagePath: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotesPanel;
