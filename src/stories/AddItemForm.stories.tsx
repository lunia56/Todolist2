import React, {ChangeEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        AddItem: {description: 'Button clicked inside form'},
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    AddItem: action("Button clicked inside form")
};


const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(true)


    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            args.AddItem(trimmedTitle)
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
};
export const AddItemFormWithErrprStory = TemplateWithError.bind({});



