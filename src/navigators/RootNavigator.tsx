import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from 'root-stack-params';
import { setTopLevelNavigator } from '@helpers/navigation';

import { HomePage, TaskManagementPage } from '@containers';
import ModalStackNavigator from './ModalStack';

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
				theme={navTheme}
			>
				<RootStack.Navigator
					screenOptions={{
						headerShown: false,
						presentation: 'card',
						gestureDirection: 'vertical',
					}}
					initialRouteName={'home'}
				>
					<RootStack.Screen
						name="home"
						component={HomePage}
						options={{ headerShown: false }}
					/>
					<RootStack.Screen
						name="taskManagement"
						component={TaskManagementPage}
						options={{ headerShown: false }}
					/>
					<RootStack.Screen
						name="modal"
						component={ModalStackNavigator}
						options={{ presentation: 'transparentModal', headerShown: false }}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default RootNavigator;
