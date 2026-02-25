import ShortcutComponent from "./components/shortcut/ShortcutComponent";
import WindowTable from "./components/window/windowComponent/Window";
import { useGlobalStore } from "./state/state.global";
import { AppStyles } from "./App.styled";

function App() {
  const addWindow = useGlobalStore.use.addWindow();
  const addShortcut = useGlobalStore.use.addShortcut();
  const windows = useGlobalStore.use.windows();
  const shortcuts = useGlobalStore.use.shortcuts();

  const handleAddWindow = () => {
    const count = windows.length + 1;

    const render = () => <div>Hello World {count}</div>;

    const newWindow = {
      id: Date.now().toString(),
      name: "Window" + count,
      isMaximized: false,
      isOpen:false,
      render,
    };
    const shortcut = {
      id: Date.now().toString(),
      name: "Shortcut" + count,
      key: "Ctrl+Shift+A",
      action: () => {
        console.log("Shortcut pressed");
      },
      newWindow,
    };
    
    addShortcut(shortcut);
    addWindow(newWindow);   
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <h1>Hello World</h1>
        <button onClick={handleAddWindow}>Add Window</button>
        <AppStyles>
          {shortcuts.map((shortcut) => (
              <div key={shortcut.id}>
                <ShortcutComponent shortcut={shortcut} />
                {shortcut.newWindow && <WindowTable shortcut={shortcut} />}
              </div>
          ))}
        </AppStyles>
      </div>
    </>
  );
}

export default App;
