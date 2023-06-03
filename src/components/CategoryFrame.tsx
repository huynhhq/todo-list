import React, { memo, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import View from './uikit/view';
import Text from './uikit/text';
import Touchable from './uikit/touchable';
import VectorIcons from './uikit/vectorIcons';

import { COLORS, DIMS, FONT_SIZE } from '@values';
import Divider from './uikit/divider';
interface ICategoryFrame {
	title?: string;
	onPress?: () => void;
	iconName?: string;
	fontSize?: number;
	color?: string;
	padding?: number;
	style?: StyleProp<ViewStyle>;
}

const CategoryFrame = memo((props: PropsWithChildren<ICategoryFrame>) => {
	const {
		title,
		onPress,
		children,
		iconName = 'chevron-forward-outline',
		fontSize = FONT_SIZE.SMALL,
		color = COLORS.primaryRed,
		style,
		padding,
	} = props;
	return (
		<View style={[style, styles.container]}>
			<View
				flexD="row"
				paddingH={DIMS.padding}
				paddingB={DIMS.padding}
				alignItems="center"
			>
				{title && (
					<View style={styles.titleContainer}>
						<Text color={COLORS.mainGray} fontSize={FONT_SIZE.NORMAL}>
							{title}
						</Text>
					</View>
				)}
				{onPress && (
					<Touchable flexD="row" alignItems onPress={onPress} marginR={20}>
						<View marginL={4}>
							<VectorIcons
								name={iconName}
								size={fontSize + 8}
								color={color}
								provider="Entypo"
							/>
						</View>
					</Touchable>
				)}
			</View>
			{title && <Divider />}
			<View paddingH={padding ?? DIMS.padding}>{children}</View>
		</View>
	);
});

export default CategoryFrame;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1C1C1E',
		paddingTop: DIMS.padding,
		borderRadius: 10,
		marginBottom: 50,
	},
	titleContainer: {
		flex: 1,
		paddingVertical: 4,
		marginBottom: 8,
		borderRadius: 2,
		marginHorizontal: 4,
		paddingHorizontal: 8,
		justifyContent: 'center',
	},
});
