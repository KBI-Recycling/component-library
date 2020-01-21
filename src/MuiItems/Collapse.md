Collapse Example:

```jsx
import React, {Fragment, useState} from 'react';
import {Button, ButtonGroup, Typography} from '@material-ui/core';
const [show, setShow] = useState('basic1');

<Fragment>
  <Collapse in={show === 'basic1'}>
    <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis imperdiet massa tincidunt nunc pulvinar. Interdum velit laoreet id donec. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque.
    </Typography>
  </Collapse>
  <Collapse in={show === 'basic2'}>
    <Typography>
    Quisque id diam vel quam elementum pulvinar. Eleifend quam adipiscing vitae proin. Cras ornare arcu dui vivamus arcu felis bibendum ut. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Egestas erat imperdiet sed euismod. Non diam phasellus vestibulum lorem sed risus.
    </Typography>
  </Collapse>
  <Collapse in={show === 'timeoutNumber'} timeout={1000}>
    <Typography>
    Risus ultricies tristique nulla aliquet enim. Id cursus metus aliquam eleifend mi in nulla. Pellentesque habitant morbi tristique senectus et netus. At tempor commodo ullamcorper a. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. Morbi tincidunt ornare massa eget egestas. Augue eget arcu dictum varius. Enim tortor at auctor urna nunc. Lacinia at quis risus sed vulputate odio ut enim.
    </Typography>
  </Collapse>
  <Collapse in={show === 'timeoutObject'} timeout={{enter: 2000, exit: 3000}}>
    <Typography>
    Porta non pulvinar neque laoreet. Mi bibendum neque egestas congue quisque egestas diam. Amet dictum sit amet justo donec enim diam. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Vitae aliquet nec ullamcorper sit amet. Feugiat in fermentum posuere urna nec tincidunt praesent. Nisl tincidunt eget nullam non nisi. Ac orci phasellus egestas tellus rutrum tellus pellentesque.
    </Typography>
  </Collapse>
  <ButtonGroup size='small' color='primary' style={{marginTop: '16px'}}>
    <Button onClick={() => setShow('basic1')}>
      Basic 1
    </Button>
    <Button onClick={() => setShow('basic2')}>
      Basic 2
    </Button>
    <Button onClick={() => setShow('timeoutNumber')}>
      {`timeout={1000}`}
    </Button>
    <Button onClick={() => setShow('timeoutObject')}>
      {`timeout={{enter: 2000, exit: 3000}}`}
    </Button>
  </ButtonGroup>
</Fragment>
```
