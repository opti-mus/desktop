// export type WindowTemplate = Partial<{
//     id: string;
//     name: string;
//     isOpen: boolean;
//     isMaximized: boolean;
//     isMinimized: boolean;
//     isFullScreen: boolean;
//     isVisible: boolean;
//     isFocused: boolean;
//     isResizable: boolean;

//     render: () => React.ReactNode;
// }>

export type WindowConfig = Partial<{
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
  render: () => React.ReactNode;
} & WindowConfig;

export type Shortcut = {
    id: string;
    name: string;
    description?: string;
    key?: string;
    icon?: string;
    newWindow: WindowTemplate;
    
    action?: () => void;
}