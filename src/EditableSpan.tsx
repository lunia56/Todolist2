import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    isDone: boolean
    changeTitleTask: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle( e.currentTarget.value)
    }
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode=()=>{
        setEditMode(false)
        props.changeTitleTask(title)
    }

    return (
        <>
            {editMode
                ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
                : <span onDoubleClick={activateEditMode}
                    className={props.isDone ? 'isDone' : ''}>{props.title}</span>
                }
        </>)
}