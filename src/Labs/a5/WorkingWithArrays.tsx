import React, { useState } from "react";
function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    return (
        <div>
            <h3>Working with Arrays</h3>
            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo, id: parseInt(e.target.value)
                })} />
            <input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />
            <input type="checkbox"
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked
                })} />
            <input type="text" value={todo.description}
                onChange={(e) => setTodo({
                    ...todo, description: e.target.value
                })} />

            <h3>Updating an Item in an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>
            <br />
            <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`} >
                Update Completed to {todo.completed}
            </a>
            <br />
            <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`} >
                Update Description to {todo.description}
            </a>
            <h4>Retrieving Arrays</h4>
            <a className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <h4>Retrieving an Item from an Array by ID</h4>
            <input value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: parseInt(e.target.value)
                })} />
            <a className="btn btn-primary" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <h3>Filtering Array Items</h3>
            <a className="btn btn-primary" href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <h3>Creating new Items in an Array</h3>
            <a className="btn btn-primary" href={`${API}/create`}>
                Create Todo
            </a>
            <h3>Deleting from an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
        </div>
    );
}
export default WorkingWithArrays;