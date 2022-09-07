import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@material-ui/core/Button';
import {ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
    changeTaskTitle: (newTitle: string, todoListID: string, id: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {

    const AddTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }


    const onClickSetFilterCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListID)
    }
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            let className = task.isDone ? 'isDone' : ''
            const ChangeTaskStatus=(e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
            const changeTitleTask = (newTitle: string) => {
                props.changeTaskTitle(newTitle, props.todoListID, task.id)
            }
            const removeTask =() => props.removeTask(task.id, props.todoListID)

            return (

                <ListItem key={task.id}>
                    <Checkbox
                        onChange={ChangeTaskStatus}
                        checked={task.isDone}
                        color={"primary"}
                    />
                    {/*<input*/}
                    {/*    onChange={ChangeTaskStatus}*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={task.isDone}/>*/}

                    <EditableSpan className={className} title={task.title} changeTitle={changeTitleTask}/>
                    {/*<button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>*/}
                    <IconButton onClick={removeTask}
                                size={"small"}
                    ><HighlightOffIcon/></IconButton>
                </ListItem>
            )
        })
        : <span>TaskList is empty</span>


    return (
        <div>
            <Typography variant={"h6" } align={"center"} paragraph>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                {/*<Button*/}
                {/*    onClick={removeTodoList}>X*/}
                {/*</Button>*/}
                <IconButton onClick={removeTodoList} size={"small"}><HighlightOffIcon/></IconButton>
            </Typography>
            <AddItemForm AddItem={AddTask}/>
            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup variant="contained" size="small"
                             disableElevation
                >
                    <Button
                        color={props.filter === 'all' ? 'primary' : 'secondary'}
                        onClick={onClickSetFilterCreator('all')}
                    >All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? 'primary' : 'secondary'}
                        onClick={onClickSetFilterCreator('active')}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? 'primary' : 'secondary'}
                        onClick={onClickSetFilterCreator('completed')}
                    >Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    )
};

export default TodoList;


