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
import Task from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

// *----------------------------------------------------------------------*//
type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (newTitle: string, todoListID: string, id: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}


const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.task[props.todoListID])

    let tasksForRender = tasks;
    // switch (props.filter) {
    //     case 'completed':
    //         tasksForRender = tasks.filter(task => task.isDone)
    //         break
    //     case 'active':
    //         tasksForRender = tasks.filter(task => !task.isDone)
    //         break
    //     default:
    //         break
    // }
    if (props.filter === 'completed') {
        tasksForRender = tasks.filter(task => task.isDone)
    }
    if (props.filter === 'active') {
        tasksForRender = tasks.filter(task => !task.isDone)
    }


    const AddTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID])


    const onClickSetFilterCreator = useCallback((filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID), [props.todoListID])
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListID)
    }, [props.changeTodoListTitle])


    const ChangeTaskStatus = useCallback((taskId:string, status:boolean) => props.changeTaskStatus(taskId, status,props.todoListID),[props.changeTaskStatus,props.todoListID])

    const changeTitleTask = useCallback((taskId:string, newTitle: string,) => {
        props.changeTaskTitle(newTitle, props.todoListID, taskId)
    },[props.changeTaskTitle,props.todoListID])

    const removeTask = useCallback((taskId:string) => props.removeTask(taskId , props.todoListID),[props.removeTask,props.todoListID])


    const tasksItems = tasksForRender.length ? tasksForRender.map((task: TaskType) => {
          return  <Task
                key={task.id}
                task={task}
                changeTaskTitle={changeTitleTask}
                changeTaskStatus={ChangeTaskStatus}
                removeTask={removeTask}
                // todoListID={props.todoListID}
          />
        })


        : <span>TaskList is empty</span>

    //         let className = task.isDone ? 'isDone' : ''
    //
    //         const ChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
    //
    //         const changeTitleTask = (newTitle: string) => {
    //             props.changeTaskTitle(newTitle, props.todoListID, task.id)
    //         }
    //         const removeTask = () => props.removeTask(task.id, props.todoListID)
    //
    //         return (
    //
    //             <ListItem key={task.id}>
    //                 <Checkbox
    //                     onChange={ChangeTaskStatus}
    //                     checked={task.isDone}
    //                     color={"primary"}
    //                 />
    //                 {/*<input*/}
    //                 {/*    onChange={ChangeTaskStatus}*/}
    //                 {/*    type="checkbox"*/}
    //                 {/*    checked={task.isDone}/>*/}
    //
    //                 <EditableSpan className={className} title={task.title} changeTitle={changeTitleTask}/>
    //                 {/*<button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>*/}
    //                 <IconButton onClick={removeTask}
    //                             size={"small"}
    //                 ><HighlightOffIcon/></IconButton>
    //             </ListItem>
    //         )
    //     })
    //


    return (
        <div>
            <Typography variant={"h6"} align={"center"} paragraph>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                {/*<Button*/}
                {/*    onClick={removeTodoList}>X*/}
                {/*</Button>*/}
                <IconButton onClick={removeTodoList} size={"small"}><HighlightOffIcon/></IconButton>
            </Typography>
            <AddItemForm AddItem={AddTask}/>
            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup variant="contained" size="small"
                             disableElevation
                >
                    <Button
                        color={props.filter === 'all' ? 'primary' : 'secondary'}
                        onClick={onClickSetFilterCreator('all')}
                    >All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? 'primary' : 'secondary'}
                        onClick={onClickSetFilterCreator('active')}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? 'primary' : 'secondary'}
                        onClick={onClickSetFilterCreator('completed')}
                    >Completed
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    )
});

export default TodoList;


