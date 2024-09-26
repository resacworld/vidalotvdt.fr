import React, { useCallback, useEffect, useState, useContext } from "react"
import globalServices from "../services/global-services";
import { HashLink } from 'react-router-hash-link';
import { Context } from "../store/index"

export default ({}) => {
    const [ state, dispatch ] = useContext(Context)
    const [datas, setdatas] = useState(false)
    const load = useCallback(async ()=>{
        console.log('exe')
        setdatas(await globalServices.getwhoiamDatas())
    }, [])
    useEffect(()=>{
        load()
    },[])

    return datas?(<div className="dark:text-slate-300">
        <ul className={"WhoIam-navbar overflow-y-scroll max-lg:hidden"  + (state.darkTheme?" dark-scrollbar":"")}>
            <li className="navbar-item shadow-sm bg-white dark:bg-slate-700 text-center">
                <div className="mx-12"><img className="w-48 rounded-md" src="./images/screenshot.jpg" /></div> 
                <h1 className="font-bold text-2xl" >Vidalot Victor</h1>
                <div className="flex w-full justify-center">
                    <div className="checkbox-rect2">
                        <input defaultChecked={state.darkTheme} onChange={(e)=>dispatch({supertype: "SETTHEME", value: e.target.checked})} type="checkbox" id="checkbox-rect2" name="check" />
                        <label htmlFor="checkbox-rect2">Dark theme</label>
                    </div>
                </div>
            </li>

            {datas.map(creation => {
                return <li className={"navbar-item " + (creation.title?"text-center shadow-sm bg-white dark:bg-slate-700":"bg-gray-50 dark:bg-dark")} key={creation.name}>
                    <HashLink
                    smooth
                    className={"font-medium" + (creation.title?" text-lg font-bold place-self-center":"")}
                    to={"#" + creation.name}
                    >{creation.name}</HashLink>
                    {creation.title?null:<ul className="sectionbox ml-10">
                        {creation.sections.map(section => {
                            return <li className="section" key={section.name}>
                                <HashLink
                                smooth
                                to={"#" + section.name}
                                >{section.name}</HashLink>
                            </li>
                        })}
                    </ul>}
                </li>
            })}
        </ul>
        <div className={"bg-gray-100 dark:bg-gray-500 lg:fixed left-80 top-0 bottom-0 right-0 overflow-y-scroll scrollbar-1" + (state.darkTheme?" dark-scrollbar":"")}>
            {datas.map(creation => {
                return <React.Fragment key={creation.name}>
                    <div className={"p-2 m-1 rounded-md text-center font-bold text-lg " + (creation.title?"text-xl my-3 py-4 bg-gray-300 dark:bg-slate-700":"bg-light-secondary dark:bg-dark")} id={creation.name}>
                        <h2>{creation.name}</h2>
                    </div>
                    <ul className="flex flex-wrap mx-3 justify-center">
                        {creation.title?null:creation.sections.map(section => {
                            section.vid = section.vid?section.vid:[]
                            section.img = section.img?section.img:[]
                            return <li className={"bg-white dark:bg-dark-secondary mx-1 mt-2 px-2 pt-2 pb-1 rounded-md " + (section.img?"flex flex-wrap justify-between":"md:max-w-[48%]") + ((section.img.length + section.vid.length) > 1?"":" md:max-w-[48%]")} id={section.name} key={section.name}>
                                <div className="text-center mb-2">
                                    <h2 className="text-lg m-2 font-medium">{section.name}</h2>
                                    {section.description?<p style={{wordBreak: "break-word"}}>{section.description}</p>:null}
                                </div>
                                {section.img && section.img.length>0 &&
                                section.img.map((path, index) => {
                                    return <img key={index} className={"w-96 mb-1 mx-auto rounded-md " + (section.screenshot?"lg:hidden":"")} src={"./images/"+path} />
                                })}
                                {section.vid && section.vid.length>0 &&
                                section.vid.map((path, index) => {
                                    return <video key={index} controls className="w-96 mb-1 mx-auto rounded-md" src={"./images/"+path}></video>
                                })}
                                {/* Cration de bouton selon fichier json dans lequel tout les textes et images y figurent */}
                                {section.button && section.button.map((btn, index) => {
                                    return <a key={index} className="w-full bg-slate-50 dark:bg-slate-600 p-1 text-center font-medium text-lg mb-1 rounded-md shadow-md hover:bg-slate-200 hover:dark:bg-slate-400" href={btn.path}>{btn.name}</a>
                                })}
                            </li>
                        })}
                    </ul>
                </React.Fragment>
            })}
            <div className="p-2">
                <h2 className="font-light text-center text-black black:text-white">	&#169; 2024 <a href="https://vidalotvdt.fr/" className="hover:underline">VIDALOTVDT&#8482;</a>. All Rights Reserved. </h2>
            </div>
        </div>
    </div>): (<div className="text-center font-medium text-lg rounded-lg p-7 min-w-[200px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-light dark:bg-dark dark:text-slate-400">
        Loading datas...
    </div>)
}