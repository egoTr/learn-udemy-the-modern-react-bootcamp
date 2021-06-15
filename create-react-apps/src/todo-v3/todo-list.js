import { SortableContainer } from "react-sortable-hoc";
import { useContext } from "react";
import { AppContext } from "./context/app-context";
import TodoItem from './todo-item';

const TodoList = SortableContainer( ({ app }) => {
    return (
        <div>
            { app.tasks.length === 0 && <p>No tasks.</p> }

            { app.tasks.map( (item, i) =>
                <TodoItem
                    key={item.id}           /* For re-rendering the children :(((( */
                    id={item.id}

                    index={i}               /* w/ react-sortable-hoc */
                    disabled={app.onEdit}   /* w/ react-sortable-hoc */
                    onDrag={app.onDrag}     /* w/ react-sortable-hoc */
                    
                    task={item.task}
                    done={item.done}
                    onEdit={item.onEdit}
                />
            )}
        </div>
    )
}) // TodoList

function TodoListSortable() {
    const { app, dragDropStart, dragDropEnd } = useContext(AppContext);
    
    return (
        <TodoList
            app={app}

            axis="xy"
            onSortMove={dragDropStart}
            onSortEnd={dragDropEnd}
            distance={20}
        />
    )
} // TodoListSortable

export default TodoListSortable;