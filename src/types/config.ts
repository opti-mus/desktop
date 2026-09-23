export type MousePosition = {
  x: number
  y: number
}

export type WindowDimension = {
  width: number
  height: number
}

export type WindowBaseDialog = {
  id: string;
  name: string;
  position?: MousePosition
  dimensions?: WindowDimension
}

export type WindowConfig = Partial<{
  isActive: boolean
  isOpen: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  isFullScreen: boolean;
  isVisible: boolean;
  isFocused: boolean;
  isResizable: boolean;
}>;

export type WindowTemplate = {
  dimensions?: WindowDimension
  render: () => React.ReactNode;
} & WindowConfig & WindowBaseDialog;

export type Shortcut = {
  description?: string;
  key?: string;
  icon?: string;
  newWindow: WindowTemplate['id'];
  action?: () => void;
} & WindowBaseDialog


export type Widjet = {
  id: string;
  name: string;
  render: () => React.ReactNode;
} & WindowConfig;

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
}
