import React from "react";
import EntityPanel from "./EntityPanel";
import {shallow} from "enzyme";


const initialTaskState = {
    currentTab: 0,
    currentItem: {firstKey: 'frst', secondKey: 'scnd'},
    currentInfo: 'crrInf',
    handleChange: jest.fn(),
    selectedTab: jest.fn()

};
describe("EntityPanel rendering", () => {
    it("should render EntityListSearch component", () => {
        const wrapper = shallow(<EntityPanel  {...initialTaskState}/>);
        expect(wrapper).toBeTruthy();
    })
    it("should contain children elements", () => {
        const wrapper = shallow(<EntityPanel  {...initialTaskState}/>);
        expect(wrapper.first().children().length).toBe(2);
    });
    it("should render children element with current props", () => {
        const wrapper = shallow(<EntityPanel  {...initialTaskState}/>);
        expect(wrapper.first().children().last().props().children).toEqual(initialTaskState.currentInfo);
    });
});
