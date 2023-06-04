import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IconPicker from '@containers/Modals/AddCategory/components/IconPicker';
import {
	ICON_NAMES,
	SAMPLE_COLOR,
} from '@containers/Modals/AddCategory/constants';

describe('IconPicker', () => {
	it('renders correctly with props', () => {
		const icon = ICON_NAMES[0];
		const color = SAMPLE_COLOR[0];
		const onPickMock = jest.fn();

		const { getByTestId } = render(
			<IconPicker icon={icon} color={color} onPick={onPickMock} />,
		);

		const iconPicker = getByTestId('icon-picker');
		expect(iconPicker.children).toHaveLength(ICON_NAMES.length);

		const colorBtn = getByTestId('icon-btn-1');
		fireEvent.press(colorBtn);
		expect(onPickMock).toHaveBeenCalledWith(ICON_NAMES[1]);
	});
});
