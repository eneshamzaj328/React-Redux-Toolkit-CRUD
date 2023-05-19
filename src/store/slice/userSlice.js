import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, name: 'Enes', email: 'enicodex@gmail.com' },
    { id: 2, name: 'Test', email: 'test@test.com' },
    { id: 3, name: 'Filan', email: 'filan_f@mail.com' }
];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        editUser: (state, action) => {
            const { id, name, email } = action.payload;
            
            const updatedExistingUser = {
                id, name, email
            };

            const existingUserIndex = state.findIndex(user => user.id === id);

            if (existingUserIndex || existingUserIndex >= 0) {
                state[existingUserIndex] = updatedExistingUser;
            }
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;

            const existingUser = state.find(user => user.id === id);
            // const existingUser = state.findIndex(user => user.id === id);

            if (existingUser) {
                return state.filter(user => user.id !== id);
                // state.splice(existingUser, 1);
            };
        }
    }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;