import {combineReducers} from "redux"
import productReducer from "./product/reducer_product"
import softwareReducer from "./software/reducer_software";

const rootReducer= combineReducers({
    product:productReducer,
    softwarte:softwareReducer
})

export default rootReducer;