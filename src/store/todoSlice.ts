import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../utils/utils";

interface TodoState {
    data: Item[];
}

const initialState: TodoState = {
    data: []
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<Item[]>) {
            state.data = action.payload;
        },
    }
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;