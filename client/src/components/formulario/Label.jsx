import React from 'react'

const Label = ({htmlFor,className}) => {
  return (
    <div>
        <label htmlFor={htmlFor} className={className}>
                * Cliente:
              </label>


    </div>
  )
}

export default Label