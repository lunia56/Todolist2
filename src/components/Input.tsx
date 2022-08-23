import React, {ChangeEvent} from 'react';
import styles from '../Todolist.module.css';
export type  InputType = {
    isDone:boolean
    callBack: (isDone:boolean)=>void
}
const Input = (props:InputType) => {
    const onChangeHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               checked={props.isDone}
        onChange={onChangeHandler}/>
    );
};

export default Input;