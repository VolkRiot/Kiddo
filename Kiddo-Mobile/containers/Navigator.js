import React from 'react';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';

import Router from '../router/Router';

export default function(props) {
  return (
    <NavigationProvider router={Router}>
      <StackNavigation mode={'modal'} initialRoute={props.startRoute} />
    </NavigationProvider>
  );
}
