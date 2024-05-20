import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";

import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const modulesList = moduleList.filter((module) => module.course === courseId);
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    return (
        <ul className="list-group wd-modules" style={{ width: 900 }}>
            <li className="list-group-item">
                <div className="flex">
                    <div className="p-3">
                        <input className="list-group-item" value={module.name}
                            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))
                            } />
                        <br />
                        <textarea className="list-group-item" value={module.description}
                            onChange={(e) =>
                                dispatch(setModule({ ...module, description: e.target.value }))
                            } />
                        <br />
                        <button className="btn btn-success"
                            onClick={handleAddModule}>
                            Add
                        </button>
                        <button
                            className="btn btn-secondary"
                            style={{ marginLeft: 10 }}
                            onClick={handleUpdateModule}>
                            Update
                        </button>

                    </div>
                </div>
            </li>
            {moduleList
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item d-flex" >
                        <div className="p-2" style={{ width: 400 }}>
                            <h3>{module.name}</h3>
                            <p>{module.description}</p>
                            <p>{module._id}</p>
                        </div>
                        <div className="buttons p-2" style={{ marginLeft: 190, float: "right" }}>
                            <button
                                className="btn btn-primary"
                                onClick={() => dispatch(setModule(module))}>
                                Edit
                            </button>

                            <button
                                className="btn btn-danger"
                                style={{ marginLeft: 10 }}
                                onClick={() => handleDeleteModule(module._id)}>
                                Delete
                            </button>
                        </div>
                    </li>))}
        </ul>
    );
}
export default ModuleList;

// import React, { useState } from "react";
// import "./index.css";
// import db from "../../Database";
// import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
// import { useParams } from "react-router";
// function ModuleList() {
//     const { courseId } = useParams();
//     const modules = db.modules;
// const [moduleList, setModuleList] = useState<any[]>(modules);
// const modulesList = modules.filter((module) => module.course === courseId);
// const [selectedModule, setSelectedModule] = useState(modulesList[0]);
//     const [module, setModule] = useState({
//         name: "New Module",
//         description: "New Description",
//         course: courseId,
//         _id: "id",
//     });
//     const addModule = (module: any) => {
//         const newModule = {
//             ...module,
//             _id: new Date().getTime().toString()
//         };
//         const newModuleList = [newModule, ...moduleList];
//         setModuleList(newModuleList);
//     };
//     const deleteModule = (moduleId: string) => {
//         const newModuleList = moduleList.filter(
//             (module) => module._id !== moduleId);
//         setModuleList(newModuleList);
//     };
//     const updateModule = () => {
//         const newModuleList = moduleList.map((m) => {
//             if (m._id === module._id) {
//                 return module;
//             } else {
//                 return m;
//             }
//         });
//         setModuleList(newModuleList);
//     };


//     return (
//         <>
//             {/* <!-- Add buttons here --> */}
// <ul className="list-group wd-modules">
//     <li className="list-group-item">
//         <div className="flex">
//             <div className="p-3">
//                 <input className="list-group-item" value={module.name}
//                     onChange={(e) => setModule({
//                         ...module, name: e.target.value
//                     })}
//                 />
//                 <br />
//                 <textarea className="list-group-item" value={module.description}
//                     onChange={(e) => setModule({
//                         ...module, description: e.target.value
//                     })}
//                 />
//                 <br />
//                 <button className="btn btn-success" onClick={() => { addModule(module) }}>
//                     Add
//                 </button>
//                 <button
//                     className="btn btn-secondary"
//                     style={{ marginLeft: 10 }}
//                     onClick={updateModule}>
//                     Update
//                 </button>

//             </div>
//         </div>
//     </li>

//                 {/* <li className="list-group-item">
//                     <div className="d-flex">
//                         <div className="p-2">
//                             <input className="list-group-item" value={module.name}
//                                 onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))
//                                 } /> <br />
//                             <textarea className="list-group-item" value={module.description}
//                                 onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))
//                                 } />
//                         </div>
//                         <div className="buttons p-2" style={{ marginLeft: 350 }}>
//                             <button className="btn btn-primary" onClick={() => dispatch(updateModule(module))}>

//                                 Update
//                             </button>
//                             &nbsp;&nbsp;
//                             <button className="btn btn-success" onClick={() => dispatch(addModule({ ...module, course: courseId }))}>

//                                 Add</button>
//                         </div>
//                     </div>
//                 </li> */}

// {modulesList
//     .filter((module) => module.course === courseId)
//     .map((module, index) => (
//         <li key={index}
//             className="list-group-item"
//             onClick={() => setSelectedModule(module)}>
//             <div>
//                 <FaEllipsisV className="me-2" />
//                 {module.name}
//                 <button
//                     className="btn btn-primary"
//                     onClick={(event) => { setModule(module); }}>
//                     Edit
//                 </button>

//                 <button
//                     className="btn btn-danger"
//                     style={{ marginLeft: 10 }}
//                     onClick={() => deleteModule(module._id)}>
//                     Delete
//                 </button>
//                 <span className="float-end">
//                     <FaCheckCircle className="text-success" />
//                     <FaPlusCircle className="ms-2" />
//                     <FaEllipsisV className="ms-2" />
//                 </span>
//             </div>
//             {selectedModule._id === module._id && (
//                 <ul className="list-group">
//                     {module.lessons?.map((lesson, index) => (
//                         <li className="list-group-item" key={index}>
//                             <FaEllipsisV className="me-2" />
//                             {lesson.name}
//                             <span className="float-end">
//                                 <FaCheckCircle className="text-success" />
//                                 <FaEllipsisV className="ms-2" />
//                             </span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </li>
//     ))}
//             </ul>
//         </>
//     );
// }
// export default ModuleList;