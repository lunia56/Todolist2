import {v1} from 'uuid';
import {
    ADD_TODOLIST,
    AddTodolistAT,
    REMOVE_TODOLIST,
    RemoveTodolistAT, SetTodolistAT,
    todoListId_1,
    todoListId_2,
    todoListId_3
} from './todolists-reducer';
import {TaskStateType} from '../AppWithRedux';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../store';

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleAT = ReturnType<typeof changeTaskTitleAC>
export type GetTasksAT = ReturnType<typeof SetTasksAC>

export type ActionType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeStatusAT
    | ChangeTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistAT
    | GetTasksAT
const initialState = {
    // [todoListId_1]: [
    //     {id: v1(), title: 'HTML', isDone: true}, // => t
    //     {id: v1(), title: 'CSS', isDone: true}, // => {...t, isDone}
    //     {id: v1(), title: 'JS/TS', isDone: false}, // => t
    // ],
    // [todoListId_2]: [
    //     {id: v1(), title: 'Milk', isDone: true}, // => t
    //     {id: v1(), title: 'chees', isDone: true}, // => {...t, isDone}
    //     {id: v1(), title: 'pancel', isDone: false}, // => t
    // ],
    // [todoListId_3]: [
    //     {id: v1(), title: 'working', isDone: false}, // => t
    //     {id: v1(), title: 'learning', isDone: false}, // => {...t, isDone}
    //     {id: v1(), title: 'relaxation', isDone: true}, // => t
    // ]
}
export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.TaskId)}
        case ADD_TASK:

            // const stateCopy = {...state}
            // const tasks = stateCopy[action.task.todoListId];
            // const newTasks = [action.task, ...tasks];
            // stateCopy[action.task.todoListId] = newTasks;
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};


        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    status: action.status
                } : el)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case REMOVE_TODOLIST:
            // 2 варианта удаления свойства у обьекта
            // let newState = {...state}
            // delete newState[action.todolistId]
            // return newState
            const {[action.todolistId]: [], ...rest} = {...state}
            return rest
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todolistId]: []
            }
        case "SET_TODOS":
            const copyState = {...state}
            action.todolists.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState

        case "SET_TASKS":
            return {...state, [action.todolistId]: action.tasks}

        default:
            return state
    }
}
export const removeTaskAC = (TaskId: string, todolistId: string) => {
    return {type: REMOVE_TASK, TaskId, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: CHANGE_TASK_STATUS, status, taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: ADD_TASK, task} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: CHANGE_TASK_TITLE, title, taskId, todolistId} as const
}

export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET_TASKS", todolistId, tasks} as const
}


export const GetTasksTC = (todolistId: string) => ((dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
        dispatch(SetTasksAC(todolistId, res.data.items))
    })
})

export const DeleteTaskTC = (todolistId: string, taskId: string) => ((dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
})
export const AddTaskTC = (todolistId: string, taskTitle: string) => ((dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, taskTitle).then((res) => {
        const item = res.data.data.item
        dispatch(addTaskAC(item))
    })
})

export const UpdateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) => ((dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().task
    const task = tasks[todolistId].find(el => el.id === taskId)
    if (task) {
        todolistAPI.updateTask(todolistId, taskId, {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then((res) => {
            dispatch(changeTaskStatusAC(taskId,status,todolistId))
        })
    }

})
export const UpdateTaskTitleTC = (todolistId: string, taskId: string, title: string) => ((dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().task
    const task = tasks[todolistId].find(el => el.id === taskId)
    if (task) {
        todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }).then((res) => {
            dispatch(changeTaskTitleAC(taskId,title,todolistId))
        })
    }
})


