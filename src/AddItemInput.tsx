import React, {ChangeEvent, useState} from 'react';

export type AddItemInputPropsType = {
    AddItem: (title: string) => void
}

export function AddItemInput(props: AddItemInputPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.AddItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: { key: string }) => e.key === 'Enter' && onClickAddTask()

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickAddTask}>+</button>
            {error && <div style={{color: 'hotpink'}}>Title is required!</div>}
        </div>)
}