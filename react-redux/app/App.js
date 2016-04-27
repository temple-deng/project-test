import React, { Component } from 'react';
import AddTodo from './components/AddTodo.js';
import TodoList from './components/TodoList.js';
import Footer from './components/Footer.js';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './action';



class App extends Component {

    render() {
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={text => {
                        console.log('dispatching', addTodo(text));
                        dispatch(addTodo(text));
                        console.log('next state',this.context.store.getState());
                                }
                        } />
                <TodoList
                    todos={this.props.visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))
                        } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                        } />
            </div>
        );
    }
}

App.contextTypes={
    store: React.PropTypes.object
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/faassen/reselect 效果更佳。
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；

export default connect(select)(App);
