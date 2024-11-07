declare module '*.svg' {
    import { type FunctionComponent, type SVGAttributes } from 'react';
    const content: FunctionComponent<SVGAttributes<SVGElement>>;
    export default content;
}