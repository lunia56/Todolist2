import React, {FC} from 'react';
import {FilterValuesType} from './App';
import {AddItemInput} from './AddItemInput';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (newTitle: string, todoListID: string,id:string) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {

    const AddTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }



    const onClickSetFilterCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID)

    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {

            const changeTitleTask = (newTitle: string) => {
                props.changeTaskTitle(newTitle, props.todoListID,task.id)
            }

            return (

                <li key={task.id}>
                    <input
                        onChange={(e) =>
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)}
                        type="checkbox"
                        checked={task.isDone}/>

                    <EditableSpan isDone={task.isDone} title={task.title} changeTitleTask={changeTitleTask}/>
                    <button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>
                </li>
            )
        })
        : <span>TaskList is empty</span>


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={() => {
                    props.removeTodoList(props.todoListID)
                }}>X
                </button>
            </h3>
            <AddItemInput AddItem={AddTask}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={onClickSetFilterCreator('all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={onClickSetFilterCreator('active')}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={onClickSetFilterCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    )
};

export default TodoList;


