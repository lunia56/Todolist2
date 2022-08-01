import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterValueType = 'All' | 'Active' | 'Completed'


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},//0
        {id: v1(), title: 'JS', isDone: true},//1
        {id: v1(), title: 'ReactJS', isDone: false},//2
        {id: v1(), title: 'Postman', isDone: false}
    ])
    let [filter, setFilter] = useState('all')


    const addTask = (newTitle:string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}//0
        setTasks([newTask,...tasks])

    }


    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((el) => el.id !== taskID))
        // console.log()
    }
    const filterTasks = (filterValue: string) => {
        setFilter(filterValue)
    }


    let filteredTasks = tasks
    if (filter == 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter == 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
