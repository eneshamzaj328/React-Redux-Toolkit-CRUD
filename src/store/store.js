import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slice/userSlice';

export const store = configureStore({
    reducer: {
        users: userSlice
    },
});