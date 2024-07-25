import { React ,useState, useEffect} from 'react'
import './App.css'
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

function App() {
  const [todos,setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState([]);

  function persistData(newList){
    localStorage.setItem('todos',  JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo){
    const newTodoList=[...todos,newTodo]
    persistData(newTodoList);
    setTodos(newTodoList);
  }
function handleDeleteTodo(index){
  const newTodoList = todos.filter((todo,todoIndex)=>{return todoIndex !=index});
  persistData(newTodoList);
  setTodos(newTodoList);

}
function handleEditTodo(index){
  const valueTobeEdit= todos[index]
  setTodoValue(valueTobeEdit);
  handleDeleteTodo(index); 

}

useEffect(() => {
  if (!localStorage) return;
  const localTodos = localStorage.getItem('todos');
  if (!localTodos) return; // <--- Add this check
  const parsedTodos = JSON.parse(localTodos);
  if (!parsedTodos ||!parsedTodos.todos) return; // <--- Add this check
  setTodos(parsedTodos.todos);
}, []);



  return (
<>
<TodoInput handleAddTodos={handleAddTodos} setTodoValue={setTodoValue} todoValue={todoValue}/>
<TodoList handleDeleteTodo={handleDeleteTodo}   handleEditTodo={handleEditTodo} todos={todos}/>
</>

  );
}

export default App;
