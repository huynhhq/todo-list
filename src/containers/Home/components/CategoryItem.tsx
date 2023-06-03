import React from 'react';
import { StyleSheet } from 'react-native';

import { Touchable, VectorIcons, View, Text } from '@components/uikit';
import { COLORS, DIMS, FONT_SIZE } from '@values';
import { VectorIconProvider } from '@components/uikit/vectorIcons';

type Props = {
	icon: string;
	text: string;
	count: number;
	iconSize?: number;
	color: string;
	provider?: VectorIconProvider;
};

const CategoryItem: React.FC<Props> = ({
	icon,
	text,
	count,
	color,
	iconSize = 20,
	provider = 'Ionicons',
}) => {
	return (
		<Touchable style={styles.container}>
			<View flex flexD="row" alignItems>
				<VectorIcons
					name={icon}
					provider={provider}
					color={color}
					size={iconSize}
					style={styles.icon}
				/>
				<Text color={COLORS.lightGray}>{text}</Text>
			</View>
			<View flexD="row" alignItems>
				{count > 0 && (
					<View marginR={5}>
						<Text fontSize={FONT_SIZE.NORMAL} color={COLORS.mainGray}>
							{count}
						</Text>
					</View>
				)}
				<VectorIcons
					name={'arrow-right'}
					provider="SimpleLineIcons"
					color={COLORS.lightGray}
					size={15}
				/>
			</View>
		</Touchable>
	);
};

export default CategoryItem;

const styles = StyleSheet.create({
	container: {
		padding: DIMS.padding,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	icon: {
		marginRight: 20,
	},
});
