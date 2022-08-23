import React, {ChangeEvent, useState} from 'react';

export type AddItemFormPropsType = {
    AddItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const onClickAddItem = () => {
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
    const onKeyDownAddItem = (e: { key: string }) => e.key === 'Enter' && onClickAddItem()
    const inputErrorClass = error ? 'error' : '';
    const errorMessage = <div style={{color: 'hotpink'}}>Title is required!</div>
    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                className={inputErrorClass}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && errorMessage}
        </div>)
}