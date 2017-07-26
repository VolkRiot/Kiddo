import React from 'react';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';

import Router from '../router/Router';

export default function() {
  return (
    <NavigationProvider router={Router}>
      <StackNavigation initialRoute={'main'} />
    </NavigationProvider>
  );
}
