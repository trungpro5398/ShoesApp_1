import { createAsyncThunk } from "@reduxjs/toolkit";

export const placeOrder = createAsyncThunk(
    'Users/Order',
    async product => {
        const response = await fetch("https://shop.cyberlearn.vn/api/Users/order", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await response.json();
        if (!response.ok) {
            return Promise.reject(data.message)
        }
        return data.content;
    }
)