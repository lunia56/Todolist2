import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Task, {TaskType} from '../Task';
import {action} from '@storybook/addon-actions';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskTitle: action("changeTaskTitle"),
        changeTaskStatus: action("changeTaskStatus"),
        removeTask: action("removeTask"),
        task: {id: "qwerty", title: "QWERTY", isDone: true}
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TemplateTask: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoryIsDone = TemplateTask.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


export const TaskStoryNotIsDone = TemplateTask.bind({});
TaskStoryNotIsDone.args = {
    task: {id: "qwerty", title: "QWERTY", isDone: false},

};