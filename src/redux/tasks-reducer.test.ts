import {
    AddTodolistAC,
} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskStateType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be removed', () => {
    let todolistId1 = v1();

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "0", title: 'HTML', isDone: true}, // => t
            {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
            {id: "2", title: 'JS/TS', isDone: false}, // => t
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC("2",todolistId1))

    expect(endState[todolistId1][1].id).toBe("1");
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe('HTML');
    // expect(endState[0].).toBe(todolistId2);
});

test('correct task should be added', () => {
    let todolistId1 = v1();

    let newTaskTitle = "New Task";

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "0", title: 'HTML', isDone: true}, // => t
            {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
            {id: "2", title: 'JS/TS', isDone: false}, // => t
        ]
    }

    const endState = tasksReducer(startState, addTaskAC(newTaskTitle,todolistId1))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe(newTaskTitle);
});

test('correct task should change its name', () => {
    let todolistId1 = v1();

    let newTaskTitle = "New Task title";

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "0", title: 'HTML', isDone: true}, // => t
            {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
            {id: "2", title: 'JS/TS', isDone: false}, // => t
        ]
    }
    const endState = tasksReducer(startState, changeTaskTitleAC("2",newTaskTitle,todolistId1));

    expect(endState[todolistId1][2].title).toBe(newTaskTitle);
});

test('correct status of task should be changed', () => {
    let todolistId1 = v1();

    let isDone = false;

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "0", title: 'HTML', isDone: true}, // => t
            {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
            {id: "2", title: 'JS/TS', isDone: false}, // => t
        ]
    }


    const endState = tasksReducer(startState, changeTaskStatusAC("1",isDone, todolistId1));

    expect(endState[todolistId1][1].isDone).toBe(isDone);
});

test('new property with new array should be added when new todolist is added', () => {
    let todolistId1 = v1();
    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "0", title: 'HTML', isDone: true}, // => t
            {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
            {id: "2", title: 'JS/TS', isDone: false}, // => t
        ]
    }


    const endState = tasksReducer(startState, AddTodolistAC("new Title"));

    const keys = Object.keys(endState)
    const newKey = keys.find(el=>el!==todolistId1);
    if(!newKey){
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(2);
    expect(endState[newKey]).toEqual([]);
});



