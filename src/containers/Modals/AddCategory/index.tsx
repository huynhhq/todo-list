import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

// Libraries
import { useRecoilState } from 'recoil';
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Utilities
import { goBack } from '@helpers/navigation';
import { COLORS, DIMS, FONT_SIZE } from '@values';
import { ICON_NAMES, SAMPLE_COLOR } from './constants';
import { ModalStackParamList } from 'root-stack-params';

// UI components
import IconPicker from './components/IconPicker';
import ColorPicker from './components/ColorPicker';
import {
	Touchable,
	View,
	Text,
	ScrollView,
	VectorIcons,
	TextField,
} from '@components/uikit';
import { MY_CATEGORY_LIST } from '@states';
import { Category } from '@models/Category';
import { PrototypeManager } from '@helpers/prototype';

interface Props extends StackScreenProps<ModalStackParamList> {
	route: RouteProp<ModalStackParamList, 'addCategory'>;
}

const FuncComponent: React.FC<Props> = () => {
	const [myCategoryList, setMyCategoryList] = useRecoilState(
		MY_CATEGORY_LIST({}),
	);
	console.log('myCategoryList', myCategoryList);
	const [color, setColor] = useState<string>(SAMPLE_COLOR[0]);
	const [iconName, setIconName] = useState<string>(ICON_NAMES[0]);
	const [categoryName, setCategoryName] = useState<string>('');

	const onSubmit = useCallback(() => {
		let myTempList: Category[] = [];
		if (myCategoryList) {
			myTempList = [...myCategoryList];
		}
		myTempList.push({
			id: PrototypeManager.number.uuidv4(),
			name: categoryName,
			icon: iconName,
			color,
			tasks: [],
		});
		Alert.alert('Notification', 'Added successfully', [
			{
				text: 'OK',
				onPress: () => goBack(),
			},
		]);
		setMyCategoryList(myTempList);
	}, [categoryName, color, iconName, myCategoryList, setMyCategoryList]);

	return (
		<ScrollView>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<Touchable onPress={() => goBack()}>
						<VectorIcons
							name="close-o"
							color={COLORS.neutral700}
							provider="EvilsIcons"
							size={30}
						/>
					</Touchable>
					<VectorIcons
						name={iconName}
						size={30}
						color={color}
						provider="FontAwesome"
					/>
					<Touchable onPress={onSubmit} disabled={categoryName.length === 0}>
						<Text
							bold
							fontSize={FONT_SIZE.BIG}
							color={categoryName.length > 0 ? COLORS.white : COLORS.neutral700}
						>
							Save
						</Text>
					</Touchable>
				</View>
				<View marginT={60}>
					<View bg={COLORS.background} padding={DIMS.padding} br={DIMS.br}>
						<TextField
							placeholder="Please input title"
							onChangeText={setCategoryName}
							borderWidth={0}
							value={categoryName}
						/>
					</View>
				</View>
				<View marginT={40}>
					<ColorPicker color={color} onPick={setColor} />
				</View>
				<View marginT={40}>
					<IconPicker color={color} icon={iconName} onPick={setIconName} />
				</View>
			</View>
		</ScrollView>
	);
};

export default FuncComponent;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		backgroundColor: COLORS.black,
		overflow: 'hidden',
		padding: DIMS.padding,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
