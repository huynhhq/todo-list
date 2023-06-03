import { COLORS } from '@values';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	centerIcon: {
		position: 'absolute',
		top: '45%',
		left: '45%',
		zIndex: 1,
		opacity: 0.4,
	},
	bottomComp: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: COLORS.black,
		zIndex: 1,
	},
	icon: {
		marginRight: 10,
	},
});

export default styles;
