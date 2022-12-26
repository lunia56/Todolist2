import React, {FC, useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button,ButtonGroup, IconButton, List, Typography} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";
import Task from "./Task";
import {FilterValuesType} from './AppWithRedux';
import {GetTasksTC} from './redux/tasks-reducer';
import {TaskType} from './api/todolist-api';

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

// *----------------------------------------------------------------------*//
type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (newTitle: string, todoListID: string, id: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}


const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.task[props.todoListID])
    const dispatch = AppDispatch()
    useEffect(()=>{
        dispatch(GetTasksTC(props.todoListID))
    },[])

    let tasksForRender = tasks;
    // if (props.filter === 'completed') {
    //     tasksForRender = tasks.filter(task => task.isDone)
    // }
    // if (props.filter === 'active') {
    //     tasksForRender = tasks.filter(task => !task.isDone)
    // }


    const AddTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID])


    const onClickSetFilterCreator = useCallback((filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID), [props.todoListID])
    const removeTodoList = useCallback(() => props.removeTodoList(props.todoListID),[props.removeTodoList,props.todoListID])
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListID)
    }, [props.changeTodoListTitle])


    const ChangeTaskStatus = useCallback((taskId:string, status:boolean) => props.changeTaskStatus(taskId, status,props.todoListID),[props.changeTaskStatus,props.todoListID])

    const changeTitleTask = useCallback((newTitle: string,taskId:string ) => {
        props.changeTaskTitle(newTitle, props.todoListID, taskId)
    },[props.changeTaskTitle,props.todoListID])

    const removeTask = useCallback((taskId:string) => props.removeTask(taskId , props.todoListID),[props.removeTask,props.todoListID])


    const tasksItems = tasksForRender.length ? tasksForRender.map((task: TaskType) => {
          return  <Task
                key={task.id}
                task={task}
                changeTaskTitle={changeTitleTask}
                changeTaskStatus={ChangeTaskStatus}
                removeTask={removeTask}
          />
        })


        : <span>TaskList is empty</span>


    return (
        <div>
            <Typography variant={"h6"} align={"center"} paragraph>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
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
});

export default TodoList;


