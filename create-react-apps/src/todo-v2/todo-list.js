import { SortableContainer } from "react-sortable-hoc";

const TodoList = SortableContainer( (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
})

export default TodoList;