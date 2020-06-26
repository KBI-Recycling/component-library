AppFrame Example
```js
import React from 'react';

  <AppFrame />
```

import {Assessment, CallSplit, LocalShipping, Settings, Dashboard as DashboardIcon, AccountBalance} from '@material-ui/icons';

export const routes = [
  {component: () => <div>Hello</div>, exact: true, strict: true, path: '/kbi-tracking/dashboard/', pageTitle: 'Tracking Dashboard'},
];

export const menuItems = [
  {icon: () => <DashboardIcon />, text: 'Dashboard', link: '/kbi-tracking/dashboard/'},
  {icon: () => <LocalShipping />, text: 'Shipments', link: '/kbi-tracking/shipments/'},
  {icon: () => <CallSplit />, text: 'Production', link: '/kbi-tracking/production/sort', selectedLinkComparison: '/kbi-tracking/production'},
  {icon: () => <Assessment />, text: 'Reports', link: '/kbi-tracking/reports'},
  {icon: () => <AccountBalance />, text: 'Accounting', link: '/kbi-tracking/accounting/proforma', selectedLinkComparison: '/kbi-tracking/accounting'},
  {icon: () => <Settings />, text: 'Admin Settings', link: '/kbi-tracking/settings'},
];
