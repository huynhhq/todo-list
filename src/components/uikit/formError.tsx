import React, { memo, useMemo, useCallback, ComponentType } from 'react';
import { StyleSheet, Text, ListRenderItemInfo } from 'react-native';

import { FormikErrors } from 'formik';

import FlatList from './flatList';
import { ITextProps } from './text';
import { FONT_SIZE, COLORS } from '@values';
import { destructPropsToStyle } from '@helpers/uikitHelper';

interface IFormErrorProps extends ITextProps {
	hiddenOnEmpty?: boolean;
	message?:
		| string
		| string[]
		| FormikErrors<any>
		| FormikErrors<any>[]
		| undefined;
}

const FuncComponent = (props: IFormErrorProps) => {
	const { message, ...rest } = props;
	const { _styles, _props } = useMemo(() => destructPropsToStyle(rest), [rest]);
	const style = !message ? styles.empty : undefined;

	const renderItem = useCallback(
		(info: ListRenderItemInfo<string | FormikErrors<any>>) => {
			return (
				<Text {..._props} style={[_styles.textStyle, style]}>
					{info.item as any}
				</Text>
			);
		},
		[_props, _styles.textStyle, style],
	);

	if (!message && props.hiddenOnEmpty) {
		return null;
	}

	if (Array.isArray(message)) {
		return <FlatList data={message} renderItem={renderItem} />;
	}

	return (
		<Text {..._props} style={[_styles.textStyle, style]}>
			{(message as any) || 'error'}
		</Text>
	);
};

(FuncComponent as ComponentType<IFormErrorProps>).defaultProps = {
	marginT: 2,
	color: COLORS.error,
	fontSize: FONT_SIZE.SMALLER,
	hiddenOnEmpty: true,
};

export default memo(FuncComponent);

const styles = StyleSheet.create({
	empty: {
		color: COLORS.transparent,
	},
});
