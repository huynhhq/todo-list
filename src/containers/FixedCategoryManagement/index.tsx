import React, { useCallback } from 'react';

// Libraries
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Utilities
import { RootStackParamList } from 'root-stack-params';

// Styles & UI components
import {
	Container,
	FlatList,
	VectorIcons,
	View,
	commonStyles,
} from '@components/uikit';
import styles from './styles';
import Header from '@components/Header';
import { Category } from '@models';
import { ListRenderItemInfo } from 'react-native';
import CategoryItem from './components/CategoryItem';
import { useRecoilValue } from 'recoil';
import { MY_CATEGORY_LIST } from '@states';

interface Props extends StackScreenProps<RootStackParamList> {
	route: RouteProp<RootStackParamList, 'fixedCategoryManagement'>;
}

const FuncComponent: React.FC<Props> = ({ route }) => {
	const { name, color, icon, type, provider } = route.params;

	const data = useRecoilValue(MY_CATEGORY_LIST({}));

	const renderSeparator = useCallback(() => <View height={40} />, []);

	const renderItem = useCallback(
		(info: ListRenderItemInfo<Category>) => {
			const { item, index } = info;
			return (
				<CategoryItem key={item.id} index={index} category={item} type={type} />
			);
		},
		[type],
	);

	return (
		<Container style={commonStyles.container}>
			<Header title={name} color={color} />
			<View style={styles.container}>
				<View style={styles.centerIcon}>
					<VectorIcons
						color={color}
						name={icon}
						size={40}
						provider={provider}
					/>
				</View>
				<View marginT={20}>
					<FlatList
						data={data}
						renderItem={renderItem}
						ItemSeparatorComponent={renderSeparator}
					/>
				</View>
			</View>
		</Container>
	);
};

export default FuncComponent;
