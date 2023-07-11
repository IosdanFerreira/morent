import { combineReducers } from 'redux';

import cartReducer from './cart/slice';
import favoritesReducer from './favorites/slice';

const rootReducer = combineReducers({
  cartReducer,
  favoritesReducer
});

export default rootReducer;