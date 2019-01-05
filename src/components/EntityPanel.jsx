import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function CenteredTabs(props) {
    function TabContainer(props) {
        //Смущает это условие. Но возможен вариант когда элемент просто значение, возможен вариант когда элемент массив объектов
        if (!Array.isArray(props.children)) {
            return (
                <Typography key={props.children} component="div" style={{padding: 8 * 3}}>
                    {props.children}
                </Typography>
            );
        } else {
            return (props.children.map(item => {
                    return (
                        <Typography key={item[Object.keys(item)[0]]} component="div" style={{padding: 8 * 3}}>
                            {item[Object.keys(item)[0]]}
                        </Typography>
                    )
                })
            )
        }
    }

    return (
        <Paper>
            <Tabs value={props.currentTab} variant="scrollable"
                  scrollButtons="auto"
                  onChange={props.selectedTab}
            >
                {Object.keys(props.currentItem).map(item => {
                    return (<Tab key={item} label={item} onClick={() => props.handleChange(item)}/>)
                })}
            </Tabs>
            <TabContainer>{props.currentInfo}</TabContainer>
        </Paper>
    );
}

export default CenteredTabs;
