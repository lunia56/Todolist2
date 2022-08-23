import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    className?: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle( e.currentTarget.value)
    }
    const onKeyDownHandler=(e: KeyboardEvent<HTMLInputElement>) =>{
        e.key === 'Enter' && activateViewMode()
    }
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode=()=>{
        setEditMode(false)
        props.changeTitle(title)
    }

    return (
        <>
            {editMode
                ? <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={activateViewMode} autoFocus/>
                : <span onDoubleClick={activateEditMode}
                    className={props.className}>{props.title}</span>
                }
        </>)
}