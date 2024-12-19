export interface DrawModalProps {
    token?: string;
    isOpen: boolean;
    onClose: VoidFunction;
}

export interface UseDrawModalOptions {
    token?: string;
    onClose: VoidFunction;
}

export interface UseDrawModal {
    isWait: boolean;
    onDraw: VoidFunction;
    onClose: VoidFunction;
}