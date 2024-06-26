import { ACTION_TYPES } from "./postActionTypes";

export const INITIAL_STATE = {
    searchText: '',
};

export const postReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                post: {},
            };

        default:
            return state;
    }
};