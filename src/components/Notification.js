import React from 'react'

const Notification = ({notification}) => {
  return (
        <p>You have used up {notification[1]}% of your limit in category {notification[0]}</p>
  )
}

export default Notification