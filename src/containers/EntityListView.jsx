import React from "react";
import CenteredTabs from "../components/EntityPanel"

export class EntityListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: props.selectedItem,
            currentTab: 0,
            currentInfo: props.selectedItem.name
        }
    }

    isDate(value) {
        let dateFormat = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
        return dateFormat.test(value);
    }

    handleChange = async (currentInfo) => {
        const {currentItem} = this.state
        if (currentInfo !== 'url' & currentItem[currentInfo].indexOf('http') !== -1 || Array.isArray(currentItem[currentInfo])) {
            await this.fetchInfo(currentItem[currentInfo])
        } else if (this.isDate(currentItem[currentInfo])) {
            const date = new Date(currentItem[currentInfo]).toDateString()
            this.setState(prevState => ({
                ...prevState,
                currentInfo: date
            }))
        } else {
            this.setState(prevState => ({
                ...prevState,
                currentInfo: currentItem[currentInfo]
            }))
        }
    };

    async fetchInfo(links) {
        if (Array.isArray(links)) {
            const promises = links.map(url => fetch(url).then(response => response.json()));
            const data = await Promise.all(promises)
            this.setState(prevState => ({
                ...prevState,
                currentInfo: data
            }))
        } else {
            const response = await fetch(links)
            const data = await response.json()
            this.setState(prevState => ({
                ...prevState,
                currentInfo: data[Object.keys(data)[0]]
            }))
        }
    }


    selectedTab = (event, currentTab) => {
        this.setState({currentTab});
    }


    render() {
        return (
            <CenteredTabs {...this.state} handleChange={this.handleChange} selectedTab={this.selectedTab}/>
        )

    }
}

export default EntityListView
