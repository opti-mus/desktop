export enum DialogType {
  BASE = 'BASE',
  WIDGET = 'WIDGET',
  SHORTCUT = 'SHORTCUT'
}
export type MousePosition = {
  x: number
  y: number
}

export type WindowDimension = {
  width: number
  height: number
}

export type BaseDialogControls = {
  maximized: boolean
  minimized: boolean
  close: boolean
}

export type BaseDialog = {
  id: string;
  name?: string;
  type: DialogType
  position?: MousePosition
  dimensions?: WindowDimension
} & WindowConfig

export type WindowConfig = Partial<{
  isActive: boolean
  isOpen: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  isFullScreen: boolean;
  isVisible: boolean;
  isFocused: boolean;
  isResizable: boolean;
  isHovered: boolean
}>;

export type WindowTemplate = {
  type: DialogType.BASE
  disabledControls?: boolean

  render: () => React.ReactNode;
} & BaseDialog;

export type Shortcut = {
  type: DialogType.SHORTCUT
  description?: string;
  key?: string;
  icon?: string;
  newWindow: WindowTemplate['id'];
  action?: () => void;
} & BaseDialog


export type Widget = {
  type: DialogType.WIDGET
  disabledControls?: boolean

  render: () => React.ReactNode;
} & BaseDialog;

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

export type CombinedObject = WindowTemplate | Shortcut | Widget

export type DesktopObject<T extends keyof typeof DialogType = keyof typeof DialogType> = Extract<
  CombinedObject,
  { type: T }
>
