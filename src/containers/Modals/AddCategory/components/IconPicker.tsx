import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Touchable, View, VectorIcons } from '@components/uikit';

import { COLORS, DIMS } from '@values';
import { ICON_NAMES } from '../constants';

type Props = {
	icon: string;
	color: string;
	onPick: (iconName: string) => void;
};

const IconPicker: React.FC<Props> = ({
	color,
	icon = ICON_NAMES[0],
	onPick,
}) => {
	const renderColors = useMemo(() => {
		return ICON_NAMES.map((sampleIcon, index) => (
			<Touchable key={index} onPress={() => onPick(sampleIcon)}>
				<View
					style={[
						styles.colorItem,
						icon === sampleIcon && {
							borderWidth: 1,
							borderColor: color,
						},
					]}
				>
					<VectorIcons
						name={sampleIcon}
						size={25}
						color={icon === sampleIcon ? color : '#8b8b8d'}
						provider="FontAwesome"
					/>
					{/* {icon === sampleIcon && <View style={styles.selectedItem} />} */}
				</View>
			</Touchable>
		));
	}, [color, icon, onPick]);

	return <View style={styles.container}>{renderColors}</View>;
};

export default IconPicker;
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
