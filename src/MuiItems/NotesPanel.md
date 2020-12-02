Notes Panel Example
```js
import React from 'react';

  <NotesPanel 
    notesForTable={[]}
    tableProps={{}}
    tableActionsBar={[]}
    tableActionsPerRow={[]}
    modalProps={{}}
    Storage={{}}
    storagePath=''
    parentDocumentId=''
    modalSubmission={(newNote, fileArray, values, actions) => alert(newNote.Note, newNote.FileArray.join(', '))}
    currentUser={{displayName: 'Gerry'}}
  />
```