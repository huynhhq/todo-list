import React, { useCallback } from 'react';
import { goBack } from '@helpers/navigation';
import { COLORS, DIMS, FONT_SIZE } from '@values';
import { View, Touchable, Text, VectorIcons } from './uikit';
import { StyleSheet } from 'react-native';

interface Menu {
	id: number;
	content: string;
	onPress: () => void;
}

type HeaderProps = {
	title: string;
	color: string;
	showMenu?: boolean;
	menus?: Menu[];
	onGoBack?: () => void;
	setShowMenu?: (value: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
	title,
	color,
	menus,
	showMenu,
	onGoBack,
	setShowMenu,
}) => {
	const handleGoBack = useCallback(() => {
		if (onGoBack) {
			onGoBack();
		} else {
			goBack();
		}
	}, [onGoBack]);

	return (
		<View height={50} flexD="row" alignItems>
			<Touchable
				style={styles.leftContainer}
				hitSlop={DIMS.hitSlop}
				onPress={handleGoBack}
			>
				<VectorIcons
					name={'arrow-left'}
					provider="SimpleLineIcons"
					color={color}
					size={15}
				/>
			</Touchable>
			<View flex>
				<Text style={styles.title} color={color}>
					{title}
				</Text>
			</View>
			{menus && (
				<Touchable
					style={styles.rightContainer}
					hitSlop={DIMS.hitSlop}
					onPress={() => {
						setShowMenu && setShowMenu(!showMenu);
					}}
				>
					<VectorIcons
						name="ellipsis-horizontal-circle-outline"
						color={color}
						provider="Ionicons"
						size={25}
					/>
				</Touchable>
			)}
			{showMenu && menus && (
				<View style={styles.menu} bg={COLORS.background}>
					{menus.map((menu, index) => (
						<Touchable
							key={menu.id}
							marginB={index !== menus.length - 1 ? 6 : 0}
							paddingV={5}
							paddingH={20}
							hitSlop={DIMS.hitSlop}
							onPress={() => menu.onPress()}
						>
							<Text color={COLORS.lightGray}>{menu.content}</Text>
						</Touchable>
					))}
				</View>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	leftContainer: {
		position: 'absolute',
		zIndex: 1,
	},
	arrowLeftIcon: {
		width: 30,
		height: 20,
	},
	title: {
		fontSize: FONT_SIZE.BIGGEST,
		lineHeight: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	rightContainer: {
		position: 'absolute',
		right: 0,
	},
	moreVerticalIcon: {
		width: 10,
		height: 20,
	},
	menu: {
		position: 'absolute',
		right: 0,
		top: 45,
		paddingVertical: 20,
		zIndex: Number.MAX_VALUE,
		borderRadius: DIMS.br,
	},
});
