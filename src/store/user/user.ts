import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { User } from '@supabase/supabase-js';

export interface IUserSlice {
  user:User|null
}
const initialState: IUserSlice = {
 user:null
};

export const htmlSlice: Slice<IUserSlice> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action:PayloadAction<User>)=>{
        state.user = action.payload
    }
  }
});
export const { actions: userActions, reducer: userReducer } = htmlSlice;
