import { ADD_WIDGET, DELETE_WIDGET, EDIT_WIDGET } from '../actions/widgets.actions';

const initialState = [
    {
        id: 0,
        title: 'Users activity',
        orderUsers: 'DESC',
        numOfUsers: 5,
        top: 0,
        left: 0,
        width: 0,
        height: 0
    }
];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_WIDGET:
            return [
                ...state, 
                {
                    id: state.length,
                    title: 'Users activity',
                    orderUsers: 'DESC',
                    numOfUsers: 5,
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }    
            ];
        case DELETE_WIDGET:
            return state.filter( widget => widget.id !== action.id );
        case EDIT_WIDGET:
            const updatedWidgets = state.map(widget => {
                if (widget.id === action.payload.id){
                    return action.payload
                }
                return widget
            })
            return updatedWidgets
        default:
            return state
    }
}