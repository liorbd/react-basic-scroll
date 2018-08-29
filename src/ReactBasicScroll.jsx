import * as React from "react";
import * as basicScroll from 'basicscroll'
import PropTypes from 'prop-types';

const ReactBasicScrollConfig = {
    from: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    direct: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.instanceOf(Element)
    ]),
    track: PropTypes.bool,
    inside: PropTypes.func,
    outside: PropTypes.func,
    props: PropTypes.object.isRequired,
};

export class ReactBasicScroll extends React.Component {

    static propTypes = {
        config: PropTypes.shape(ReactBasicScrollConfig).isRequired,
    };

    static defaultProps = {
        config: {
            from: null,
            to: null,
            direct: false,
            track: true,
            inside: (instance, percentage, props) => null,
            outside: (instance, percentage, props) => null,
            props: {}
        }
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        const config = this.props.config;
        this.instance = basicScroll.create({
            elem: this.elementRef,
            ...config
        });
        this.instanceFn('start');
    };

    render() {
        const {children} = this.props;
        return React.cloneElement(children, {innerRef: this.setInstanceRef});
    };

    componentWillUnmount() {
        this.instanceFn('destroy');
    };

    instanceFn(fn){
        if (this.instance && typeof (this.instance[fn]) == 'function') {
            return this.instance[fn].call(null);
        }
    };

    setInstanceRef = (ref) => {
        this.elementRef = ref;
    };

    // Instance API
    start = () => {
        this.instanceFn('start');
    };

    stop = () => {
        this.instanceFn('stop');
    };

    destroy = () => {
        this.instanceFn('destroy');
    };

    update = () => {
        return this.instanceFn('update');
    };

    calculate = () => {
        this.instanceFn('calculate');
    };

    isActive = () => {
        return this.instanceFn('isActive');
    };

    getData = () => {
        return this.instanceFn('getData');
    };
}