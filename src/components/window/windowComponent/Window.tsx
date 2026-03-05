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
  const changeWindowProps = useGlobalStore.use.changeWindowProps();

  const { id, name, render, isMaximized, isOpen, isFocused } = shortcut.newWindow;

  const activeWindow = useCallback(() => {
    changeWindowProps(id, { isFocused: true});
  }, [changeWindowProps, id]);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if(isMaximized) return;

    activeWindow();

    const startX = e.pageX;
    const startY = e.pageY;

    document.body.style.cursor = "grab";
    document.body.style.userSelect = "none";

    const offsetX = startX - pos.x;
    const offsetY = startY - pos.y;
    
    const onMouseMove = (event: MouseEvent) => {
      const newX = event.pageX - offsetX;
      const newY = event.pageY -offsetY;
      
      setPos({
        x: newX,
        y: newY,
      });
    };

    const onMouseUp = () => {
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "default";

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

  }, [activeWindow, pos, isMaximized]);

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
