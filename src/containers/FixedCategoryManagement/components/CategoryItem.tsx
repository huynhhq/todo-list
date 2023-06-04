import React, { useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';

// Libraries
import moment from 'moment';
import { useRecoilState } from 'recoil';

// Utilities
import { Category, Task } from '@models';
import { MY_CATEGORY_LIST } from '@states';
import { goModal } from '@helpers/navigation';

// Styles & UI components
import styles from '../styles';
import { View, Text, FlatList, VectorIcons } from '@components/uikit';
import TaskItem from '@containers/TaskManagement/components/TaskItem';

type Props = {
	category: Category;
	index: number;
	type: 'all' | 'today' | 'schedule';
};
const CategoryItem: React.FC<Props> = ({ category, type, index }) => {
	const [myCategoryList, setCategoryList] = useRecoilState(
		MY_CATEGORY_LIST({}),
	);

	const data = useMemo(() => {
		const availableTasks = category.tasks.filter(
			task => task.isCompleted === false,
		);
		switch (type) {
			case 'all':
				return availableTasks;

			case 'today':
				const todayTasks = availableTasks.filter(task =>
					moment(task?.date).isSame(moment(), 'day'),
				);
				return todayTasks;

			default:
				const sheduleTasks = availableTasks.filter(task =>
					moment(task?.date).isAfter(moment(), 'day'),
				);
				return sheduleTasks;
		}
	}, [category.tasks, type]);

	const renderSeparator = useCallback(() => <View height={20} />, []);
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
					color: category.color,
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
					color={category.color}
					task={item}
					onComplete={onComplete}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			);
		},
		[category.color, index, myCategoryList, setCategoryList],
	);

	return (
		<View>
			<View flexD="row" alignItems>
				<VectorIcons
					name={category.icon}
					color={category.color}
					size={20}
					style={styles.icon}
					provider="FontAwesome"
				/>
				<Text color={category.color}>{category.name}</Text>
			</View>
			<View marginT={20}>
				<FlatList
					data={data}
					renderItem={renderItem}
					ItemSeparatorComponent={renderSeparator}
				/>
			</View>
		</View>
	);
};

export default CategoryItem;
