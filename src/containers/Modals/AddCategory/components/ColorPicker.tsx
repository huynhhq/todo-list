import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Touchable, View } from '@components/uikit';
import { SAMPLE_COLOR } from '../constants';
import { COLORS, DIMS } from '@values';

type Props = {
	color: string;
	onPick: (color: string) => void;
};

const ColorPicker: React.FC<Props> = ({ color = SAMPLE_COLOR[0], onPick }) => {
	const renderColors = useMemo(() => {
		return SAMPLE_COLOR.map((sampleColor, index) => (
			<Touchable key={index} onPress={() => onPick(sampleColor)}>
				<View style={styles.colorItem} bg={sampleColor}>
					{color === sampleColor && <View style={styles.selectedItem} />}
				</View>
			</Touchable>
		));
	}, [color, onPick]);

	return <View style={styles.container}>{renderColors}</View>;
};

export default ColorPicker;
const ITEM_SIZE = DIMS.width / 9;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		backgroundColor: COLORS.background,
		padding: DIMS.padding,
		borderRadius: DIMS.br,
		justifyContent: 'center',
	},
	colorItem: {
		width: ITEM_SIZE,
		height: ITEM_SIZE,
		borderRadius: ITEM_SIZE,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectedItem: {
		width: ITEM_SIZE / 2,
		height: ITEM_SIZE / 2,
		borderRadius: ITEM_SIZE / 2,
		backgroundColor: COLORS.black,
	},
});
