import { createSlice } from "@reduxjs/toolkit";
import { getProfileInformation } from "./ProfileThunk";

const initialState = {
    profileDetail: {},
    isLoading: true
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getProfileInformation.pending, (state, action) => {
            //on pending
            console.log('loading profile')
            state.isLoading = true
        }).addCase(getProfileInformation.fulfilled, (state, action) => {
            //on success
            state.profileDetail = action.payload
            state.isLoading = false
        })

    }
})

export const { } = profileSlice.actions
export default profileSlice.reducer