import React, { useMemo } from 'react';

// Libraries
import moment from 'moment';
import { useRecoilValue } from 'recoil';

// Utilities
import { COLORS, DIMS } from '@values';
import { Task } from '@models/Task';
import { MY_CATEGORY_LIST } from '@states';

// UI components
import CategoryFrame from '@components/CategoryFrame';
import CategoryItem from './components/CategoryItem';
import {
	Container,
	ScrollView,
	Text,
	View,
	commonStyles,
} from '@components/uikit';
import { goModal, goScreen } from '@helpers/navigation';

const FuncComponent: React.FC = () => {
	const data = useRecoilValue(MY_CATEGORY_LIST({}));

	const generateFixedCategories = useMemo(() => {
		const totalTask: Task[] = [];
		const todayTasks: Task[] = [];
		const scheduleTasks: Task[] = [];

		for (let i = 0; i < data?.length; i++) {
			const currentCategory = data[i];
			for (let j = 0; j < currentCategory.tasks.length; j++) {
				const currentTask = currentCategory.tasks[j];
				// this task is completed
				if (currentTask.isCompleted) continue;
				totalTask.push(currentTask);
				// user does not apply date for this task
				if (!currentTask?.date) continue;

				// true -> today
				// false -> another day
				const dateStatus = moment(currentTask.date).isSame(moment(), 'day');
				if (dateStatus) {
					todayTasks.push(currentTask);
				} else {
					scheduleTasks.push(currentTask);
				}
			}
		}

		return (
			<>
				<CategoryItem
					icon="inbox"
					text="All"
					count={totalTask.length}
					provider="FontAwesome"
					color={COLORS.primary}
					onPress={() =>
						goScreen('fixedCategoryManagement', {
							icon: 'inbox',
							name: 'All',
							color: COLORS.primary,
							type: 'all',
							provider: 'FontAwesome',
						})
					}
				/>
				<CategoryItem
					icon="sun"
					text="Today"
					count={todayTasks.length}
					provider="Feather"
					color={COLORS.yellow700}
					onPress={() =>
						goScreen('fixedCategoryManagement', {
							icon: 'sun',
							name: 'Today',
							color: COLORS.yellow700,
							type: 'today',
							provider: 'Feather',
						})
					}
				/>
				<CategoryItem
					icon="calendar-clock"
					text="Tentative Schedule"
					count={scheduleTasks.length}
					provider="MaterialCommunityIcons"
					color={COLORS.red700}
					onPress={() =>
						goScreen('fixedCategoryManagement', {
							icon: 'calendar-clock',
							name: 'Tentative Schedule',
							color: COLORS.red700,
							type: 'schedule',
							provider: 'MaterialCommunityIcons',
						})
					}
				/>
			</>
		);
	}, [data]);

	const generateMyCategories = useMemo(() => {
		if (!data || data.length === 0) {
			return (
				<View padding={DIMS.padding}>
					<Text color={COLORS.lightGray} textCenter>
						Let's create your list
					</Text>
				</View>
			);
		}
		return data?.map((category, index) => (
			<CategoryItem
				key={category.id}
				icon={category.icon}
				text={category.name}
				count={category.tasks.filter(task => task.isCompleted === false).length}
				provider="FontAwesome"
				color={category.color}
				onPress={() =>
					goScreen('taskManagement', {
						category,
						index,
					})
				}
			/>
		));
	}, [data]);

	return (
		<Container
			safeAreaStyle={{ backgroundColor: COLORS.black }}
			style={commonStyles.container}
		>
			<View marginB={20}>
				<Text fontSize={40} color="white" textCenter>
					TODO LIST
				</Text>
			</View>
			<ScrollView>
				<CategoryFrame>{generateFixedCategories}</CategoryFrame>
				<CategoryFrame
					title="My List"
					iconName="squared-plus"
					onPress={() => goModal('addCategory')}
					color={COLORS.primary}
				>
					{generateMyCategories}
				</CategoryFrame>
			</ScrollView>
		</Container>
	);
};

export default FuncComponent;
