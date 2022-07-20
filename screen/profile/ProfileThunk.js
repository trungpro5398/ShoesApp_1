import { createAsyncThunk } from "@reduxjs/toolkit";

import { KEY_LOCAL_TOKEN } from "../../common/Constant";
import { useSelector, useDispatch } from "react-redux";


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