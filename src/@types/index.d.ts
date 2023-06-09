declare module 'custom-ui-kit' {
	export interface IModifiersText {
		fontSize?: number;
		color?: string;
		textCenter?: true;
		fontFamily?: string;
		fontStyle?: 'normal' | 'italic';
		bold?: boolean;
		letterSpacing?: number;
		underline?: true;
		underlineColor?: string;
		textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
		darkModeColor?: string;
	}

	export interface IModifiersLayout {
		flex?: number | true; // flex value, if flex === true, it means flex=1
		flexS?: number; // flexShirk
		flexG?: number; // flexGrow
		flexD?: 'row' | 'column' | 'row-reverse' | 'column-reverse'; // flexDirection
		alignItems?:
			| true
			| 'flex-start'
			| 'flex-end'
			| 'center'
			| 'stretch'
			| 'baseline'
			| undefined;
		alignSelf?:
			| true
			| 'auto'
			| 'flex-start'
			| 'flex-end'
			| 'center'
			| 'stretch'
			| 'baseline';
		justifyContent?:
			| true
			| 'flex-start'
			| 'flex-end'
			| 'center'
			| 'space-between'
			| 'space-around'
			| 'space-evenly';
	}
	export interface IModifiersSpacing {
		padding?: number;
		paddingL?: number;
		paddingR?: number;
		paddingT?: number;
		paddingB?: number;
		paddingH?: number;
		paddingV?: number;

		margin?: number | string;
		marginL?: number | string;
		marginR?: number | string;
		marginT?: number | string;
		marginB?: number | string;
		marginH?: number | string;
		marginV?: number | string;

		width?: number | string;
		height?: number | string;
	}

	export interface IModifiersStyling {
		bg?: string;

		br?: number;
		brTL?: number;
		brTR?: number;
		brBL?: number;
		brBR?: number;
	}

	export interface IModifiersTest {
		testID?: string;
	}
}
declare module 'root-stack-params' {
	import { Task, Category } from '@models';
	export type VectorIconProvider =
		| 'Entypo'
		| 'EvilsIcons'
		| 'Feather'
		| 'FontAwesome'
		| 'Foundation'
		| 'Ionicons'
		| 'MaterialIcons'
		| 'MaterialCommunityIcons'
		| 'Octicons'
		| 'Zocial'
		| 'SimpleLineIcons';

	export type RootStackParamList = {
		home: undefined;
		taskManagement: {
			category: Category;
			index: number;
		};
		fixedCategoryManagement: {
			name: string;
			icon: string;
			color: string;
			provider: VectorIconProvider;
			type: 'all' | 'today' | 'schedule';
		};
		modal: ModalStackParamList;
	};

	export type ModalStackParamList = {
		addCategory: {
			category?: Category;
		};
		addTask: {
			task: Task;
			color: string;
			index: number;
		};
	};
}
