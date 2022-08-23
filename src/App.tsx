import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

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
type TaskStateType = {
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


    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter: filter}))
    }
    const changeTodoListTitle = (title:string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title}))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        let todolist: TodoListType = {id: v1(), title, filter: 'all'}
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
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, newTitle})})


        // let todolistTasks = tasks[todoListID]
        // let task = todolistTasks.find(t => t.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasks({...tasks})
        // }

    }


    //UI:


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender;
        switch (tl.filter) {
            case 'completed':
                tasksForRender = tasks[tl.id].filter(task => task.isDone)
                break
            case 'active':
                tasksForRender = tasks[tl.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[tl.id]
        }
        return (
            <div className="App">
                <TodoList
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForRender}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}

                />
            </div>
        );
    })
    return (
        <div className="App">
            <AddItemForm AddItem={addTodoList}/>
            {todoListComponents}
        </div>
    )
}

export default App;
