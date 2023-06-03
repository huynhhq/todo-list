import React, { useEffect, useMemo, useState } from 'react';

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

const FuncComponent: React.FC = () => {
	const data = useRecoilValue(MY_CATEGORY_LIST({}));

	const [currentTasks, setcurrentTasks] = useState<Task[]>([]);
	const [tentativeScheduleTasks, setTentativeScheduleTasks] = useState<Task[]>(
		[],
	);
	useEffect(() => {}, []);

	const generateFixedCategories = useMemo(() => {
		const todayTasks: Task[] = [];
		const scheduleTasks: Task[] = [];

		for (let i = 0; i < data?.length; i++) {
			const currentCategory = data[i];
			for (let j = 0; j < currentCategory.tasks.length; j++) {
				const currentTask = currentCategory.tasks[j];
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
		setcurrentTasks(todayTasks);
		setTentativeScheduleTasks(scheduleTasks);

		return (
			<>
				<CategoryItem
					icon="inbox"
					text="All"
					count={data?.length}
					provider="FontAwesome"
					color={COLORS.primary}
				/>
				<CategoryItem
					icon="sun"
					text="Today"
					count={todayTasks.length}
					provider="Feather"
					color={COLORS.yellow700}
				/>
				<CategoryItem
					icon="calendar-clock"
					text="Tentative Schedule"
					count={scheduleTasks.length}
					provider="MaterialCommunityIcons"
					color={COLORS.red700}
				/>
			</>
		);
	}, [data]);

	const generateMyCategories = useMemo(() => {
		if (!data) {
			return (
				<View padding={DIMS.padding}>
					<Text color={COLORS.lightGray} textCenter>
						Let's create your list
					</Text>
				</View>
			);
		}
		return data?.map(category => (
			<CategoryItem
				icon={category.icon}
				text={category.name}
				count={category.tasks.length}
				provider="FontAwesome"
				color={category.color}
			/>
		));
	}, [data]);
	return (
		<Container style={commonStyles.container}>
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
					onPress={() => {}}
					color={COLORS.primary}
				>
					{generateMyCategories}
				</CategoryFrame>
			</ScrollView>
		</Container>
	);
};

export default FuncComponent;
