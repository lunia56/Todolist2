import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
    return (
        <div>
            <TextField variant={'outlined'}
                       size={'small'}
                       color={'primary'}
                       value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownAddItem}
                       label="Title"
                       error={error}
                       helperText={error && "Title is required!"}/>
            <IconButton size={'small'}
                        onClick={onClickAddItem}>
                <AddBoxIcon fontSize={'large'}/>
            </IconButton>

        </div>)
}