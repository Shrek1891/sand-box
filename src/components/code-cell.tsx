import React, { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state/cell";
import { useDispatch } from "react-redux";
import { update_cell } from "../state/features/cellReducer";
import { createBundle } from "../state/features/bundleReducer";
import { useTypedSelectors } from "../state/hooks/use-typed-selectors";
import Spinner from "./spinner";
import "./code-cell.css";
import { useCumulativeCode } from "../state/hooks/use-cumulative-code";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const bundle = useTypedSelectors((state) => state.bundle[cell.id]);
  const newCell = useCumulativeCode(cell);
  useEffect(() => {
    const timer = setTimeout(async () => {
        // @ts-ignore
        dispatch(createBundle(newCell));
      }
      , 1000);
    return () => {
      clearTimeout(timer);
    };

  }, [cell.content, cell.id, dispatch]);
  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => dispatch(update_cell({ id: cell.id, value }))}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ?
            <Spinner />
            :
            <Preview
              code={bundle.code}
              err={bundle.err}
            />}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;