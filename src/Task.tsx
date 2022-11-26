import React, {ChangeEvent, FC, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@material-ui/core/Button';
import {ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStateType} from "./AppWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (newTitle: string, id: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
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
        console.log("Task", task)

        let className = task.isDone ? 'isDone' : ''

        const ChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)


        const changeTitleTaskHandler = (newTitle: string) => {
            changeTaskTitle(newTitle,  task.id)
        }


        const removeTaskHandler = () => removeTask(task.id)


        return (

            <ListItem key={task.id}>
                <Checkbox
                    onChange={ChangeTaskStatusHandler}
                    checked={task.isDone}
                    color={"primary"}
                />

                <EditableSpan className={className} title={task.title} changeTitle={changeTitleTaskHandler}/>
                {/*<button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>*/}
                <IconButton onClick={removeTaskHandler}
                            size={"small"}
                ><HighlightOffIcon/></IconButton>
            </ListItem>
        )
    })


export default Task;


