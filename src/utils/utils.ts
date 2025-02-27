export interface Item {
    id: string;
    category: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

export interface CategoryItem {
    title: string;
    cnt: number;
}