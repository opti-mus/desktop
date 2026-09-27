import { TodoItemStyle } from './TodoItemInfo.styles'

type TextInfo = {
    text: string
}

export const TodoItemInfo = ({ text }: TextInfo) => {
    return <TodoItemStyle>{text}</TodoItemStyle>
}
