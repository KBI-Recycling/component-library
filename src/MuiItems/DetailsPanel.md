Details Title & Details Field List Example
```js
import React from 'react';
import {Business} from '@material-ui/icons';

  <DetailsPanel title='KBI Recycling'
    subtitle='kbirecycling.com'
    subtitleLink='https://www.kbirecycling.com/'
    fields={[
      {label: 'Address', value: '125 E Commercial St'},
      {label: 'Line 2', value: 'Unit A'},
      {label: 'Phone', value: '(714) 738-8516'},
      {label: 'Is this allowed?', value: true},
      {label: 'External Link', value: 141553523637323, link: true, onClick: () => alert('Direct  you to account page')},
    ]}
    buttons={[
      {text: 'Update Information', onClick: () => alert('Edit the information here')},
      {text: 'Navigate to new page', onClick: () => alert('Change location'), disabled: true},
      {text: 'This button is hidden', onClick: () => {}, visible: false},
    ]}
    icon={Business}
    iconProps={{style: {fill: 'red'}}}
  />
```