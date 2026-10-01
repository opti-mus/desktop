import { useRef, useState } from 'react'
import type { Todo } from '../../../types/config'
import { TodoListItem } from '../todoListItem/TodoListItem'
import { TodoListStyles, TodoTaskButtonStyles, TodoTaskInputStyles, TodoTaskStyles } from './TodoList.styles'

export const TodoList = () => {
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [todoText, setTodoText] = useState<string>('')
    const refTodoInput = useRef<HTMLInputElement | null>(null)

    const handleAddTodo = () => {
        if (refTodoInput?.current) {
            refTodoInput?.current.focus()
        }

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
                <TodoTaskInputStyles
                    ref={refTodoInput}
                    type="text"
                    placeholder="Add a new todo..."
                    maxLength={100}
                    value={todoText}
                    onChange={e => setTodoText(e.target.value)}
                    onKeyDown={handleClickEnter}
                />
                <TodoTaskButtonStyles onClick={handleAddTodo}>Add Todo</TodoTaskButtonStyles>
            </TodoTaskStyles>
            <TodoListItem todoList={todoList} setTodoList={setTodoList} />
        </TodoListStyles>
    )
}
