export interface Task {
	id: string;
	content: string;
	date?: string;
	categoryId: string;
	isCompleted: boolean;
}
