import React from 'react'
import "./user.css"

const User = ({data, onClick}) => {
  return (
    <div id='user'onClick={onClick}>{data.name}</div>
  )
}

export default User