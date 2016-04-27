import { createStore } from 'redux';
import todoApp from './reducer';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './action'

let store = createStore(haha.todoApp);

console.log(store.getState());

let unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//store.dispatch(addTodo("This is the first text"));
//
//store.dispatch(addTodo("this is the second text"));
//
//store.dispatch(addTodo("this is the third text"));
//
//store.dispatch(completeTodo(0));
//
//store.dispatch(completeTodo(2));
//
//store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

unsubscribe();