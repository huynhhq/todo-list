import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

// Libraries
import { useRecoilState } from 'recoil';
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Utilities
import { MY_CATEGORY_LIST } from '@states';
import { goBack } from '@helpers/navigation';
import { COLORS, DIMS, FONT_SIZE } from '@values';
import { ModalStackParamList } from 'root-stack-params';

// UI components
import {
	ScrollView,
	Touchable,
	VectorIcons,
	View,
	Text,
	TextField,
} from '@components/uikit';

interface Props extends StackScreenProps<ModalStackParamList> {
	route: RouteProp<ModalStackParamList, 'addTask'>;
}

const FuncComponent: React.FC<Props> = ({ route }) => {
	const { task, color, index } = route.params;
	const mode = task.content.length === 0 ? 'new' : 'edit';

	const [myCategoryList, setMyCategoryList] = useRecoilState(
		MY_CATEGORY_LIST({}),
	);

	const [taskName, setTaskName] = useState<string>(task.content);
	const [date, setDate] = useState<string | undefined>();

	const onSubmit = useCallback(() => {
		let myTempList = [...myCategoryList];
		const selectedCategory = myTempList[index];
		myTempList[index].tasks = [...selectedCategory.tasks];

		// New Task Case
		if (mode === 'new') {
			myTempList[index].tasks.push({
				...task,
				content: taskName,
			});
		} else {
			const processData = selectedCategory.tasks.map(currentTask => {
				if (currentTask.id === task.id) {
					return {
						...task,
						content: taskName,
					};
				} else {
					return task;
				}
			});
			myTempList[index].tasks = [...processData];
		}

		setMyCategoryList(myTempList);
		Alert.alert(
			'Success',
			mode === 'new' ? 'Added successfully' : 'Edited successfully',
			[
				{
					text: 'OK',
					onPress: () => goBack(),
				},
			],
		);
	}, [index, mode, myCategoryList, setMyCategoryList, task, taskName]);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<Touchable onPress={() => goBack()}>
						<VectorIcons
							name="close-o"
							color={COLORS.neutral700}
							provider="EvilsIcons"
							size={30}
						/>
					</Touchable>
					<Text color={color} fontSize={FONT_SIZE.BIG}>
						{task.content.length !== 0 ? 'Edit Reminder' : 'New reminder'}
					</Text>
					<Touchable onPress={onSubmit} disabled={taskName.length === 0}>
						<Text
							bold
							fontSize={FONT_SIZE.BIG}
							color={taskName.length > 0 ? color : COLORS.neutral700}
						>
							Save
						</Text>
					</Touchable>
				</View>
				<View marginT={60}>
					<View bg={COLORS.background} padding={DIMS.padding} br={DIMS.br}>
						<TextField
							placeholder="Please input new reminder"
							onChangeText={setTaskName}
							borderWidth={0}
							value={taskName}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default FuncComponent;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		backgroundColor: COLORS.black,
		overflow: 'hidden',
		padding: DIMS.padding,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
