import React from 'react';
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

export default function() {
  return (
    <NavigationProvider router={}>
    <StackNavigation
      initialRoute={}
    />
  </NavigationProvider>
  );
}
