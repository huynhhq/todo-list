import React from 'react';
import { RecoilRoot } from 'recoil';
import 'react-native-gesture-handler';

import { RootNavigator } from '@navigator/RootNavigator';

export default (_: any) => {
	return (
		<RecoilRoot>
			<RootNavigator />
		</RecoilRoot>
	);
};
