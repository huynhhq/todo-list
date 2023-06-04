import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Switch } from 'react-native';

// Libraries
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { Calendar } from 'react-native-calendars';
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
	const today = moment(new Date()).format('YYYY-MM-DD');

	const { task, color, index } = route.params;
	const mode = task.content.length === 0 ? 'new' : 'edit';

	const [myCategoryList, setMyCategoryList] = useRecoilState(
		MY_CATEGORY_LIST({}),
	);

	const [dateEnabled, setDateEnabled] = useState<boolean>(
		task?.date ? true : false,
	);
	const [taskName, setTaskName] = useState<string>(task.content);
	const [date, setDate] = useState<string>(
		task?.date ?? moment(new Date()).format('YYYY-MM-DD'),
	);

	const onSubmit = useCallback(() => {
		let myTempList = [...myCategoryList];
		const selectedCategory = myTempList[index];
		myTempList[index].tasks = [...selectedCategory.tasks];

		// New Task Case
		if (mode === 'new') {
			myTempList[index].tasks.push({
				...task,
				content: taskName,
				date: dateEnabled ? date : undefined,
			});
		} else {
			const processData = selectedCategory.tasks.map(currentTask => {
				if (currentTask.id === task.id) {
					return {
						...task,
						content: taskName,
						date: dateEnabled ? date : undefined,
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
	}, [
		date,
		dateEnabled,
		index,
		mode,
		myCategoryList,
		setMyCategoryList,
		task,
		taskName,
	]);

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
					<View style={styles.container}>
						<TextField
							placeholder="Please input new reminder"
							onChangeText={setTaskName}
							borderWidth={0}
							value={taskName}
						/>
					</View>
					<View style={styles.container}>
						<View flexD="row">
							<View flexD="row" alignItems flex>
								<VectorIcons
									name="calendar"
									color={color}
									size={15}
									provider="FontAwesome"
									style={styles.icon}
								/>
								<Text color={COLORS.lightGray}>Date</Text>
							</View>
							<Switch
								trackColor={{ false: COLORS.mainGray, true: color }}
								thumbColor={COLORS.white}
								ios_backgroundColor="#3e3e3e"
								onValueChange={() => setDateEnabled(!dateEnabled)}
								value={dateEnabled}
							/>
						</View>
						{dateEnabled && (
							<View marginT={10}>
								<Calendar
									theme={{
										backgroundColor: COLORS.background,
										calendarBackground: COLORS.background,
										textSectionTitleColor: COLORS.white,
										dayTextColor: COLORS.white,
										selectedDayBackgroundColor: color,
										todayTextColor: color,
										arrowColor: color,
										monthTextColor: color,
									}}
									onDayPress={day => {
										setDate(day.dateString);
									}}
									markedDates={{
										[date]: {
											selected: true,
											disableTouchEvent: true,
										},
									}}
									minDate={today}
								/>
							</View>
						)}
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
	icon: {
		marginRight: 15,
	},
	container: {
		backgroundColor: COLORS.background,
		padding: DIMS.padding,
		borderRadius: DIMS.br,
		marginBottom: 20,
	},
});
