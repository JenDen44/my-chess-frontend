import { type PropsWithChildren, type MouseEvent } from 'react';

export type ButtonProps = PropsWithChildren<{
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;;
}>