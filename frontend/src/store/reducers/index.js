export default ( state, action ) => {
    switch (action.supertype){
        case "SETTHEME":
            return {
                ...state,
                darkTheme: action.value
            }
    }
}