const json = {
	tryParse: (jsonValue: any) => {
		if (!jsonValue) {
			return undefined;
		}
		try {
			return JSON.parse(jsonValue);
		} catch (error) {
			return jsonValue;
		}
	},

	tryStringify: (obj: any) => {
		if (!obj) {
			return undefined;
		}
		try {
			return JSON.stringify(obj);
		} catch (error) {
			return obj;
		}
	},
};

const number = {
	uuidv4: () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = (Math.random() * 16) | 0,
				v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	},

	random: (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1) + min),
};

export const PrototypeManager = {
	json,
	number,
};
