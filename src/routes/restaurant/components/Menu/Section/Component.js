import React, { Fragment, PureComponent } from 'react'
import { toJS } from 'mobx'

class Item extends PureComponent {
  handleAdd = () => {
    console.log(toJS(this.props.item))
  }

  render () {
    const { name, price } = this.props.item
    return (
      <li className='section-item'>
        <span className='section-item__name'>{name}</span>
        <span className='section-item__price'>
          <i className='icon-euro' />
          {price}
        </span>
        <button className='btn btn-primary btn-lg' onClick={this.handleAdd}>
          Add
        </button>
      </li>
    )
  }
}

class Section extends PureComponent {
  static defaultProps = {
    items: []
  }

  render () {
    const { name, items } = this.props
    if (!items.length) return null

    return (
      <Fragment>
        <h4>{name}</h4>
        <ul className='section-list'>
          {items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default Section
