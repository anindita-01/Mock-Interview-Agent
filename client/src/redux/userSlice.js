import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData: null,
        authLoaded: false
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload

        },
        setAuthLoaded:(state,action)=>{
            state.authLoaded = action.payload
        }
    }
})

export const {setUserData, setAuthLoaded} = userSlice.actions

export default userSlice.reducer
