import { createSlice } from "@reduxjs/toolkit";
import { KEY_LOCAL_TOKEN } from "../../common/Constant";
import { saveLocalStorage, getLocalStorage } from "../../common/LocalStorage";

import { callLogin } from "./AuthThunk";

const initialState = {
    loginStatus: false,
    accessToken: "empty"
}


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },

    },
    extraReducers: (builder) => {
        //Only call when login or token is expired
        builder.addCase(callLogin.fulfilled,(state,action) => { // On success
            let token = action.payload.accessToken
            saveLocalStorage(KEY_LOCAL_TOKEN,token)
            state.accessToken = token

        }).addCase(callLogin.rejected,(state,action) => { // When login failed
            console.log(action.error)
        })
    }
})

export const {setAccessToken} = authSlice.actions
export default authSlice.reducer