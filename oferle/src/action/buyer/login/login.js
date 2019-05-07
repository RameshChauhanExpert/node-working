import { constant } from "../../../config/constant"
export var buyer_login = (state) => {

    return (dispatch, getState) => {
        if (getState().login_component.email.trim() == "" && getState().login_component.password.trim() == "") {

            dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: constant.error.user_name_password_not_match } } })
        } else {

            dispatch({ type: "loader", response: { loader: true, snackbar: { show: false, message: "" } } })
            fetch(constant.base_url + constant.server_url.buyer_login, {
            // fetch('http://192.168.1.154/offerlane/server' + constant.server_url.buyer_login, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: "Data=" + JSON.stringify({ email: getState().login_component.email, password: getState().login_component.password })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.status == 200) {
                        dispatch({ type: constant.redux.frontend_type.front_end_login, response: response })
                        dispatch({ type: constant.redux.frontend_type.user_section_login, response: response })
                        dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })

                    }
                    else if (response.status == 401) {
                        dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: constant.error.user_name_password_not_match } } })
                        setTimeout(function () {
                            dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                        }, 3000)
                    }
                    else {
                        dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: constant.error.api_error } } })
                        setTimeout(function () {
                            dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                        }, 3000)
                    }

                })
                .catch(data => {
                    dispatch({ type: "loader", response: { loader: false, snackbar: { show: true, message: constant.error.api_error } } })
                    setTimeout(function () {
                        dispatch({ type: "loader", response: { loader: false, snackbar: { show: false, message: "" } } })
                    }, 3000)

                })
        }
    }
}




