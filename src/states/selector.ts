import { selectorFamily } from 'recoil';

import { CATEGORY_LIST } from './atom';
import { KeychainManager, STORAGE_KEYS } from '@helpers/keychain';

export const MY_CATEGORY_LIST = selectorFamily({
	key: 'MY_CATEGORY_LIST',
	get:
		() =>
		({ get }) => {
			const categoryList = get(CATEGORY_LIST);
			return categoryList;
		},
	set:
		() =>
		({ set }, newValue) => {
			set(CATEGORY_LIST, newValue);
			KeychainManager.setItem(STORAGE_KEYS.categoryList, newValue);
		},
});
