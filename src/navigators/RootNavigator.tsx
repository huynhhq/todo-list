import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from 'root-stack-params';
import {setTopLevelNavigator} from '@helpers/navigation';
import { HomePage } from '@containers';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}
        theme={navTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            // presentation: 'modal',
          }}
          initialRouteName={'home'}>
          <RootStack.Screen
            name="home"
            component={HomePage}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;