import React, { Component } from 'react'
import { toJS } from 'mobx'

class SectionItem extends Component {
  handleAdd = () => {
    console.log(toJS(this.props.item))
  }

  render () {
    const { name, price } = this.props.item
    return (
      <li className='section-item'>
        <span className='section-item__name'>{name}</span>
        <span className='section-item__price'><i className='icon-euro' />{price}</span>
        <button className='btn btn-primary btn-lg' onClick={this.handleAdd}>Add</button>
      </li>
    )
  }
}

export default SectionItem
