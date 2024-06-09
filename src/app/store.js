import {combineReducers, configureStore} from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import cityReducer from '../features/citySlice';

const rootReducer = combineReducers({
    theme: themeReducer,
    city: cityReducer,
});


const store = configureStore({
    reducer: rootReducer,
});
export default store;