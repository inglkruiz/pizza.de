import React, { Component, Fragment } from 'react'

import SectionItem from './SectionItem'

class Menu extends Component {
  render () {
    return (
      <div className='menu'>
        {
          this.props.menu.map(section => (
            <Fragment key={section.id}>
              <h4 className='menu-section'>
                {section.name}
              </h4>
              <ul className='section-list'>
                {
                  section.items.map(item => (
                    <SectionItem key={item.id} item={item} />
                  ))
                }
              </ul>
            </Fragment>
          ))
        }
      </div>
    )
  }
}

export default Menu
