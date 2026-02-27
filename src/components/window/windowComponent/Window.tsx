import { useCallback, useState } from "react";
import type { Shortcut } from "../../../types/config";
import TitleBar from "../titleBar/TitleBar";
import { WindowTableStyles } from "./Window.styles";
import { useGlobalStore } from "../../../state/state.global";

type WindowTableProps = {
  shortcut: Shortcut;
};

type Position = {x: number; y: number;}

const WindowTable = ({ shortcut }: WindowTableProps) => {

  const [pos, setPos] = useState<Position>({ x: 0, y: 0})
  const focusWindow = useGlobalStore.use.focusWindow();

  const { id, name, render, isMaximized, isOpen, isFocused } = shortcut.newWindow;

  const activeWindow = useCallback(() => {
    focusWindow(id);
  }, [focusWindow, id]);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    activeWindow();
    const startX = e.pageX;
    const startY = e.pageY;
    document.body.style.cursor = "grab";

    setPos(prev => {
      const offsetX = startX - prev.x;
      const offsetY = startY - prev.y;

      document.body.style.userSelect = "none";

      const onMouseMove = (event: MouseEvent) => {
        setPos({
          x: event.pageX - offsetX,
          y: event.pageY - offsetY,
        });
      };

      const onMouseUp = () => {
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "default";
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      return prev;
      });
  }, [activeWindow]);

  return (
      <WindowTableStyles 
        $isMaximized={!!isMaximized} 
        $isOpen={!!isOpen} 
        $isFocused={!!isFocused} 
        style={{transform: isMaximized ? "none" : `translate(${pos.x}px, ${pos.y}px)`}}
        onMouseDown={activeWindow}
        
        >
            <TitleBar shortcut={shortcut} onMouseDown={onMouseDown}/>
            <h1>{name}</h1>
            <div>{render?.()}</div>
      </WindowTableStyles>
  );
};

export default WindowTable;
