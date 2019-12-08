/*global chrome*/
import {
    GET_ALL_SHORTCUTS,
    EDIT_SHORTCUT,
    DELETE_SHORTCUT
} from "../constants/action-types";
import update from "immutability-helper";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
    list: []
};

const rootReducer = (state = initialState, action) => {
    if (action.type === GET_ALL_SHORTCUTS) {
        return update(state, {
            list: { $set: action.payload }
        });
    }

    if (action.type === EDIT_SHORTCUT) {
        let copy = cloneDeep(state.list);
        let obj = [];
        if (copy.indexOf(action.payload.key) > -1) {
            obj = copy.filter(item =>
                item.key !== action.payload.key ? item : action.payload
            );
        } else {
            obj = copy;
            obj.push(action.payload);
        }
        chrome.storage.local.set({ shortcuts: obj });
        return update(state, {
            list: { $set: obj }
        });
    }

    if (action.type === DELETE_SHORTCUT) {
        let copy = cloneDeep(state.list);
        let obj = copy.filter(item => item.key !== action.payload.key);
        chrome.storage.local.set({ shortcuts: obj });
        return update(state, {
            list: { $set: obj }
        });
    }

    return state;
};

export default rootReducer;
