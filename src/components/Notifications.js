import React from 'react'
import Notification from './Notification'

const Notifications = ({notifications}) => {
  return (
    <div>
        <ul className="notification-list">
        {notifications.map(function(notification){
          return <li><Notification data= {notification}/></li>
        })}
        </ul>
    </div>

    
  )
}

export default Notifications