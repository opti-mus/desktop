export type WindowTable = Partial<{
    id: string;
    name: string;
    isOpen: boolean;
    isMaximized: boolean;
    isMinimized: boolean;
    isFullScreen: boolean;
    isVisible: boolean;
    isFocused: boolean;
    isResizable: boolean;

    render: () => React.ReactNode;
}>