import React from "react";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";

function Assignment4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <>
            <h1>Assignment 4</h1>
            <br />
            <br />
            <br />
            <br />
            <ReduxExamples />
            <br />
            <ParentStateComponent />
            <br />
            <ArrayStateVariable />
            <br />
            <ObjectStateVariable />
            <br />
            <DateStateVariable />
            <br />
            <StringStateVariables />
            <br />
            <BooleanStateVariables />
            <br />
            <Counter />
            <br />
            <EventObject />
            <br />
            <PassingFunctions theFunction={sayHello} />
            <br />
            <PassingDataOnEvent />
            <br />
            <ClickEvent />
        </>
    );
};
export default Assignment4;