import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';
import TodoList, {TaskType} from "./Todolist";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./redux/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/tasks-reducer";
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


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodolistAC(todoListID))
    },[dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(filter,todoListID))
    },[dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(title,todoListID))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    },[dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title,todoListID))
    },[dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID,todoListID))
    },[dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => { //true
        dispatch(changeTaskStatusAC(taskID,isDone,todoListID))
    },[dispatch])

    const changeTaskTitle = useCallback((newTitle: string, todoListID: string, taskID: string) => {
        dispatch( changeTaskTitleAC(taskID,newTitle,todoListID))
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
