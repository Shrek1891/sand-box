import React from "react";
import {useDispatch} from "react-redux";
import {delete_cell, move_cell} from "../state/features/cellReducer";
import './action-bar.css';

interface ActionBarProps {
    id: string;

}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const dispatch = useDispatch();
    return (
        <div className="action-bar">
            <button
                className="button is-primary is-small"
                onClick={() => dispatch(move_cell({id, direction: 'up'}))}>
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={() => dispatch(move_cell({id, direction: 'down'}))}>
                <span className="icon">
                        <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={() => dispatch(delete_cell(id))}>
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    )
}

export default ActionBar;