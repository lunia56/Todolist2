import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2d4dfcef-1677-495e-b268-58032de893b0',
    },
})
export const todolistAPI = {
    getTodolist(){
        return instance
            .get<Array<TodolistType>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/`)
    },
    createTodolist(title:string){
        return instance
            .post<ResponseType<{item:TodolistType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/`,{title:title})
    },
    deleteTodolist(todolistId:string){
        return instance
            .delete<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`)
    },

    updateTodolistTitle (todolistId:string,title:string){
       return instance
           .put<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title:title})
    },
    getTask (todolistId:string){
        return instance
            .get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,taskTitle:string){
        return instance
            .post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,{title:taskTitle})
    },
    deleteTask(todolistId:string,taskId:string){
        return instance
            .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId:string,taskId:string,taskTitle:string){
        return instance
            .put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {title:taskTitle})
    }
}
