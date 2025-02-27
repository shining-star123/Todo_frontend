import React from 'react';

interface PropsData {
    completed: boolean;
}

const TodoItemStatus: React.FC<PropsData> = (props: PropsData) => {
    return (
        <div className={props.completed ? 'todo-item-completed' : 'todo-item-active'}>
            {
                props.completed ? "Completed" : "Active"
            }
        </div>
    )
}

export default TodoItemStatus;