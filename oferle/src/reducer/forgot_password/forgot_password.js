import { constant } from "../../config"

var initial_state = {
  email_sent: false

}

export default function reducer(state = initial_state, action) {

  switch (action.type) {
    case constant.redux.frontend_type.forgot_password: {
      return Object.assign({}, state, action.response)
    }

    default: {
      return Object.assign({}, state)
    }

  }

}