Collapse Example:

```jsx
import React, {Fragment, useState} from 'react';
import {Button, ButtonGroup} from '@material-ui/core';
const [show, setShow] = useState('section1');

<Fragment>
  <Collapse in={show === 'section1'}>Section 1</Collapse>
  <Collapse in={show === 'section2'} timeout={750}>Section 2</Collapse>
  <div style={{marginTop: '16px'}}>
    <ButtonGroup size='small' color='primary'>
      <Button onClick={() => setShow('section1')}>
        Section 1
      </Button>
      <Button onClick={() => setShow('section2')}>
        Section 2
      </Button>
    </ButtonGroup>
  </div>
</Fragment>
```
