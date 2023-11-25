import React, { useRef } from 'react';

interface Props{
    todo : string,
    settodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd :(e: React.FormEvent)=>void;
}
const FeildInput = ({todo, settodo, handleAdd}: Props)=>{
    const  inputRef = useRef<HTMLInputElement>(null);
    console.log(todo);
    return(<>
    <form className='input' onSubmit={(e)=>
        {handleAdd(e)
        inputRef.current?.blur();
        
        }}>
        <input
         ref={inputRef}
         type='text' placeholder='Enter a task' className='input_box' value={todo} onChange={(e)=>settodo(e.target.value)}/>
         
        <button className='input_submit' type='submit'>Go</button>
    </form>
    </>)
}
export default FeildInput;