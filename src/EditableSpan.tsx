import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    className?: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)
    console.log("EditableSpan",title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && activateViewMode()
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(title)

    }

    return (
        <>
            {editMode
                ? <TextField value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                             onBlur={activateViewMode} autoFocus/>

                // <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={activateViewMode}
                //        autoFocus/>
                : <span onDoubleClick={activateEditMode}
                    className={props.className}>{props.title}</span>
                }
                </>)
            })