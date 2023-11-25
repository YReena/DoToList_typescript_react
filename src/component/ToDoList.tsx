import React from 'react';
import '../App.css';
import { Todo } from '../component/model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}
const ToDoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (<>
        <div className='containers'>
            <Droppable droppableId='Todolist'>
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver?"dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className='todos_heading'>Active Task</span>
                            {todos.map((todo, index) => (
                                <SingleTodo todo={todo} index={index} key={todo.id} todos={todos} setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
            <Droppable droppableId='ToDoRemove'>
                {
                    (provided,snapshot) => (<div className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todos_heading'>Completed Task</span>
                        {completedTodos.map((todo, index) => (
                            <SingleTodo todo={todo} index={index} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
                        ))}
                         {provided.placeholder}
                    </div>)
                }

            </Droppable>


        </div>

    </>);
}

export default ToDoList;