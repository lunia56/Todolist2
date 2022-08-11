import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType} from './App';
import {Button} from './components/Button';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    filterTasks: (props: filterValueType) => void
    addTask: (newTitle: string) => void
    changeIsDone: (taskID: string, isDoneValue: boolean) => void
    filter: filterValueType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const [filterValue, setFilterValue] = useState<filterValueType>('All')

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            addTaskHandler()
        }
    }

    const tsarFooHandler = (filterValue: filterValueType) => {
        props.filterTasks(filterValue)
        setFilterValue(filterValue) // изменяем state  который передаем в button для условной отрисовки
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }


    return <div>

        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''}
                   value={title}
                   onKeyDown={onKeyPressHandler}
                   onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <ul>
            {props.tasks.map((el) => {
                const onClickHandler = () => removeTaskHandler(el.id)
                const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeIsDone(el.id, event.currentTarget.checked)
                }
                return (
                    <li key={el.id} className={el.isDone? styles.isDone:""}>
                        <input type="checkbox"
                               checked={el.isDone}
                               onChange={changeIsDoneHandler}/>
                        <span>{el.title}</span>
                        <button onClick={onClickHandler}>X</button>
                    </li>
                )
            })}


        </ul>
        <div>
            {/*<Button callBack={() => tsarFooHandler('All')} nickName={'All'}/>*/}
            {/*<Button callBack={() => tsarFooHandler('Active')} nickName={'Active'}/>*/}
            {/*<Button callBack={() => tsarFooHandler('Completed')} nickName={'Completed'}/>*/}
            <button className={filterValue === 'All' ? styles.activeFilter : ''}
                    onClick={() => tsarFooHandler('All')}>All
            </button>
            <button className={filterValue === 'Active' ? styles.activeFilter : ''}
                    onClick={() => tsarFooHandler('Active')}>Active
            </button>
            <button className={filterValue === 'Completed' ? styles.activeFilter : ''}
                    onClick={() => tsarFooHandler('Completed')}>Completed
            </button>
        </div>
    </div>
}
