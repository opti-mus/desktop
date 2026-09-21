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
  id: string;
  name: string;
  position?: MousePosition
  render: () => React.ReactNode;
} & WindowConfig;

export type Shortcut = {
  id: string;
  name: string;
  description?: string;
  key?: string;
  icon?: string;
  newWindow: WindowTemplate['id'];
  position?: MousePosition

  action?: () => void;
}

export type MousePosition = {
  x: number
  y: number
}