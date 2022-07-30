import { createSlice } from "@reduxjs/toolkit";
import { getProfileInformation, editProfileInformation, changePassword } from "./ProfileThunk";

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
            console.log('Đang lấy thông tin profile...')
            state.isLoading = true
        }).addCase(getProfileInformation.fulfilled, (state, action) => {
            //on success
            console.log('Lấy thông tin profile thành công')
            state.profileDetail = action.payload
            state.isLoading = false
        }).addCase(editProfileInformation.fulfilled, (state, action) => {
            //on success
            console.log('Updated profile thành công')
        }).addCase(changePassword.fulfilled, (state, action) => {
            console.log(`Message: ${action.payload}`)
        })

    }
})

export const { } = profileSlice.actions
export default profileSlice.reducer