import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {combine_reducer} from '../reducer'

const middleware = applyMiddleware(thunk, logger)
export default createStore(combine_reducer, middleware)
