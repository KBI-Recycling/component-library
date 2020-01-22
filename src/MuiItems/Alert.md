Severity Examples:

```js
<Alert severity='error' text='This is an error alert — check it out!' />
<div style={{height: '8px'}} />
<Alert severity='warning' text='This is an warning alert — check it out!' />
<div style={{height: '8px'}} />
<Alert severity='info' text='This is an info alert — check it out!' />
<div style={{height: '8px'}} />
<Alert severity='success' text='This is an success alert — check it out!' />
```

Title Example
```js
<Alert severity='error' text='This is an error alert — check it out!' title='Critical Error' />
```

onClose Example
```js
import React, {Fragment, useState} from 'react';
import {Button} from '@material-ui/core';
const [onCloseText, setOnCloseText] = useState('Click close icon to collapse alert.');

<Fragment>
  <Alert severity='error' text={onCloseText} onClose={() => setOnCloseText('')} />
  <Button variant='outlined' style={{marginTop: '8px'}} onClick={() => setOnCloseText('Click close icon to collapse alert.')}>
    Trigger Error
  </Button>
</Fragment>
```

Variant: 'outlined'
```js
<Alert severity='error' text='This is an error alert — check it out!' variant='outlined' />
<div style={{height: '8px'}} />
<Alert severity='warning' text='This is an warning alert — check it out!' variant='outlined' />
<div style={{height: '8px'}} />
<Alert severity='info' text='This is an info alert — check it out!' variant='outlined' />
<div style={{height: '8px'}} />
<Alert severity='success' text='This is an success alert — check it out!' variant='outlined' />
```

Variant: 'filled' Example
```js
<Alert severity='error' text='This is an error alert — check it out!' variant='filled' />
<div style={{height: '8px'}} />
<Alert severity='warning' text='This is an warning alert — check it out!' variant='filled' />
<div style={{height: '8px'}} />
<Alert severity='info' text='This is an info alert — check it out!' variant='filled' />
<div style={{height: '8px'}} />
<Alert severity='success' text='This is an success alert — check it out!' variant='filled' />
```
