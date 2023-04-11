import { tasksReducer,} from './tasks-reducer';
import {TasksStateType} from "../../app/App";
import {TaskPriorities, TaskStatuses, TodolistType} from "../../api/todolists-api";
import {addTaskTC, fetchTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {addTodolistTC, removeTodolistTC} from "./todolists-reducer";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.New,
                todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskTC.fulfilled({taskId: "2", todolistId: "todolistId2"}, '', {
        taskId: "2",
        todolistId: "todolistId2"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const task = {
        todoListId: 'todolistId2',
        title: 'juise',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'new id'
    }
    const action = addTaskTC.fulfilled({task}, '', {todolistId: task.todoListId, title: task.title});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juise");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const updateModel = {taskId: "2", model: {status: TaskStatuses.Completed}, todolistId: "todolistId2"};
    const action = updateTaskTC.fulfilled(updateModel, '', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const updateModel = {taskId: "2", model: {title: "yogurt"}, todolistId: "todolistId2"};
    const action = updateTaskTC.fulfilled(updateModel, '', updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
    let todolist: TodolistType = {
        id: 'todolistId3',
        title: 'new todo',
        addedDate: '',
        order: 0
    }
    const action = addTodolistTC.fulfilled({todolist}, '', todolist.title)


    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({todolistId: "todolistId2"}, '', "todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('tasks should be added for todolist', () => {
    const action = fetchTaskTC.fulfilled({
        tasks: startState["todolistId1"],
        todolistId: "todolistId1"
    }, '', "todolistId1");

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
