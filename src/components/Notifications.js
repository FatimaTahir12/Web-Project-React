import React from 'react'
import Notification from './Notification'
import { useState } from 'react';
const Notifications = ({notifications}) => {
  
  const [data, setData] = useState(notifications.map(function({category, goal_amount, expense_amount}) {if(((goal_amount - expense_amount)/goal_amount) > 0.8)  return [category, ((goal_amount - expense_amount)/goal_amount)*100] }));
     
  
  
  return (
    <div>
        <ul className="notification-list">
        {data.map(function(notification){
          return <li><Notification data= {notification}/></li>
        })}
        </ul>
    </div>

    
  )
}

export default Notifications