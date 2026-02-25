import type { Shortcut } from "../../../types/config";
import TitleBar from "../titleBar/TitleBar";
import { WindowTableStyles } from "./Window.styles";

type WindowTableProps = {
  shortcut: Shortcut;
};
const WindowTable = ({ shortcut }: WindowTableProps) => {
  console.log(shortcut);
  
  const { name, render, isMaximized, isOpen } = shortcut.newWindow;
  return (
    <>
      <WindowTableStyles isMaximized={isMaximized} isOpen={isOpen}>
        <TitleBar shortcut={ shortcut } />
        <h1>{name}</h1>
        <div>{render?.()}</div>
      </WindowTableStyles>
    </>
  );
};

export default WindowTable;
