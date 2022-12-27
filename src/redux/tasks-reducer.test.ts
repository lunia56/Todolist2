import {
    AddTodolistAC,
} from './todolists-reducer';
import {v1} from 'uuid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskStateType} from '../AppWithRedux';

// test('correct task should be removed', () => {
//     let todolistId1 = v1();
//
//     const startState: TaskStateType = {
//         [todolistId1]: [
//
//             { id: "f693981c-30b6-4ae0-b06a-39608bd8db8b",
//                 title: "dsd",
//                 description: null,
//                 todoListId: "b04a5a79-720d-4acf-8065-3540aabdada5",
//                 order: -2,
//                 status: 0,
//                 priority: 1,
//                 startDate: null,
//                 deadline: null,
//                 addedDate: "2022-12-26T11:29:08.187"},
//             { id: "99a0e039-0f32-42c1-af54-0794fae006f1",
//                 title: "asdsad",
//                 description: null,
//                 todoListId: "b04a5a79-720d-4acf-8065-3540aabdada5",
//                 order: -3,
//                 status: 0,
//                 priority: 1,
//                 startDate: null,
//                 deadline: null,
//                 addedDate: "2022-12-26T11:29:11.407"},
//         ]
//     }
//
//     const endState = tasksReducer(startState, removeTaskAC("f693981c-30b6-4ae0-b06a-39608bd8db8b",todolistId1))
//
//     expect(endState[todolistId1][1].id).toBe("1");
//     expect(endState[todolistId1].length).toBe(2);
//     expect(endState[todolistId1][0].title).toBe('HTML');
// });
//
// test('correct task should be added', () => {
//     let todolistId1 = v1();
//
//     let newTaskTitle = "New Task";
//
//     const startState: TaskStateType = {
//         [todolistId1]: [
//             {id: "0", title: 'HTML', isDone: true}, // => t
//             {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
//             {id: "2", title: 'JS/TS', isDone: false}, // => t
//         ]
//     }
//
//     const endState = tasksReducer(startState, addTaskAC(newTaskTitle,todolistId1))
//
//     expect(endState[todolistId1].length).toBe(4);
//     expect(endState[todolistId1][0].title).toBe(newTaskTitle);
// });
//
// test('correct task should change its name', () => {
//     let todolistId1 = v1();
//
//     let newTaskTitle = "New Task title";
//
//     const startState: TaskStateType = {
//         [todolistId1]: [
//             {id: "0", title: 'HTML', isDone: true}, // => t
//             {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
//             {id: "2", title: 'JS/TS', isDone: false}, // => t
//         ]
//     }
//     const endState = tasksReducer(startState, changeTaskTitleAC("2",newTaskTitle,todolistId1));
//
//     expect(endState[todolistId1][2].title).toBe(newTaskTitle);
// });
//
// test('correct status of task should be changed', () => {
//     let todolistId1 = v1();
//
//     let isDone = false;
//
//     const startState: TaskStateType = {
//         [todolistId1]: [
//             {id: "0", title: 'HTML', isDone: true}, // => t
//             {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
//             {id: "2", title: 'JS/TS', isDone: false}, // => t
//         ]
//     }
//
//
//     const endState = tasksReducer(startState, changeTaskStatusAC("1",isDone, todolistId1));
//
//     expect(endState[todolistId1][1].isDone).toBe(isDone);
// });
//
// test('new property with new array should be added when new todolist is added', () => {
//     let todolistId1 = v1();
//     const startState: TaskStateType = {
//         [todolistId1]: [
//             {id: "0", title: 'HTML', isDone: true}, // => t
//             {id: "1", title: 'CSS', isDone: true}, // => {...t, isDone}
//             {id: "2", title: 'JS/TS', isDone: false}, // => t
//         ]
//     }
//
//
//     const endState = tasksReducer(startState, AddTodolistAC("new Title"));
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(el=>el!==todolistId1);
//     if(!newKey){
//         throw Error("new key should be added")
//     }
//     expect(keys.length).toBe(2);
//     expect(endState[newKey]).toEqual([]);
// });
//
//

