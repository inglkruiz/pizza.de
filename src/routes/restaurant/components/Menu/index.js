import React from 'react'

import Section from './Section'

export default function Menu (props) {
  return (
    <div className='menu'>
      {
        props.menu.map(section => (
          <Section key={section.id} name={section.name} items={section.items} />
        ))
      }
    </div>
  )
}
