
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FiCheckSquare, FiSquare, FiFilter } from 'react-icons/fi'; // Import the filter icon

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const [filterCompleted, setFilterCompleted] = useState(false);

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} completeTodo={completeTodo} />;
  }

  const handleFilterToggle = () => {
    setFilterCompleted(!filterCompleted); // Toggle the filter state
  };

  // Filter tasks based on the selected filter option
  const filteredTodos = filterCompleted
    ? todos.filter(todo => todo.isComplete)
    : todos;

  return (
    <div>
      <div className="filter-icon" onClick={handleFilterToggle}>
        <FiFilter /> {/* Filter icon */}
      </div>
      {filteredTodos.map((todo, index) => (
        <div
          className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
          key={index}
        >
          <div key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.text}
          </div>
          <div className='icons'>
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className='delete-icon'
            />
            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className='edit-icon'
            />
            {todo.isComplete ? (
              <FiSquare onClick={() => completeTodo(todo.id)} className='done-icon' />
            ) : (
              <FiCheckSquare onClick={() => completeTodo(todo.id)} className='done-icon' />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
