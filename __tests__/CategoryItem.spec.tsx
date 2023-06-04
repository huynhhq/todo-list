import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryItem from '@containers/Home/components/CategoryItem';

describe('CategoryItem', () => {
	it('renders correctly with props', () => {
		const icon = 'inbox';
		const text = 'Category';
		const count = 5;
		const color = 'red';
		const iconSize = 30;
		const provider = 'FontAwesome';
		const onPressMock = jest.fn();

		const { getByText } = render(
			<CategoryItem
				icon={icon}
				text={text}
				count={count}
				color={color}
				iconSize={iconSize}
				provider={provider}
				onPress={onPressMock}
			/>,
		);

		const textComponent = getByText('Category');
		const countComponent = getByText('5');

		expect(textComponent.props.children).toBe('Category');

		expect(countComponent.props.children).toBe(5);

		fireEvent.press(getByText('Category'));

		expect(onPressMock).toHaveBeenCalled();
	});
});
