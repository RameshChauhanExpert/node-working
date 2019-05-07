import { constant } from "../../../config/index"
import { seller_detail } from "../../index"
export var buyer_signup = (state) => {

    return dispatch => {
        dispatch({ type: "loader", response: { loader: true, snackbar: { show: false, message: "" } } })
        fetch(constant.base_url + constant.server_url.buyer_signup, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: "Data=" + JSON.stringify(state)
        })
            .then(res => res.json())
            .then(response => {
                if (response.status == 200) {

                    dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                    dispatch(seller_detail(response.data.last_id))
                    dispatch({ type: "sign_up_success", response })
                } else if (response.status == 401) {
                    dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: response.message } } })
                    setTimeout(function () {
                        dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                    }, 3000)
                } else {
                    dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: constant.error.api_error } } })
                    setTimeout(function () {
                        dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                    }, 3000)
                }

            })
            .catch(err => {
                dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: constant.error.api_error } } })
                setTimeout(function () {
                    dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                }, 3000)
            })
    }



}


export var buyer_signup_state_update = (state) => {


    console.log(state)
}


export var signup_validate = () => {

}