import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: "bahjoi",
    cityArray: [
        "ghaziabad",
        "delhi",
        "mumbai",
        "kolkata",
    ],
    };

const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        updateCity(state, action) {
            state.city = action.payload;
        },
        addCity(state, action) {
            state.cityArray.push(action.payload);
        },
        removeCity(state, action) {
            state.cityArray = state.cityArray.filter((city) => city !== action.payload);
        },
    },
});

export const { updateCity, addCity, removeCity } = citySlice.actions;

export default citySlice.reducer;