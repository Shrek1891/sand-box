import React, { Fragment, useEffect } from "react";
import { useTypedSelectors } from "../state/hooks/use-typed-selectors";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import "./cell-list.css";

const CellList: React.FC = () => {
  const cells = useTypedSelectors(({ cells: { order, data } }) => {
    return order.map((id: string) => {
      return data[id];
    });
  });
  const renderCells = cells.map(cell =>
    <Fragment
      key={cell.id}
    >
      <AddCell nextCellId={cell.id} />
      <CellListItem
        key={cell.id}
        cell={cell}
      />
    </Fragment>
  );
  return (
    <>
      <div>{renderCells}</div>
      <div>
        <AddCell nextCellId={null} />
      </div>

    </>
  );
};

export default CellList;