import { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const Show = { display: visible ? '' : 'none' }
  const notShow = { display: visible ? 'none' : '' }

  return (
    <>
      <div style={notShow}>
        <button className="btn btn-dark text-light" onClick={toggleVisibility}> {props.buttonLabel} </button>
      </div>
      <div style={Show}>
        {props.children}
        <button className="btn btn-dark text-light" onClick={toggleVisibility}> cancel </button>
      </div>
    </>
  )
}

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
