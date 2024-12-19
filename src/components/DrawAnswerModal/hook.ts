import { useCallback } from 'react';
import { drawAnswer } from '../../api';
import { type UseDrawModalOptions, type UseDrawAnswerModal } from './types';

export const useDrawAnswerModal = (options: UseDrawModalOptions): UseDrawAnswerModal => {
    const { token, onClose } = options;
    const onAnswer = useCallback((answer: boolean) => {
        if (!token) return;

        drawAnswer(token, answer).then(() => {
            onClose();
        });
    }, [ token, onClose ]);

    return { onAnswer };

};