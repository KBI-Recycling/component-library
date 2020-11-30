import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {TableWithPaper} from '../../components/';
import {Add, Search, ExpandMore} from '@material-ui/icons';
import {
  Accordion,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import {NotesModal} from './NotesPanel/';

const NotesPanel = ({notesForTable, tableActionsPerRow, tableActionsBar, tableProps, modalProps, Firestore}) => {
  const [selectedNoteToView, setSelectedNoteToView] = useState(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const notesModal = {
    selectedNoteToView,
    ...modalProps,
  };

  const notesTable = {
    title: 'Notes',
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
        <TableWithPaper {...notesTable} />
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

  })).isRequired,
  tableActionsPerRow: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
  modalProps: PropTypes.object,
  notesForTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  Firestore: PropTypes.object.isRequired,
};

export default NotesPanel;
