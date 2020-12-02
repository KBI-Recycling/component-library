Notes Panel Example
```js
import React from 'react';

const notes = [
  {
    Note: 'This is an example note.',
    CreatedBy: 'Gerry',
    CreatedOn: new Date('2010-06-05'),
    FileNames: [],
    numberOfAttachedFiles: 0
  },
    {
    Note: 'There is something broken here.',
    CreatedBy: 'Chris',
    CreatedOn: new Date('2010-06-08'),
    FileNames: ['Image of broken stuff'],
    numberOfAttachedFiles: 1
  },
];

  <NotesPanel
    notesForTable={notes}
    tableProps={{
      sortInitial: [{id: 'CreatedOn', desc: false}],
    }}
    tableActionsBar={[
      //follow the documentation for actionsBar on the Table component. This will add each action to the table
    ]}
    tableActionsPerRow={[
      //follow the documentation for actionsPerRow on the Table component. This will add each action to the rows of the table
    ]}
    // Storage={Firebase.Storage goes here}
    storagePath='foo/bar/folder/structure'
    parentDocumentId='idOfTheParentDocumentToAttachNoteTo'
    modalSubmission={(newNote, fileArray, values, actions) => {
      console.log('arg[0]', newNote);
      console.log('arg[1]', fileArray);
      console.log('arg[2]', values);
      console.log('arg[3]', actions);
      alert('arguments of function have been console logged.');
      return {success: true};
    }}
    currentUser={{displayName: 'Gerry'}}
  />
```