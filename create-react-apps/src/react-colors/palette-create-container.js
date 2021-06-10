import ColorBoxCreate from './color-box-create';
import {SortableContainer} from 'react-sortable-hoc';
import styled from 'styled-components';

const PnrMain = styled.div`
    margin-top: 10px;
    padding-bottom: 10px;
    flex-grow: 1;

    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;`
;

const PaleteCreateContainer = SortableContainer(props =>  {
    const { colors, removeColorBehavior } = props;    

    return (
        <PnrMain>
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
        </PnrMain>
    ) // return
}) // end of function

export default PaleteCreateContainer;