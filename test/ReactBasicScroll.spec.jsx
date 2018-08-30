import * as React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReactBasicScroll} from "../src";

Enzyme.configure({adapter: new Adapter()});

const methods = ["start", "stop", "destroy", "update", "calculate", "isActive", "getData"];

describe("ReactBasicScroll tests", () => {
    let wrapper;
    const config = {
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
    beforeEach(() => {
        wrapper = mount(<ReactBasicScroll config={config}><h1>test</h1></ReactBasicScroll>)
    });

    it("should test child component is rendered", () => {
        expect(wrapper.find('h1').length).toEqual(1);
    });

    it("should test all basicScrollInstance methods are available", () => {
        const instance = wrapper.instance();
        methods.forEach(fn => {
            expect(typeof (instance[fn])).toEqual("function");
        });
    });

    it("should test all basicScrollInstance methods are called", () => {
        const instance = wrapper.instance();
        methods.forEach(fn => {
            const spy = spyOn(instance.basicScrollInstance, fn).and.callThrough();
            instance[fn].call(instance);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it("should test if basicScrollInstance has correct active status", () => {
        const instance = wrapper.instance();
        let isActive = instance.isActive();
        expect(isActive).toBeTruthy();
        instance.stop();
        isActive = instance.isActive();
        expect(isActive).toBeFalsy();
        instance.start();
        isActive = instance.isActive();
        expect(isActive).toBeTruthy();
    });

    // it("should test that basicScrollInstance is destroyed", () => {
    //     const basicScrollInstance = wrapper.basicScrollInstance();
    //     let isActive = basicScrollInstance.isActive();
    //     expect(isActive).toBeTruthy();
    //     basicScrollInstance.destroy();
    //     isActive = basicScrollInstance.isActive();
    //     expect(isActive).toBeFalsy();
    // });

    it("should test basicScrollInstance is destroyed on component unmount", () => {
        const spy = spyOn(wrapper.instance().basicScrollInstance, 'destroy').and.callThrough();
        wrapper.unmount();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});