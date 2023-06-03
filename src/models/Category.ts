import { Task } from './Task';

export interface Category {
	id: string;
	name: string;
	icon: string;
	color: string;
	tasks: Task[];
}
