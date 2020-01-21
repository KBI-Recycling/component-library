Collapse Example:

```jsx
import React, {Fragment, useState} from 'react';
import {Button} from '@material-ui/core';
const [show, setShow] = useState(true);

<Fragment>
  <Collapse in={show}>Section 1</Collapse>
  <Collapse in={!show}>Section 2</Collapse>
  <Button variant='contained' color='primary' size='small' style={{marginTop: '16px'}} onClick={() => setShow(!show)}>
    Toggle
  </Button>
</Fragment>
```
