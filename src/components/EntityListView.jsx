import React from "react";
import CenteredTabs from "./EntityPanel"

export class EntityListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: props.selectedItem,
            currentTab: 0,
            currentInfo: props.selectedItem.name
        }
    }


    handleChange = (currentInfo) => {
        const {currentItem} = this.state
        //Большое нагромождение условий. Но возможны варианты когда элемент - ссылка, когда элемент - массив ссылок или когда элемент - не отформатированная дата
        if (currentInfo !== 'url' & currentItem[currentInfo].indexOf('http') !== -1 || Array.isArray(currentItem[currentInfo])) {
            this.fetchInfo(currentItem[currentInfo])
        } else if (currentInfo === 'created' || currentInfo === 'edited') {
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

    fetchInfo(links) {
        if (Array.isArray(links)) {
            const promises = links.map(url => fetch(url).then(response => response.json()));
            Promise.all(promises).then(data => this.setState(prevState => ({
                ...prevState,
                currentInfo: data
            })))
        } else {
            fetch(links)
                .then(response => response.json())
                .then(data => this.setState(prevState => ({
                    ...prevState,
                    currentInfo: data[Object.keys(data)[0]]
                })))
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
