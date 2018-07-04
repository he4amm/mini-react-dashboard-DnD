export const ADD_WIDGET = 'ADD_WIDGET';
export const DELETE_WIDGET = 'DELETE_WIDGET';
export const EDIT_WIDGET = 'EDIT_WIDGET';

export const addWidget = () => ({
    type: ADD_WIDGET
});

export const deleteWidget = (id) => ({
    type: DELETE_WIDGET,
    id
});

export const editWidget = (newState) => ({
    type: EDIT_WIDGET,
    payload: newState
});