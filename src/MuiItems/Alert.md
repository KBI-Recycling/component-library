Severity Examples:

```js
<Alert severity='error' text='This is an error alert — check it out!' />
<Alert severity='warning' text='This is an warning alert — check it out!' />
<Alert severity='info' text='This is an info alert — check it out!' />
<Alert severity='success' text='This is an success alert — check it out!' />
```

Title Example
```js
<Alert severity='error' text='This is an error alert — check it out!' title='Critical Error' />
```

onClose & Collapse Example
```js
import React, {Fragment, useState} from 'react';
import {Button} from '@material-ui/core';
const [showAlert, setShowAlert] = useState(true);

<Fragment>
  <Alert in={showAlert} onClose={() => setShowAlert(false)} text='This is s standard onClose and Collapse' />
  <Alert in={showAlert} onClose={() => setShowAlert(false)} timeout={1000} text='timeout={1000}' />
  <Alert in={showAlert} onClose={() => setShowAlert(false)} timeout={{enter: 2000, exit: 3000}} text='timeout={{enter: 2000, exit: 3000}}' />
  <Button variant='outlined' style={{marginTop: '8px'}} onClick={() => setShowAlert(true)}>
    Trigger Alert
  </Button>
</Fragment>
```

Variant: 'outlined'
```js
<Alert severity='error' text='This is an error alert — check it out!' variant='outlined' />
<Alert severity='warning' text='This is an warning alert — check it out!' variant='outlined' />
<Alert severity='info' text='This is an info alert — check it out!' variant='outlined' />
<Alert severity='success' text='This is an success alert — check it out!' variant='outlined' />
```

Variant: 'filled' Example
```js
<Alert severity='error' text='This is an error alert — check it out!' variant='filled' />
<Alert severity='warning' text='This is an warning alert — check it out!' variant='filled' />
<Alert severity='info' text='This is an info alert — check it out!' variant='filled' />
<Alert severity='success' text='This is an success alert — check it out!' variant='filled' />
```
