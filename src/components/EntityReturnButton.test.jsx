import React from "react";
import EntityReturnButton from "./EntityReturnButton";
import {shallow} from "enzyme";



describe("EntityReturnButton rendering", () => {
    it("should render EntityReturnButton component", () => {
        const wrapper = shallow(<EntityReturnButton/>);
        expect(wrapper).toBeTruthy();
    });
});
