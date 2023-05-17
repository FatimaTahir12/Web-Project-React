import React from 'react'

const Notification = ({notification}) => {
  return (
        <p>You have used up {notification}% of your limit in category {notification}</p>
  )
}

export default Notification