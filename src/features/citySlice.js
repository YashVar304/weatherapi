import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    cityArray: [
        "ghaziabad",
        "noida",
        "delhi",
        "mumbai",
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
            const cityExists = state.cityArray.some(city => city === action.payload);

    // If the city does not exist, add it to the cityArray
    if (!cityExists) {
        state.cityArray.push(action.payload);
    }
        },
        removeCity(state, action) {
            state.cityArray = state.cityArray.filter((city) => city !== action.payload);
        },
    },
});

export const { updateCity, addCity, removeCity } = citySlice.actions;

export default citySlice.reducer;