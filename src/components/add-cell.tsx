import './add-cell.css';
import React from "react";
import {useDispatch} from "react-redux";
import {insertCellBefore} from "../state/features/cellReducer";

interface AddCellProps {
    nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({nextCellId}) => {
    const dispatch = useDispatch();
    return (
        <div className="add-cell">
            <div className="add-buttons">
                <button
                    className="button is-radiusless is-primary is-small"
                    onClick={() => dispatch(insertCellBefore({id: nextCellId, type: 'code'}))}
                >
                    <span className='icon is-small'>
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>
                        Code
                    </span>
                </button>
                <button
                    className="button is-radiusless is-primary is-small"
                    onClick={() => dispatch(insertCellBefore({id: nextCellId, type: 'text'}))}
                >
                    <span className='icon is-small'>
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default AddCell;
