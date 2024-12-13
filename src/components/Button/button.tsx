import { type FC } from 'react';
import { type ButtonProps } from './types';
import { Content } from './styles';

export const Button: FC<ButtonProps> = (props) => {
    const { onClick, children } = props;

    return (
        <Content onClick={onClick}>
            {children}
        </Content>
    );
};