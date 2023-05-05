import React from "react";
import { useState } from "react";

export default ({nb}) => {
    return <div className="flex">
        {[
        <div className={"comp" + (nb >= 1?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 2?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 3?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 4?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 5?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 6?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 7?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 8?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 9?" comp-select":"")}></div>,
        <div className={"comp" + (nb >= 10?" comp-select":"")}></div>
        ]}
    </div>
}