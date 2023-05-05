import { useReducer, createContext } from 'react'
import Reducer from "./reducers/index";
import defaultState from './default.json'
import GlobalServices from "../services/global-services"

export const Context = createContext()

const Store = ({ children }) => {
    const [ state, dispatch ] = useReducer(Reducer, {...defaultState})

    return (
        <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
    )
}

export default Store