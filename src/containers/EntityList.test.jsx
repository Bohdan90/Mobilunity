import React from "react";
import EntityList from "./EntityList";
import {shallow} from "enzyme";
import EntityListSearch from "../components/EntityListSearch";
import EntityListItem from "../components/EntityListItem";

const initState = {
    allItems: [], selectedItem: null, currPage: 1, count: 1, rowsPerPage: 5
}

describe("EntityList rendering", () => {
    beforeEach(() => {
        fetch = jest.fn(() => new Promise(resolve => resolve({json: jest.fn(() => ({response: 'success'}))})));
    })
    it("should render EntityList container", () => {
        const wrapper = shallow(<EntityList {...initState}/>);
        expect(wrapper).toBeTruthy();
    });
    it("should fetch be called after rendering", () => {
        shallow(<EntityList {...initState}/>);
        expect(fetch).toHaveBeenCalled()
    });
    it("should render valid child Elements", () => {
        const wrapper = shallow(<EntityList {...initState}/>);
        const childListSearch = wrapper.find(EntityListSearch)
        const childListItem = wrapper.find(EntityListItem)
        expect(childListSearch.exists()).toBe(true);
        expect(childListItem.exists()).toBe(true);
    });
    it("should render child Elements with valid props", () => {
        initState.selectedItem = '1'
        const wrapper = shallow(<EntityList {...initState}/>);
        expect(wrapper.instance().props).toEqual(initState);
    });
    it("should change state when changePage executed", async () => {
        const newPage = 7;
        const wrapper = shallow(<EntityList {...initState}/>);
        wrapper.setState({allItems: {results: ['frstResult']}})
        const instance = wrapper.instance().onChangePage
        await instance(null, newPage);
        expect(wrapper.instance().state.currPage).toEqual(newPage);
    });

});
