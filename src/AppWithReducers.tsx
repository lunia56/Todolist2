import React, {useReducer, useState} from 'react';
import './App.css';
// import TodoList, {TaskType} from './TodoList';
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
    todolistsReducer
} from "./redux/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./redux/tasks-reducer";

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

function AppWithReducers() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer,[
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListId_1]: [
            {id: v1(), title: 'HTML', isDone: true}, // => t
            {id: v1(), title: 'CSS', isDone: true}, // => {...t, isDone}
            {id: v1(), title: 'JS/TS', isDone: false}, // => t
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true}, // => t
            {id: v1(), title: 'chees', isDone: true}, // => {...t, isDone}
            {id: v1(), title: 'pancel', isDone: false}, // => t
        ]
    })


    const removeTodoList = (todoListID: string) => {
        dispatchToTodoListsReducer(RemoveTodolistAC(todoListID))
        dispatchToTasksReducer(RemoveTodolistAC(todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodoListsReducer(ChangeTodolistFilterAC(filter,todoListID))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodoListsReducer(ChangeTodolistTitleAC(title,todoListID))
    }

    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const addTask = (title: string, todoListID: string) => {
        dispatchToTasksReducer(addTaskAC(title,todoListID))
    }

    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasksReducer(removeTaskAC(taskID,todoListID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => { //true
        dispatchToTasksReducer(changeTaskStatusAC(taskID,isDone,todoListID))
    }

    const changeTaskTitle = (newTitle: string, todoListID: string, taskID: string) => {
        dispatchToTasksReducer( changeTaskTitleAC(taskID,newTitle,todoListID))
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
                        // tasks={getTasksForRender(tl, tasks)}
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

export default AppWithReducers;
