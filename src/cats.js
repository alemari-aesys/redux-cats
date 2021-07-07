import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit'
import axios from "axios";
import defaultImage from "../defaultimage.png";

const fetchCat = createAsyncThunk(
    'fetchCat',
    () => {
        return axios.get("https://api.thecatapi.com/v1/images/search")
        .then((res) => {
            console.log(res);
            return res.data[0].url
        })
    }
  )

const counterSlice = createSlice({
    name: "cats",
    initialState: {
        entities: []
    },
    reducers: {
        // getCat: async cat => {
        //     cat.value = axios.get("https://api.thecatapi.com/v1/images/search")
        //                 .then((res) => res.data[0].url)
        //                 .then(x => x)
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCat.fulfilled, (state, action) => {
            state.entities.push(action.payload);
        })
    }
})

export const { getCat } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

// store.subscribe(() => document.getElementById("").innerHTML = store.getState().value)

store.subscribe(()=> {
                        const { entities } = store.getState();
                        console.log(store.getState());
                        const imagee = document.createElement("img");
                        imagee.setAttribute("src", entities[0])
                        document.getElementById("gatto").appendChild(imagee);
                    })

const button = document.getElementById("js-increment")
                .addEventListener("click", () => {store.dispatch(fetchCat())});

