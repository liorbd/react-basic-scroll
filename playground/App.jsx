import * as React from "react";
import {ReactBasicScroll} from "../src";
import styled, {keyframes} from "styled-components";
import "react-dat-gui/build/react-dat-gui.css";
import Prism from 'prismjs';
import DatGui, {DatBoolean, DatButton, DatNumber, DatString, DatSelect, DatFolder} from 'react-dat-gui';

const AppSection = styled.section`
  border-bottom: 1px solid #fff8dc50;
  padding: 32px 0;
  &:last-of-type {
    border-bottom: 0;
  };
  height: 100vh;
  width: 70%;
  margin: 0 auto;
`

const AppHeader = AppSection.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AppTitle = styled.h1`
  margin: 0 0 20px 0;
  font-size: 64px;
`

const AppHeaderText = styled.div`
  font-size: 32px;
  margin-bottom: 20px;
`

const AppSubTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  margin-bottom: 24px;
`

const AppStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const AppDemoElement = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #3cdddd, #ff1ac6);
  transform: translateX(var(--tx))rotate(var(--r));
  //opacity: var(--opacity);
  transition: transform .1s linear;
  will-change: transform;
`;

const LoaderAnimation = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`

const Loader = styled.div`
    display: inline-block;
    position: fixed;
    width: 128px;
    height: 128px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%)translateY(-50%);
    &:after {
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 6px;
        box-sizing: border-box;
        border: 52px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: ${LoaderAnimation} 1.2s infinite;
    }
`;

const Menu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: rgba(74, 69, 69, 0.18);
`

const MenuItem = styled.a`
  border-left-width: 3px;
  border-left-style: solid;
  border-bottom-color: ${({color}) => color};
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  font-size: 24px;
  text-decoration: none;
  color: ${({color}) => color};
  cursor: pointer;
  padding-left: 24px;
  border-bottom: 1px solid #FFF8DC30;
  box-sizing: border-box;
  &:last-of-type {
  border-bottom: 0;
  }
  &:hover {
    background-color: rgba(74, 69, 69, 0.45);
  }
`

const OutLink = styled.a`
  text-decoration: none;
  color: #cc99cd;
  font-size: 24px;
  margin-bottom: 24px;
`

const AppDemoContainer = styled.div`
  border-radius: 5px;
  background-color: #2d2d2d;
  width: 700px;
  height: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const Example = styled.div`
  display: flex;
`

const ExampleCode = styled.div`

`


const options = [
    // 'top-top',
    'top-middle',
    'top-bottom',
    'middle-top',
    'middle-middle',
    'middle-bottom',
    'bottom-top',
    'bottom-middle',
    // 'bottom-bottom'
];


export class App extends React.Component {
    state = {
        show: true,
        config: {
            from: 'top-top',
            to: 'bottom-bottom',
            props: {
                '--tx': {
                    from: '-200px',
                    to: '200px'
                },
                '--r': {
                    from: '0',
                    to: '360deg'
                }
            }
        }
    };

    componentRef = React.createRef();


    updateConfig = data => this.setState({
        config: {
            ...this.state.config,
            ...data
        }
    });

    stop = () => {
        this.componentRef.current.stop();
        this.setState({
            stopped: true
        })
    }

    resume = () => {
        this.componentRef.current.start();
        this.setState({
            stopped: false
        })
    }

    update = () => {
        this.componentRef.current.update();
    }

    restart = async () => {
        await this.setStateAsync({
            show: false
        });
        setTimeout(async () => {
            // window.scrollTo(0, 0);
            await this.setStateAsync({
                show: true
            });
        }, 200)
    }

    setStateAsync = (state) => {
        return new Promise(resolve => {
            this.setState(state, resolve);
        });
    }

    navigateTo = (target) => (evt) => {
        const targetOffsetTop = document.querySelector(`.${target}`).offsetTop;
        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': targetOffsetTop
        });
    }

    componentDidMount() {
        // Prism.highlightAll();
    }

    render() {
        const {config, stopped, show} = this.state;
        return (
            <div>
                <Menu>
                    <MenuItem color="red" onClick={this.navigateTo('appHeader')}>Home</MenuItem>
                    <MenuItem color="cornsilk" onClick={this.navigateTo('examples')}>Examples</MenuItem>
                    <MenuItem color="green" onClick={this.navigateTo('demo')}>Demo</MenuItem>
                    <MenuItem color="green" onClick={this.navigateTo('docs')}>Documentation</MenuItem>
                </Menu>
                <AppHeader className="appHeader">
                    <AppTitle>React-Basic-Scroll</AppTitle>
                    <AppHeaderText>A ReactJS components for basicScroll</AppHeaderText>
                    <OutLink href="https://basicscroll.electerious.com/" target="_blank">basicscroll.electerious.com</OutLink>
                    <pre className="language-javascript">
                        <code>
                            yarn add react-basic-scroll
                        </code>
                    </pre>
                </AppHeader>
                <AppSection className="examples">
                    <AppSubTitle>Examples:</AppSubTitle>
                    <pre className="language-javascript line-numbers">
                      <code>
                      {`
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
                      `}
                      </code>
                    </pre>
                </AppSection>
                <AppSection className="demo">
                    <AppSubTitle>Demo:</AppSubTitle>
                    <AppDemoContainer>
                        <ReactBasicScroll config={this.state.config} ref={this.componentRef}>
                            <AppDemoElement/>
                        </ReactBasicScroll>
                    </AppDemoContainer>
                </AppSection>
                <AppSection className="docs">
                    <AppSubTitle>Documentation:</AppSubTitle>
                </AppSection>
            </div>
        );
        {/*<AppStyled>*/
        }
        {/*<DatGui data={config} onUpdate={this.updateConfig} style={{left: 0, right: 'auto', fontSize: '18px'}}>*/
        }
        {/*<DatFolder title="Props">*/
        }
        {/*<DatBoolean path='direct' label='Direct?'/>*/
        }
        {/*<DatSelect path='from' options={options}></DatSelect>*/
        }
        {/*<DatSelect path='to' options={options}></DatSelect>*/
        }
        {/*</DatFolder>*/
        }
        {/*<DatFolder title="Actions">*/
        }
        {/*{*/
        }
        {/*stopped ? <DatButton onClick={this.resume} label="Resume"/> :*/
        }
        {/*<DatButton onClick={this.stop} label="Stop"/>*/
        }
        {/*}*/
        }
        {/*<DatButton onClick={this.update} label="Update"/>*/
        }
        {/*</DatFolder>*/
        }
        {/*<DatButton onClick={this.restart} label="Restart"/>*/
        }
        {/*</DatGui>*/
        }
        {/*{*/
        }
        {/*show ? <ReactBasicScroll config={this.state.config} ref={this.componentRef}>*/
        }
        {/*<AppDemoElement/>*/
        }
        {/*</ReactBasicScroll> : <Loader />*/
        }
        {/*}*/
        }
        {/*</AppStyled>)*/
        }
    }
}
