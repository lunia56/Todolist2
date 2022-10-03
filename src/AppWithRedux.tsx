import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TodoList, {TaskType} from "./Todolist";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}
function AppWithRedux() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType,Array<TodoListType>>(state=>state.todolist)
    const tasks = useSelector<AppRootStateType,TaskStateType>(state=>state.task)


    const removeTodoList = (todoListID: string) => {
        dispatch(RemoveTodolistAC(todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(filter,todoListID))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(title,todoListID))
    }

    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title,todoListID))
    }

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID,todoListID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => { //true
        dispatch(changeTaskStatusAC(taskID,isDone,todoListID))
    }

    const changeTaskTitle = (newTitle: string, todoListID: string, taskID: string) => {
        dispatch( changeTaskTitleAC(taskID,newTitle,todoListID))
    }


    //UI:
    const getTasksForRender = (todolist: TodoListType, tasks: TaskStateType) => {
        let tasksForRender;
        switch (todolist.filter) {
            case 'completed':
                tasksForRender = tasks[todolist.id].filter(task => task.isDone)
                break
            case 'active':
                tasksForRender = tasks[todolist.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[todolist.id]
        }
        return tasksForRender
    }

    const todoListComponents = todoLists.map(tl => {

        return (
            <Grid item>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForRender(tl, tasks)}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}

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
