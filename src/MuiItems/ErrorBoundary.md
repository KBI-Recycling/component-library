Error Boundary Example
```js
import React from 'react';

  <ErrorBoundary errorHandlerFunction={(error, info) => {
      console.log('error', error);
      console.log('info', info);
    }}
    hasErrorProp={true}
  >
    <h1>Child element</h1>
  </ErrorBoundary>
```