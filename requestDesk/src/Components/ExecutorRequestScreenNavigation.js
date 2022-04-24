import React, {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationTab, Icon, Text} from '@ui-kitten/components';

export const ExecutorRequestScreenNavigation = ({setActivePage}) => {
    const [taskClick, isTaskClick] = useState(false)
    const [CommentsClick, isCommentsClick] = useState(false)
    const PersonIcon = (props) => (
        <Icon fill='#FFAA00' ref={taskIconRef} {...props} name='info-outline'/>
    );
    const TaskText = () => {
        return(<Text style={{color: '#FFAA00', fontSize: 12}}>Заявка</Text>)
    }
    const CommentIcon = (props) => (
        <Icon fill='#FFAA00' ref={commentIconRef} {...props} name='message-square-outline'/>
    );
    const CommentText = () => {
        return(<Text style={{color: '#FFAA00', fontSize: 12}}>Комментарии</Text>)
    }
    const taskIconRef = React.useRef();
    const commentIconRef = React.useRef();
    useEffect(()=>taskIconRef.current.startAnimation(), [taskClick])
    useEffect(()=>commentIconRef.current.startAnimation(), [CommentsClick])

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <BottomNavigation
            indicatorStyle={{backgroundColor: '#FFAA00', height: 4}}
            selectedIndex={selectedIndex}
            onSelect={index => {
                setSelectedIndex(index)
                setActivePage(index)
                if (index === 0)
                    isTaskClick(prev=>!prev)
                if (index === 1)
                    isCommentsClick(prev=>!prev)
            }}
            status='warning'
            >
            <BottomNavigationTab icon={PersonIcon} title={TaskText}/>
            <BottomNavigationTab icon={CommentIcon} title={CommentText}/>
        </BottomNavigation>
    );
};