import React, { useState, useRef, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { Todo } from './model';
import '../App.css';
import { Draggable } from 'react-beautiful-dnd';


interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
}
const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleDone(id: number) {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }
    function handleDelete(id: number) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    function handleEdit(e: React.FormEvent, id: number) {
        e.preventDefault();
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo))
        setEdit(false);
    }
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    return (<>
        <Draggable draggableId={todo.id.toString()} index={index} >{
            (provided) => (
                <form className='todo_single' onSubmit={(e) => handleEdit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                        {
                            edit ? (
                                <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todo_single_text' />
                            ) : (
                                todo.isDone ? (
                                    <s className='todo_single_text'>{todo.todo}</s>
                                ) : (
                                    <span className='todo_single_text'>{todo.todo}</span>
                                )

                            )

                        }
                        <span className='icon' onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit)
                            }

                        }}><CiEdit /></span>
                        <span className='icon' onClick={() => handleDelete(todo.id)}><MdDelete /></span>
                        <span className='icon' onClick={() => handleDone(todo.id)}><MdOutlineDone /></span>

                </form>
            )
        }</Draggable>

    </>)
}

export default SingleTodo;