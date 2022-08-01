import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {filterValueType} from './App';
import {Button} from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID:string)=>void
    filterTasks:(props:string) => void
    addTask:(newTitle:string)=>void
}

export function Todolist(props: PropsType) {

const [title,setTitle] = useState("")

    const addTaskHandler =() =>{
        props.addTask(title)
        setTitle("")
    }
    const onChangeHandler =(event:ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler =(event:KeyboardEvent<HTMLInputElement>)=>{
       if(event.key=="Enter") {
           addTaskHandler()
       }
        console.log(event.key)
    }

    const tsarFooHandler =(filterValue:filterValueType)=>{
        props.filterTasks(filterValue)
    }
    const removeTaskHandler = (id:string)=>{
        props.removeTask(id)
    }
    return <div>

        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onKeyDown={onKeyPressHandler}
                   onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {

                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={()=>{removeTaskHandler(el.id)}}>X</button>
                    </li>
                )
            })}


        </ul>
        <div>
            <Button callBack={()=>tsarFooHandler("All")} nickName={"All"}/>
            <Button callBack={()=>tsarFooHandler("Active")} nickName={"Active"}/>
            <Button callBack={()=>tsarFooHandler("Completed")} nickName={"Completed"}/>
            {/*<button onClick={()=>tsarFooHandler("All")}>All</button>*/}
            {/*<button onClick={()=>tsarFooHandler("Active")}>Active</button>*/}
            {/*<button onClick={()=>tsarFooHandler("Completed")}>Completed</button>*/}
        </div>
    </div>
}
