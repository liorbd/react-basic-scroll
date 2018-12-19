import * as React from "react";
import * as basicScroll from 'basicscroll';
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

    elementRef = React.createRef();

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        const config = this.props.config;
        this.basicScrollInstance = basicScroll.create({
            elem: this.elementRef.current,
            ...config
        });
        this.basicScrollInstanceFn('start');
    };

    render() {
        const {children} = this.props;
        return React.cloneElement(children, {ref: this.elementRef});
    };

    componentWillUnmount() {
        this.basicScrollInstanceFn('destroy');
    };

    basicScrollInstanceFn(fn) {
        if (this.basicScrollInstance && typeof (this.basicScrollInstance[fn]) == 'function') {
            return this.basicScrollInstance[fn].call(null);
        }
    };

    // Instance API
    start = () => {
        this.basicScrollInstanceFn('start');
    };

    stop = () => {
        this.basicScrollInstanceFn('stop');
    };

    destroy = () => {
        this.basicScrollInstanceFn('destroy');
    };

    update = () => {
        return this.basicScrollInstanceFn('update');
    };

    calculate = () => {
        this.basicScrollInstanceFn('calculate');
    };

    isActive = () => {
        return this.basicScrollInstanceFn('isActive');
    };

    getData = () => {
        return this.basicScrollInstanceFn('getData');
    };
}
