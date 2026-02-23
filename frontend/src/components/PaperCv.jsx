import React, { useState, useEffect, useCallback } from "react"
import Comp from "./utils/Comp"
import globalServices from "../services/global-services";

export default ({}) => {
    const [datas, setdatas] = useState(false)
    const load = useCallback(async ()=>{
        console.log('exe')
        setdatas(await globalServices.getcvDatas())
        console.log(datas)

    }, [])
    useEffect(()=>{
        load()
    },[])

    return datas?<div className="papercv w-[100vw] h-[100vh] flex">
        {datas.map((page, index) => {
            console.log(page, index)
            if(index == 0){
                return <div className="header bg-blue-50 w-72">
                    <h1 className="font-bold text-center">VIDALOT Victor</h1>
                    <h3 className="text-center m-2">Recherche une alternance de 2 ans en mécatronique – 2 jrs école / 3 jrs entreprise</h3>
                    <img src="./images/screenshot.jpg" className=" w-3/4 m-auto"/>

                    {
                        page.map(section => {
                            var lst = []
                            for (const key in section){
                                if(key === "title") lst.push(<h1 key={section[key]}>{section[key]}</h1>)
                                else if(key === "images") lst.push(
                                    <div className="flex flex-wrap justify-around">
                                        {section[key].map((val) => <img key={val} src={val} className="w-16 h-16 m-2" />)}
                                    </div>
                                )
                                else {
                                    lst.push(<h2 key={key}>{key}</h2>)
                                    if(section[key] != null) lst.push(<h3 key={key + section[key]}>{(typeof section[key] == "string")?section[key]: <Comp nb={section[key]}/>}</h3>)
                                }
                            }
                            return lst
                        })
                    }
                </div>
            } else if (index == 1){

                return <div className="bodyer w-full m-4">
                    <h1 className="font-bold text-center text-xl">{datas[2][0]}</h1>
                    <p>{datas[2][1]}</p>

                    {
                        page.map(section => {
                            var lst = []

                            for (const key in section){
                                if(key === "title") lst.push(
                                        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                            <p className="text-center font-bold text-xl mx-4 mb-0">{section["title"]}</p>
                                        </div>
                                    )

                                else if(key == "link") continue;

                                else {
                                    section["datas"].map(key2 => {
                                        lst.push(<div className="flex mt-4">
                                            <div className="w-28">{key2["year"]?key2["year"]:""}</div>
                                            <div className="w-full">
                                                {key2["title"]? <h1 className="font-semibold">{key2["title"]}</h1>: null}
                                                <ul style={{listStyleType: 'circle'}}>
                                                    {
                                                        key2["list"].map(subtitle => {
                                                            if (section["link"] === true) {
                                                                return <li style={{color: "blue"}}>{<a href={subtitle[1]}>{subtitle[0]}</a>}</li>
                                                            }
                                                            else {
                                                                return <li>{subtitle}</li>
                                                            }
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>)
                                    })
                                }
                            }
                            return lst
                        })
                    }

                </div>
            }
        })}
    </div>: <div>Loading...</div>
}