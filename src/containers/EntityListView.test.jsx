import React from "react";
import {shallow} from "enzyme";
import EntityListView from "./EntityListView";
import EntityPanel from "../components/EntityPanel";
import EntityListSearch from "../components/EntityListSearch";
import EntityListItem from "../components/EntityListItem";

const initState = {
    currentItem: {},
    currentTab: 0,
    currentInfo: {}
}
const props = {
    selectedItem: {name: 'someName'}
}

describe("EntityListView rendering", () => {
    beforeEach(() => {
        fetch = jest.fn(() => new Promise(resolve => resolve({json: jest.fn(() => ({response: 'success'}))})));
    })
    it("should render EntityList container", () => {
        const wrapper = shallow(<EntityListView {...props}/>);
        expect(wrapper).toBeTruthy();
    });
    it("should render EntityList container with valid state", () => {
        const wrapper = shallow(<EntityListView {...props}/>);
        expect(wrapper.instance().state.currentItem).toEqual(props.selectedItem);
        expect(wrapper.instance().state.currentInfo).toEqual(props.selectedItem.name);
    });
    it("should render expected child components", async () => {
        const wrapper = shallow(<EntityListView {...props}/>);
        const childEntityPanel = wrapper.find(EntityPanel)
       expect(childEntityPanel.exists()).toBe(true);
    });
    it("should validate date", async () => {
        const wrapper = shallow(<EntityListView {...props}/>);
        const dateValidator = wrapper.instance().isDate
        const resultInvalid = dateValidator('notDate')
        const resultValid = dateValidator('2014-12-20T21:17:50.309000Z')
        expect(resultValid).toBe(true);
        expect(resultInvalid).toBe(false);
    });

});
