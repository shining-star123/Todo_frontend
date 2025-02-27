import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
    data: string[];
}

const initialState: CategoryState = {
    data: []
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<string[]>) {
            state.data = action.payload;
        },
    }
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;