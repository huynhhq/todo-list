import React from 'react';

import { ModalStackParamList } from 'root-stack-params';
import { createStackNavigator } from '@react-navigation/stack';
import { AddCategoryModal, AddTaskModal } from '@containers/Modals';
const ModalStack = createStackNavigator<ModalStackParamList>();

const ModalStackNavigator = () => {
	return (
		<ModalStack.Navigator
			screenOptions={{
				presentation: 'transparentModal',
				headerShown: false,
			}}
		>
			<ModalStack.Screen name={'addCategory'} component={AddCategoryModal} />
			<ModalStack.Screen name={'addTask'} component={AddTaskModal} />
		</ModalStack.Navigator>
	);
};

export default ModalStackNavigator;
