import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "${API_BASE}/a5/assignment"
    const [module, setModule] = useState({
        id: 1, name: "Module 1",
        description: "the first module",
        course: "Web Dev",
    });
    const MODULE_URL = "${API_BASE}/a5/module"
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div>
            <h3>Working With Objects</h3>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button>
            <h4>Modify Module Name</h4>
            <a className="btn btn-secondary" href={`${MODULE_URL}/name/${module.name}`}>
                Update Module Name
            </a>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />
            <h4>Get Module Name</h4>
            <a className="btn btn-primary" href="${API_BASE}/a5/module/name">
                Get Module Name
            </a>
            <h4>Get Module</h4>
            <a className="btn btn-primary" href="${API_BASE}/a5/module">
                Get Module
            </a>
            <h4>Modify Assignment Score</h4>
            <a className="btn btn-secondary" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input type="number"
                onChange={(e) => setAssignment({
                    ...assignment,
                    score: e.target.valueAsNumber
                })}
                value={assignment.score} />
            <h4>Modify Assignment Completed</h4>
            <a className="btn btn-secondary" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <input type="checkbox"
                onChange={(e) => setAssignment({
                    ...assignment,
                    completed: e.target.checked
                })} />
            <h4>Modifying Properties</h4>
            <a className="btn btn-secondary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />
            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary" href="${API_BASE}/a5/assignment">
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary" href="${API_BASE}/a5/assignment/title">
                Get Title
            </a>
        </div>
    );
}
export default WorkingWithObjects;