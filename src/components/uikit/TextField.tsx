import React, {
	forwardRef,
	useState,
	memo,
	MutableRefObject,
	useMemo,
	useRef,
	useCallback,
	useEffect,
	RefObject,
	ComponentType,
} from 'react';
import {
	TouchableOpacity,
	TextInput,
	TextInputProps,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TextInputFocusEventData,
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
	Text,
} from 'react-native';

import { isEqual } from 'lodash';
import { FormikProps } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
	IModifiersSpacing,
	IModifiersStyling,
	IModifiersText,
	IModifiersLayout,
	IModifiersTest,
} from 'custom-ui-kit';

import { FONT_SIZE, COLORS, CONSTANTS, FLOAT_NUMBER_REGEX } from '@values';

import View from './view';
import FormError from './formError';
import {
	destructPropsToStyle,
	getTextFieldPropertyValue,
	useCombinedRefs,
} from '@helpers/uikitHelper';

const iconSize = FONT_SIZE.BIGGEST;
const iconW = iconSize * 1.4;
const additionalTimeFocusAndroid = 500;

interface Props {
	id?: string;
	containerStyle?: StyleProp<ViewStyle>;
	borderWidth?: number;
	borderColor?: string;
	formID?: string;
	formProps?: FormikProps<any>;
	withError?: 'always' | 'when-has-error' | 'none';
	errorColor?: string;
	clearButtonColor?: string;
	nextRef?: RefObject<TextInput> | MutableRefObject<TextInput>;
	type?: 'text' | 'number';
	format?: string;
	prefix?: string;
	textFieldAlign?: 'left' | 'center' | 'right' | undefined;
}

export interface ITextFieldProps
	extends TextInputProps,
		IModifiersSpacing,
		IModifiersStyling,
		IModifiersText,
		IModifiersLayout,
		IModifiersTest,
		Props {}

const TextField = forwardRef<TextInput, ITextFieldProps>((props, ref) => {
	const { _styles, _props } = useMemo(
		() => destructPropsToStyle<Props & TextInputProps>(props),
		[props],
	);

	const {
		id,
		containerStyle,
		borderWidth,
		borderColor,
		formID,
		formProps,
		withError,
		errorColor,
		clearButtonColor,
		nextRef,
		returnKeyType,
		clearButtonMode,
		autoFocus,
		value,
		type = 'text',
		onChangeText,
		onSubmitEditing,
		onFocus,
		onBlur,
		prefix,
		textFieldAlign,
		...rest
	} = _props;

	const innerRef = useRef<TextInput>(); // create a new ref instance
	const combinedRef = useCombinedRefs<TextInput>(ref, innerRef); // pointed innerRef above to parent forwardRef to use ref

	useEffect(() => {
		let timeId: any;
		if (autoFocus && CONSTANTS.IS_ANDROID) {
			timeId = setTimeout(
				() => combinedRef.current && combinedRef.current.focus(),
				additionalTimeFocusAndroid,
			);
		}

		return () => clearTimeout(timeId);
	}, [autoFocus, combinedRef]);

	// local value for input
	const [localValue, setLocalValue] = useState(
		formID && formProps
			? getTextFieldPropertyValue(formProps.values, formID)
			: value,
	);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const [visible, setVisible] = useState(
		clearButtonMode === 'always'
			? Boolean(localValue)
			: clearButtonMode === 'never'
			? false
			: clearButtonMode === 'while-editing'
			? Boolean(autoFocus && localValue)
			: clearButtonMode === 'unless-editing'
			? Boolean(!autoFocus && localValue)
			: false,
	);

	const error = formID && formProps ? formProps.errors[formID] : undefined;

	const borderStyle = {
		borderBottomWidth: borderWidth,
		borderBottomColor: borderColor,
	};

	const extraClearStyle = {
		paddingRight: visible ? iconW : _styles.textStyle.paddingRight,
	};

	const paddingV = {
		paddingVertical: _styles.textStyle.fontSize
			? _styles.textStyle.fontSize / 3
			: FONT_SIZE.NORMAL / 3,
	};

	// update parent form value and touched
	const updateFormProps = useCallback(
		(text: string) => {
			if (formProps && formID) {
				formProps.setFieldValue(formID, text, formProps.validateOnChange);
			}
		},
		[formID, formProps],
	);

	const isValid = (text: string) => {
		if (type === 'number') {
			return RegExp(FLOAT_NUMBER_REGEX).test(text);
		}
		return true;
	};

	const onLocalChangeText = (text: string) => {
		if (!isValid(text)) {
			return;
		}
		setLocalValue(text);
		updateFormProps(text);
		onChangeText && onChangeText(text);
		setVisible(
			clearButtonMode === 'always' || clearButtonMode === 'while-editing'
				? Boolean(text)
				: false,
		);
	};

	const _onSubmitEditing = useCallback(
		(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
			if (nextRef && nextRef.current) {
				nextRef.current.focus();
			}
			if (onSubmitEditing) {
				onSubmitEditing(e);
			}
		},
		[nextRef, onSubmitEditing],
	);

	const onLocalFocus = useCallback(
		(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			if (
				clearButtonMode === 'unless-editing' ||
				clearButtonMode === 'while-editing'
			) {
				setVisible(
					clearButtonMode === 'while-editing' ? Boolean(localValue) : false,
				);
			}

			onFocus && onFocus(e);
			if (formID && formProps) {
				const { setFieldTouched } = formProps;
				setFieldTouched(formID, true);
			}
		},
		[clearButtonMode, formID, formProps, localValue, onFocus],
	);

	const onLocalBlur = useCallback(
		(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			if (
				clearButtonMode === 'unless-editing' ||
				clearButtonMode === 'while-editing'
			) {
				setVisible(
					clearButtonMode === 'unless-editing' ? Boolean(localValue) : false,
				);
			}
			onBlur && onBlur(e);
			if (formID && formProps) {
				const { validateOnBlur, handleBlur, setFieldTouched } = formProps;
				validateOnBlur && handleBlur(formID)(e);
				setFieldTouched(formID, undefined, validateOnBlur);
			}
		},
		[clearButtonMode, formID, formProps, localValue, onBlur],
	);

	const onClearPress = useCallback(async () => {
		setLocalValue('');
		updateFormProps('');
		combinedRef.current && combinedRef.current.focus();
		formID && formProps && formProps.setFieldTouched(formID, true, false);
	}, [combinedRef, formID, formProps, updateFormProps]);

	const renderClearButton = useMemo(() => {
		if (!visible) {
			return null;
		}

		return (
			<TouchableOpacity onPress={onClearPress} style={styles.clearButton}>
				<Ionicons
					name={`${CONSTANTS.ICON_PREFIX}close-circle`}
					color={clearButtonColor || COLORS.silver}
					size={iconSize}
				/>
			</TouchableOpacity>
		);
	}, [clearButtonColor, onClearPress, visible]);

	return (
		<>
			<View
				style={[
					containerStyle,
					_styles.layoutStyle,
					_styles.spacingStyle,
					_styles.stylingStyle,
					{
						flexDirection: prefix ? 'row' : 'column',
					},
				]}
			>
				{prefix && <Text style={styles.prefixStyle}>{prefix}</Text>}
				<TextInput
					{...rest}
					nativeID={id}
					autoFocus={autoFocus}
					value={localValue}
					onChangeText={onLocalChangeText}
					onFocus={onLocalFocus}
					onBlur={onLocalBlur}
					ref={combinedRef}
					style={[
						paddingV,
						_styles.textStyle,
						borderStyle,
						styles.input,
						extraClearStyle,
					]}
					textAlign={textFieldAlign}
					clearButtonMode="never"
					returnKeyType={nextRef && nextRef.current ? 'next' : returnKeyType}
					onSubmitEditing={_onSubmitEditing}
				/>
				{renderClearButton}
			</View>
			{withError && withError !== 'none' ? (
				<FormError
					hiddenOnEmpty={withError === 'when-has-error'}
					message={error}
					color={error ? errorColor : COLORS.transparent}
				/>
			) : null}
		</>
	);
});

