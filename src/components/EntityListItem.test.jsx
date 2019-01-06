import React from "react";
import EntityListItem from "./EntityListItem";
import {shallow, mount} from "enzyme";


const initialTaskState = {
    currPage: 1,
    rowsPerPage: 5,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
    selectItem: jest.fn(),
    page: 1,
    allItems: {
        results: ['results'],
        count: 3
    }
};
describe("EntityListItem rendering", () => {
    it("should render EntityListItem component", () => {
        const wrapper = shallow(<EntityListItem  {...initialTaskState}/>);
        expect(wrapper).toBeTruthy();
    });
    it("should render with passed props", () => {
        const wrapper = mount(<EntityListItem  {...initialTaskState}/>);
        expect(wrapper.props()).toEqual(initialTaskState);
    });
});
