import React from "react"
import authService from "../services/auth-service"
import { Navigate } from "react-router"

export default ({ children }) => {
    if(authService.isAuthentificated()){
        return children
    } else {
        return <Navigate to="/login" />
    }
}