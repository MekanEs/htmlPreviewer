import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { User } from '@supabase/supabase-js';
import { LS_ACCESSTOKEN } from '../../constants';

export interface IUserSlice {
  user: User | null,
  user_accessToken: string | null,
  isAuth: boolean
}
const initialState: IUserSlice = {
  user: null,
  user_accessToken: localStorage.getItem(LS_ACCESSTOKEN) || null,
  isAuth: false
};

export const htmlSlice: Slice<IUserSlice> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.user_accessToken = action.payload
      localStorage.setItem(LS_ACCESSTOKEN, action.payload)
    },
    setAuth: (state) => {
      state.isAuth = true
    }
  },

});
export const { actions: userActions, reducer: userReducer } = htmlSlice;
