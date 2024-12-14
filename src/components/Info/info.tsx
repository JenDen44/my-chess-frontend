import { type FC } from 'react';
import { type InfoProps } from './types';
import { getInfo } from './utils';
import { Content } from './styles';

export const Info: FC<InfoProps> = (props) => {
    const { status, detail, currentColor } = props;

    return (
        <Content>
            {getInfo(currentColor, status, detail)}
        </Content>
    );
};