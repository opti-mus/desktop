import WindowTable from "./components/window/Window";
import { useGlobalStore } from "./state/state.global";

function App() {
  const addWindow = useGlobalStore.use.addWindow();
  const windows = useGlobalStore.use.windows();

  const handleAddWindow = () => {
    const count = windows.length + 1;

    const render = () => <div>Hello World {count}</div>;
    const newWindow = {
      id: Date.now().toString(),
      name: "Window" + count,
      render,
    };

    addWindow(newWindow);
  };
  return (
    <>
      <div>
        <h1>Hello World</h1>
        <button onClick={handleAddWindow}>Add Window</button>
        <div>
          {windows.map((window) => (
            <WindowTable key={window.id} window={window} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
