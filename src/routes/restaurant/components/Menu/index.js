import React from 'react'

import Section from './Section'

function Menu ({ menu }) {
  if (!menu.length) return null

  return (
    <div className='menu'>
      {menu.map(section => (
        <Section key={section.id} name={section.name} items={section.items} />
      ))}
    </div>
  )
}

Menu.defaultProps = {
  menu: []
}

export default Menu
