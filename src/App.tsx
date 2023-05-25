import { useEffect, useRef } from "react";
import "./App.css";
import { startService } from "./bundler/start-service";
import CellList from "./components/cell-list";

function App() {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      console.log("start");
      startService();
    }
    ref.current = true;

  }, []);
  return (
    <>
      <CellList />
    </>

  );
}

export default App;
