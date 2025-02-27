import React from 'react';
import { FormatDate } from '../utils';
import TodoItemStatus from './TodoItemStatus';

interface PropData {
    id: string;
    title: string;
    category: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    clickTodoItem: any;
    handleRemove: any;
}

const TodoItem: React.FC<PropData> = (props) => {
    const { id, title, category, description, dueDate, completed, clickTodoItem, handleRemove } = props;

    return (
        <div className='todo-item'>
            <div className='todo-item-title' onClick={() => clickTodoItem(id)}>{title} | {`${category}`}</div>
            <div className='todo-item-description'>
                {description}
            </div>
            <div className='todo-item-date'>
                {`${FormatDate(new Date(dueDate))}`}
            </div>
            <div className='todo-item-status'>
                <TodoItemStatus completed={completed} />
            </div>
            <div className='todo-item-action'>
                <button className='btn btn-remove' onClick={() => handleRemove(id)}>Remove</button>
            </div>
        </div>
    )
}

export default TodoItem;