import React from 'react';

// Utilities
import { Task } from '@models';
import { COLORS, FONT_SIZE } from '@values';

// Styles & UI Components
import styles from '../styles';
import { Touchable, VectorIcons, View, Text } from '@components/uikit';

type Props = {
	task: Task;
	color: string;
	onEdit?: () => void;
	onDelete?: () => void;
	onComplete?: () => void;
};
const TaskItem: React.FC<Props> = ({
	task,
	color,
	onEdit,
	onDelete,
	onComplete,
}) => {
	const handleComplete = () => {
		onComplete && onComplete();
	};
	const handleDelete = () => {
		onDelete && onDelete();
	};
	const handleEdit = () => {
		onEdit && onEdit();
	};

	return (
		<>
			<View flexD="row">
				<View flex flexD="row" alignItems>
					<Touchable onPress={handleComplete} disabled={task.isCompleted}>
						<VectorIcons
							name={task.isCompleted ? 'check-circle' : 'circle-o'}
							provider="FontAwesome"
							size={25}
							color={color}
							style={styles.icon}
						/>
					</Touchable>
					<Text color={task.isCompleted ? COLORS.neutral700 : COLORS.lightGray}>
						{task.content}
					</Text>
				</View>
				{!task.isCompleted && (
					<View flexD="row" alignItems>
						<Touchable onPress={handleEdit} marginR={10}>
							<VectorIcons
								name="info-circle"
								provider="FontAwesome"
								size={25}
								color={COLORS.warning700}
							/>
						</Touchable>
						<Touchable onPress={handleDelete}>
							<VectorIcons
								name="times-circle"
								provider="FontAwesome"
								size={25}
								color={COLORS.red900}
							/>
						</Touchable>
					</View>
				)}
			</View>
			{task.date && (
				<View flexD="row" alignItems marginL={35} marginT={5}>
					<VectorIcons
						name="calendar"
						color={color}
						size={12}
						provider="FontAwesome"
						style={styles.icon}
					/>
					<Text
						color={task.isCompleted ? COLORS.neutral700 : COLORS.lightGray}
						fontSize={FONT_SIZE.SMALLER}
					>
						{task.date}
					</Text>
				</View>
			)}
		</>
	);
};

export default TaskItem;
