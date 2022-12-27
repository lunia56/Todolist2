import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';
import TodoList from "./Todolist";
import {
    AddTodolistAC, AddTodoTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, getTodoTC,
    RemoveTodolistAC, RemoveTodoTC, UpdateTodoTitleTC,
} from "./redux/todolists-reducer";
import {
    addTaskAC, AddTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    DeleteTaskTC,
    GetTasksTC,
    removeTaskAC, UpdateTaskTC, UpdateTaskTitleTC
} from "./redux/tasks-reducer";
import { useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";
import {TaskStatuses, TaskType, TodolistType} from './api/todolist-api';

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = TodolistType & {
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = AppDispatch();
    const todoLists = useSelector<AppRootStateType,Array<TodoListType>>(state=>state.todolist)


    useEffect(()=>{
        dispatch(getTodoTC())
    },[])


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoTC(todoListID))
    },[dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(filter,todoListID))
    },[dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(UpdateTodoTitleTC(title,todoListID))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoTC(title))
    },[dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(AddTaskTC(todoListID,title))
    },[dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(DeleteTaskTC(todoListID,taskID))
    },[dispatch])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(UpdateTaskTC(todoListID,taskID,status))
    },[dispatch])

    const changeTaskTitle = useCallback((newTitle: string, todoListID: string, taskID: string) => {
        dispatch( UpdateTaskTitleTC(todoListID,taskID,newTitle))
    },[dispatch])


    //UI:


    const todoListComponents = todoLists.map(tl => {

        return (
            <Grid item>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}

                    />
                </Paper>
            </Grid>
        );
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0px'}}>
                    <AddItemForm AddItem={addTodoList}/>
                </Grid>

                <Grid container spacing={4}>{todoListComponents}</Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
