import { createAsyncThunk } from "@reduxjs/toolkit";



export const getProfileInformation = createAsyncThunk(
    'User/GetProfile',
    async token => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch('https://shop.cyberlearn.vn/api/Users/getProfile', options)
        const json = await response.json()

        if (!response.ok) {
            console.log(json.message)
            return Promise.reject(json.message);
        }
        console.log(json)
        return json.content
    }
)

export const editProfileInformation = createAsyncThunk(
    'User/EditProfile',
    async ({ token, profile }) => {
        const response = await fetch('https://shop.cyberlearn.vn/api/Users/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profile)
        })


        const json = await response.json()
        return json.content
    }
)