import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
    .then((res)=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("what to learn")
            .then((res)=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

const todolistId = "10718fcf-aa2c-40ab-95be-a510a874d3de"
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolistTitle(todolistId,"React>>>>>>>!!!!!")
    .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
