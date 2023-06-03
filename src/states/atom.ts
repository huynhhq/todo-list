import { atom } from 'recoil';
import { Category } from '@models/Category';
import { KeychainManager, STORAGE_KEYS } from '@helpers/keychain';

export const CATEGORY_LIST = atom<Category[]>({
	key: 'CATEGORY_LIST',
	default: [],
	effects: [KeychainManager.localStorageEffect(STORAGE_KEYS.categoryList)],
});
