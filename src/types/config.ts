export type WindowTemplate = Partial<{
    id: string;
    name: string;
    isOpen: boolean;
    isMaximized: boolean;
    isMinimized: boolean;
    isFullScreen: boolean;
    isVisible: boolean;
    isFocused: boolean;
    isResizable: boolean;
    shortcut?: Shortcut;

    render: () => React.ReactNode;
}>

export type Shortcut = {
    id: string;
    name: string;
    description?: string;
    key?: string;
    icon?: string;
    action?: () => void;
}