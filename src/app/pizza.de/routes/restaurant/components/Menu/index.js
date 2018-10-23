import React from 'react'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'

import Section from './Section'

function Menu({ menu }) {
  if (!menu.length) return null

  return (
    <div className="menu">
      {menu.map(section => (
        <Section key={section.id} name={section.name} items={section.items} />
      ))}
    </div>
  )
}

Menu.propTypes = {
  menu: MobxPropTypes.arrayOrObservableArrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      items: MobxPropTypes.arrayOrObservableArrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          price: PropTypes.number
        })
      )
    })
  )
}

Menu.defaultProps = {
  menu: []
}

export default Menu
