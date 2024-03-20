import {useState} from "react";
import {AiOutlinePlus, AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import clsx from "clsx";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState("");
    const [filterText, setFilterText] = useState("");

    const numberOfCompletedTodos = todos.filter((todo) => todo.completed).length;

    const handleAddTodo = () => {
        if (text.trim() !== "") {
            setTodos([...todos, {id: Date.now(), text, completed: false}]);
            setText("");
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleToggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    };

    const handleRemoveCompletedTodos = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Todo List</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a new todo"
                    className="flex-grow mr-2 py-2 px-3 border border-gray-300 rounded focus:outline-none"
                />
                <button
                    onClick={handleAddTodo}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    <AiOutlinePlus/>
                </button>
            </div>
            <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter todos"
                className="mb-4 w-full py-2 px-3 border border-gray-300 rounded focus:outline-none"
            />
            <ul>
                {filteredTodos.map((todo) => {
                    return <TodoItem todo={todo} handleDeleteTodo={handleDeleteTodo}
                                     handleToggleComplete={handleToggleComplete}/>
                })}
            </ul>
            <button
                onClick={handleRemoveCompletedTodos}
                className={clsx(
                    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none mt-4 w-full",
                    {"opacity-50 bg-red-700": numberOfCompletedTodos === 0}
                )}
                disabled={numberOfCompletedTodos === 0}
            >
                Remove Completed Todos
            </button>
        </div>
    );
}

interface TodoItemProps {
    todo: Todo;
    handleToggleComplete: (id: number) => void;
    handleDeleteTodo: (id: number) => void;
}

function TodoItem({todo, handleDeleteTodo, handleToggleComplete}: TodoItemProps) {
    return <li
        key={todo.id}
        className={`flex items-center justify-between py-2 px-3 border-b border-gray-300 ${
            todo.completed ? "line-through text-gray-500" : ""
        }`}
    >
        <span>{todo.text}</span>
        <div>
            <button
                onClick={() => handleToggleComplete(todo.id)}
                className="text-green-500 mr-2 focus:outline-none"
            >
                <AiOutlineEdit/>
            </button>
            <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 focus:outline-none"
            >
                <AiOutlineDelete/>
            </button>
        </div>
    </li>
}
