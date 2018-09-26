import React, { Fragment } from 'react'

import Item from './Item'

function Section ({ name, items }) {
  return (
    <Fragment>
      <h4>
        {name}
      </h4>
      <ul className='section-list'>
        {
          items.map(item => (
            <Item key={item.id} item={item} />
          ))
        }
      </ul>
    </Fragment>
  )
}

export default Section
