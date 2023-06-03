import React, { useCallback, useState } from 'react';
import { Alert, ListRenderItemInfo } from 'react-native';

// Libraries
import { useRecoilState } from 'recoil';
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Utilities
import { Task } from '@models/Task';
import { MY_CATEGORY_LIST } from '@states';
import { COLORS, FONT_SIZE } from '@values';
import { goBack, goModal } from '@helpers/navigation';
import { PrototypeManager } from '@helpers/prototype';
import { RootStackParamList } from 'root-stack-params';

// Styles & UI components
import {
	Container,
	View,
	commonStyles,
	FlatList,
	VectorIcons,
	Text,
	Touchable,
} from '@components/uikit';
import styles from './styles';
import Header from '@components/Header';
import TaskItem from './components/TaskItem';

interface Props extends StackScreenProps<RootStackParamList> {
	route: RouteProp<RootStackParamList, 'taskManagement'>;
}

const FuncComponent: React.FC<Props> = ({ route }) => {
	const { category, index } = route.params;
	const [show, setShowMenu] = useState<boolean>(false);
	const [hideCompletedTasks, setHideCompletedTasks] = useState<boolean>(true);

	const [myCategoryList, setCategoryList] = useRecoilState(
		MY_CATEGORY_LIST({}),
	);
	const { name, color, icon } = myCategoryList[index];

	const renderItem = useCallback(
		(info: ListRenderItemInfo<Task>) => {
			const { item } = info;

			const onComplete = () => {
				let myTempList = [...myCategoryList];
				const processData = myTempList[index].tasks.map(task => {
					if (item.id === task.id) {
						return {
							...item,
							isCompleted: true,
						};
					} else {
						return task;
					}
				});
				myTempList[index].tasks = [...processData];
				setCategoryList(myTempList);
			};
			const onEdit = () =>
				goModal('addTask', {
					task: item,
					color,
					index,
				});

			const onDelete = () => {
				const filteredData = myCategoryList[index].tasks.filter(
					task => task.id !== item.id,
				);
				let myTempList = [...myCategoryList];
				myTempList[index].tasks = [...filteredData];
				setCategoryList(myTempList);
			};

			return (
				<TaskItem
					key={item.id}
					color={color}
					task={item}
					onComplete={onComplete}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			);
		},
		[color, index, myCategoryList, setCategoryList],
	);

	const renderSeparator = useCallback(() => <View height={20} />, []);

	const renderFooterComponent = useCallback(() => {
		const data = myCategoryList[index].tasks;
		const checkHasCompletedTask = data.some(item => item.isCompleted === true);
		if (!checkHasCompletedTask) {
			return <></>;
		}
		const completedTasks = data.filter(item => item.isCompleted === true);
		const deleteAll = () => {
			const filteredData = myCategoryList[index].tasks.filter(
				task => task.isCompleted === false,
			);
			let myTempList = [...myCategoryList];
			myTempList[index].tasks = [...filteredData];
			setCategoryList(myTempList);
			setHideCompletedTasks(true);
		};
		return (
			<View marginT={data.length === completedTasks.length ? 0 : 30}>
				<View flexD="row" alignItems>
					<Touchable
						flex
						flexD="row"
						alignItems
						onPress={() => setHideCompletedTasks(!hideCompletedTasks)}
					>
						<VectorIcons
							name={hideCompletedTasks ? 'eye' : 'eye-slash'}
							provider="FontAwesome"
							size={15}
							style={styles.icon}
							color={COLORS.neutral700}
						/>
						<Text fontSize={FONT_SIZE.SMALLER}>
							{hideCompletedTasks ? 'Show' : 'Hide'} completed Tasks
						</Text>
					</Touchable>
					{!hideCompletedTasks && (
						<Touchable flexD="row" alignItems onPress={deleteAll}>
							<VectorIcons
								name="delete"
								provider="MaterialIcons"
								size={25}
								color={color}
							/>
							<Text color={color} fontSize={FONT_SIZE.SMALLER}>
								Delete all
							</Text>
						</Touchable>
					)}
				</View>
				{!hideCompletedTasks && (
					<View marginT={20}>
						<FlatList
							data={completedTasks}
							renderItem={renderItem}
							ItemSeparatorComponent={renderSeparator}
						/>
					</View>
				)}
			</View>
		);
	}, [
		color,
		index,
		myCategoryList,
		hideCompletedTasks,
		renderItem,
		renderSeparator,
		setCategoryList,
	]);

	const deleteList = () => {
		setShowMenu(false);
		let myTempList = [...myCategoryList];
		myTempList.splice(index, 1);
		setCategoryList(myTempList);
		goBack();
	};

	const onCancel = () => {
		setShowMenu(false);
	};

	return (
		<Container style={commonStyles.container}>
			<Header
				title={name}
				color={color}
				showMenu={show}
				setShowMenu={setShowMenu}
				menus={[
					{
						id: 1,
						content: 'Update list',
						onPress: () => {
							goModal('addCategory', {
								category: myCategoryList[index],
							});
							setShowMenu(false);
						},
					},
					{
						id: 2,
						content: 'Delete list',
						onPress: () => {
							Alert.alert(
								`Are you sure to delete "${category.name}" ?`,
								'This action will remove all reminders in this list.',
								[
									{
										text: 'OK',
										onPress: deleteList,
									},
									{
										text: 'Cancel',
										onPress: onCancel,
									},
								],
							);
						},
					},
				]}
			/>
			<View style={styles.container} onTouchEnd={() => setShowMenu(false)}>
				<View style={styles.centerIcon}>
					<VectorIcons
						color={color}
						name={icon}
						size={40}
						provider={'FontAwesome'}
					/>
				</View>
				<View marginT={20}>
					<FlatList
						data={myCategoryList[index].tasks.filter(
							task => task.isCompleted === false,
						)}
						renderItem={renderItem}
						ItemSeparatorComponent={renderSeparator}
						ListFooterComponent={renderFooterComponent}
					/>
				</View>
				<View style={styles.bottomComp}>
					<Touchable
						flexD="row"
						alignItems
						onPress={() =>
							goModal('addTask', {
								task: {
									id: PrototypeManager.number.uuidv4(),
									content: '',
									categoryId: category.id,
									isCompleted: false,
								},
								color,
								index,
							})
						}
					>
						<VectorIcons
							name="plus-circle"
							provider="FontAwesome"
							color={color}
							size={20}
							style={styles.icon}
						/>
						<Text color={color}>New Task</Text>
					</Touchable>
				</View>
			</View>
		</Container>
	);
};

export default FuncComponent;
