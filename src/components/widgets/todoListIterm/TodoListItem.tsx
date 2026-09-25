import {
    TodoListItemsStyles,
    TodoLabelStyles,
    TodoItemStyles,
    TodoItemCheckboxStyles,
    TodoItemButtons,
    TodoItemButton,
    TodoItemSpan,
    TodoLabelGroupStyles
} from './TodoListItem.styles'
import type { Todo } from '../../../types/config'

type TodoListItemProps = {
    todoList: Todo[]
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoListItem = ({ todoList, setTodoList }: TodoListItemProps) => {
    const completedTodo = (id: string) => {
        const completedTodo = todoList.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        setTodoList([...completedTodo])
    }

    const deleteTodo = (id: string) => {
        const newTodoList = todoList.filter(t => t.id !== id)
        setTodoList([...newTodoList])
    }

    return (
        <TodoListItemsStyles>
            {todoList.map(todo => (
                <TodoItemStyles key={todo.id}>
                    <TodoLabelGroupStyles>
                        <TodoItemCheckboxStyles
                            id={todo.id}
                            checked={todo.completed}
                            onChange={() => completedTodo(todo.id)}
                        />
                        <TodoLabelStyles htmlFor={todo.id}>{todo.text}</TodoLabelStyles>
                    </TodoLabelGroupStyles>
                    <TodoItemButtons>
                        <TodoItemSpan $textInfo={todo.text}>@</TodoItemSpan>
                        <TodoItemButton onClick={() => deleteTodo(todo.id)}>Delete</TodoItemButton>
                    </TodoItemButtons>
                </TodoItemStyles>
            ))}
        </TodoListItemsStyles>
    )
}
