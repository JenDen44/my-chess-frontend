export interface DrawAnswerModalProps {
    token?: string;
    isOpen: boolean;
    onClose: VoidFunction;
}

export interface UseDrawModalOptions {
    token?: string;
    onClose: VoidFunction;
}

export interface UseDrawAnswerModal {
    onAnswer: (answer: boolean) => void;
}