import React, {ChangeEvent, FC} from 'react';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {TaskStatuses, TaskType} from './api/todolist-api';


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (newTitle: string, id: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses) => void
    removeTask: (taskID: string) => void
    // todoListID: string
}
// *----------------------------------------------------------------------*//


const Task: FC<TaskPropsType> = React.memo(
    ({
         task,
         changeTaskTitle,
         changeTaskStatus,
         removeTask
     }) => {

        let className = task.status === TaskStatuses.Completed ? 'isDone' : ''

        const ChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newIsDoneValue = e.currentTarget.checked
            changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
        }
        const changeTitleTaskHandler = (newTitle: string) => {
            changeTaskTitle(newTitle, task.id)
        }
        const removeTaskHandler = () => removeTask(task.id)


        return (

            <ListItem key={task.id}>
                <Checkbox
                    onChange={ChangeTaskStatusHandler}
                    checked={task.status === TaskStatuses.Completed}
                    color={"primary"}
                />

                <EditableSpan
                    className={className}
                    title={task.title} changeTitle={changeTitleTaskHandler}/>
                {/*<button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>*/}
                <IconButton onClick={removeTaskHandler}
                            size={"small"}
                ><HighlightOffIcon/></IconButton>
            </ListItem>
        )
    })


export default Task;


