import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ColorPicker from '@containers/Modals/AddCategory/components/ColorPicker';
import { SAMPLE_COLOR } from '@containers/Modals/AddCategory/constants';

describe('ColorPicker', () => {
	it('renders correctly with props', () => {
		const color = SAMPLE_COLOR[0];
		const onPickMock = jest.fn();

		const { getByTestId } = render(
			<ColorPicker color={color} onPick={onPickMock} />,
		);

		const colorPicker = getByTestId('color-picker');
		expect(colorPicker.children).toHaveLength(SAMPLE_COLOR.length);

		const colorBtn = getByTestId('color-btn-1');
		fireEvent.press(colorBtn);
		expect(onPickMock).toHaveBeenCalledWith(SAMPLE_COLOR[1]);
	});
});
