import type { WindowTemplate } from "../../types/config";
import { WindowTableStyles } from "./Window.styles";

type WindowTableProps = {
  window: WindowTemplate;
};
const WindowTable = ({ window }: WindowTableProps) => {
  const { name, render } = window;
  return (
    <WindowTableStyles>
      <h1>{name}</h1>
      <div>{render?.()}</div>
    </WindowTableStyles>
  );
};

export default WindowTable;
