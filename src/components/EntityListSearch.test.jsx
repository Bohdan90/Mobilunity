import React from "react";
import EntityListSearch from "./EntityListSearch";
import {shallow} from "enzyme";


const initialTaskState = {
    value: 'someValue',
};
describe("EntityListSearch rendering", () => {
    it("should render EntityListSearch component", () => {
        const wrapper = shallow(<EntityListSearch  {...initialTaskState}/>);
        expect(wrapper.props().value).toEqual(initialTaskState.value);
    });
});
