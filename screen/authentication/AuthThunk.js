import { createAsyncThunk } from "@reduxjs/toolkit";

export const callLogin = createAsyncThunk(
    'User/login',
    async(user) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        
        const res = await fetch("http://svcy3.myclass.vn/api/Users/signin",options)
        const json = await res.json()

        //Catch login failed
        if (!res.ok) {
            return Promise.reject(json.message);
        }

        
        console.log(json.message)
        return json.content

    }
)