(TextField as ComponentType<ITextFieldProps>).defaultProps = {
	borderColor: COLORS.silver,
	borderWidth: StyleSheet.hairlineWidth,
	withError: 'none',
	errorColor: COLORS.error,
	placeholderTextColor: COLORS.placeholderTextColor,
	clearButtonMode: 'while-editing',
	paddingV: 0,
};

export default memo(
	TextField,
	(prev: ITextFieldProps, next: ITextFieldProps) => {
		const { formID, formProps: pProps } = prev;
		const { formProps: nProps } = next;
		if (!formID || !pProps || !nProps) {
			return false;
		}

		const { values: pValues, errors: pErrors } = pProps;
		const { values: nValues, errors: nErrors } = nProps;

		if (
			getTextFieldPropertyValue(pProps.touched, formID) !==
			getTextFieldPropertyValue(nProps.touched, formID)
		) {
			return false;
		}

		if (!getTextFieldPropertyValue(nProps.touched, formID)) {
			return true;
		}

		if (
			!isEqual(
				getTextFieldPropertyValue(pValues, formID, 'OBJECT'),
				getTextFieldPropertyValue(nValues, formID, 'OBJECT'),
			)
		) {
			return (
				getTextFieldPropertyValue(pValues, formID) ===
				getTextFieldPropertyValue(nValues, formID)
			);
		}
		if (!isEqual(pErrors, nErrors)) {
			return pErrors[formID] === nErrors[formID];
		}
		return false;
	},
);

const styles = StyleSheet.create({
	input: {
		color: COLORS.white,
		fontSize: FONT_SIZE.BIGGEST,
		fontWeight: '200',
	},
	clearButton: {
		width: iconW,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
	},
	icon: {
		alignContent: 'center',
	},
	prefixStyle: {
		fontWeight: '700',
		marginLeft: 20,
	},
});

export const focusToTextField = (
	ref: MutableRefObject<TextInput> | RefObject<TextInput>,
	duration = additionalTimeFocusAndroid,
) => {
	CONSTANTS.IS_ANDROID
		? setTimeout(() => ref.current && ref.current.focus(), duration)
		: ref.current && ref.current.focus();
};
