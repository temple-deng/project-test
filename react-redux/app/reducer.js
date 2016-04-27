import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './action';

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state = initialState, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}

function todos(state = initialState.todos, action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state,{
                        text: action.text,
                        completed: false
                    }];

    case COMPLETE_TODO:
            return [...state.slice(0, action.index),{
                        text: state[action.index].text,
                        completed: true
                    }, ...state.slice(action.index+1)];

    default :
        return state;
    }
}

function visibilityFilter(state = initialState.visibilityFilter, action){
    switch (action.type) {
        case SET_VISIBILITY_FILTER :
            return action.filter;

        default :
            return state;
    }
}

export default todoApp;