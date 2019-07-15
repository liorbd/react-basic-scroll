# React-Basic-Scroll
A ReactJS components for basicScroll

[basicscroll.electerious.com](https://basicscroll.electerious.com/)

## Installation
```
yarn add react-basic-scroll
```
```
npm i react-basic-scroll
```

## Basic Usage
```js
import * as React from "react";
import {ReactBasicScroll} from "react-basic-scroll";
export const App extends React.Component {
    render() {
        const config = {
            from: 'top-top',
            to: 'bottom-bottom',
            props: {
                '--opacity': {
                    from: 0.1,
                    to: 0.99
                }
            }
        };
        return (
            <ReactBasicScroll config={config}>
                <h1 style="{{opacity: 'var(--opacity)'}}">Hello world!</h1>
            </ReactBasicScroll>
        );
    };
}
```

### Props
#### config
An object defines the configuration for then element, [see here](https://github.com/electerious/basicScroll#data).
