import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<any>(null)

    const createTodolist = () => {
        todolistAPI.createTodolist(todolistTitle)
            .then((res) => setState(res.data))
    }
    return <div>
        {JSON.stringify(state)}
        <div><input placeholder={"todolistTitle"} value={todolistTitle}
                    onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>createTodolist</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>deleteTodolist</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<any>(null)


    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"todolistTitle"} value={todolistTitle}
                   onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolistTitle}>updateTodolistTitle</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTasks}>getTasks</button>

    </div>

}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)

    const createTask = () => {
        todolistAPI.createTask(todolistId,taskTitle)
            .then((res) => setState(res.data))
    }
    return <div>
        {JSON.stringify(state)}
        <div><input placeholder={"taskTitle"} value={taskTitle}
                    onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={createTask}>createTask</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId,taskId)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>deleteTask</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)


    const updateTaskTitle = () => {
        todolistAPI.updateTask(todolistId, taskId,taskTitle)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={"taskTitle"} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={updateTaskTitle}>updateTaskTitle</button>
        </div>
    </div>
}