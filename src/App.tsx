import React, {useState} from 'react';
import './App.css';
// import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';
import TodoList, {TaskType} from "./Todolist";

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

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter: filter}))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title}))
    }
    const addTodoList = (title: string) => {
        let todolist: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([todolist, ...todoLists])
        setTasks({...tasks, [todolist.id]: []})
    }

    const addTask = (title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})
    }
    const removeTask = (taskID: string, todoListID: string) => {
        // const copyTasks = {...tasks}
        // copyTasks[todoListID] = copyTasks[todoListID].filter(task => task.id !== taskID)
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => { //true
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, isDone})}
        )
    }
    const changeTaskTitle = (newTitle: string, todoListID: string, taskID: string) => {
        debugger
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, title: newTitle})})


        // let todolistTasks = tasks[todoListID]
        // let task = todolistTasks.find(t => t.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasks({...tasks})
        // }

    }


    //UI:
    // const getTasksForRender = (todolist: TodoListType, tasks: TaskStateType) => {
    //     let tasksForRender;
    //     switch (todolist.filter) {
    //         case 'completed':
    //             tasksForRender = tasks[todolist.id].filter(task => task.isDone)
    //             break
    //         case 'active':
    //             tasksForRender = tasks[todolist.id].filter(task => !task.isDone)
    //             break
    //         default:
    //             tasksForRender = tasks[todolist.id]
    //     }
    //     return tasksForRender
    // }

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

export default App;
