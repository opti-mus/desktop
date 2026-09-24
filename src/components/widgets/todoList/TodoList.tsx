import { useState } from 'react'
import type { Todo } from '../../../types/config'
import { TodoListItem } from '../todoListIterm/TodoListItem'
import { TodoListStyles, TodoTaskStyles } from './TodoList.styles'

type TodoListProps = {
    id: string
}

export const TodoList = ({ id }: TodoListProps) => {
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [todoText, setTodoText] = useState<string>('')

    const handleAddTodo = () => {
        if (todoText.trim() !== '') {
            const todo = {
                id: crypto.randomUUID(),
                text: todoText,
                completed: false
            }
            setTodoList([...todoList, todo])
            setTodoText('')
        }
    }

    const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTodo()
        }
    }

    return (
        <TodoListStyles>
            <h2>Todo List</h2>
            <TodoTaskStyles>
                <input
                    type="text"
                    placeholder="Add a new todo..."
                    value={todoText}
                    onChange={e => setTodoText(e.target.value)}
                    onKeyDown={handleClickEnter}
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </TodoTaskStyles>
            <TodoListItem todoList={todoList} setTodoList={setTodoList} />
        </TodoListStyles>
    )
}
