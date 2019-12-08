/*global chrome*/
import {
    GET_ALL_SHORTCUTS,
    EDIT_SHORTCUT,
    DELETE_SHORTCUT
} from "../constants/action-types";

export function loadShortcuts() {
    return dispatch => {
        chrome.storage.local.get(["shortcuts"], function(result) {
            dispatch({ type: GET_ALL_SHORTCUTS, payload: result.shortcuts });
        });
    };
}

export function editShortcuts(obj) {
    return dispatch => {
        dispatch({ type: EDIT_SHORTCUT, payload: obj });
    };
}

export function deleteShortcuts(obj) {
    return dispatch => {
        dispatch({ type: DELETE_SHORTCUT, payload: obj });
    };
}
