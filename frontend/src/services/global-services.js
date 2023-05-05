// import authService from "./auth-service"
import axios from "axios"


class Services {
     getwhoiamDatas = () => axios.get("/whoIam.json").then(res => res.data) 
     getcvDatas = () => axios.get("/cv.json").then(res => res.data)
}

export default new Services()