import ColorBoxCreate from './color-box-create';
import {SortableContainer} from 'react-sortable-hoc';

const PaleteCreateContainer = SortableContainer(props =>  {
    const { colors, removeColorBehavior } = props;    

    return (
        <div className="pnr-main">
            { colors.map( (item, i) =>
                <ColorBoxCreate
                    key={i}
                    id={item.id}
                    index={i}
                    color={item.hex}
                    name={item.name}
                    removeColorBehavior={ () => removeColorBehavior(item.id) }
                />
            )}
        </div>
    ) // return
}) // end of function

export default PaleteCreateContainer;