import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import { toJS } from 'mobx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Item extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number
    })
  }

  handleAdd = () => {
    console.log(toJS(this.props.item))
  }

  render() {
    const { name, price } = this.props.item
    return (
      <li className="section-item">
        <span className="section-item__name">{name}</span>
        <span className="section-item__price">
          <FontAwesomeIcon icon="euro-sign" />
          {price}
        </span>
        <button className="btn btn-primary btn-lg" onClick={this.handleAdd}>
          Add
        </button>
      </li>
    )
  }
}

class Section extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    items: MobxPropTypes.arrayOrObservableArrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number
      })
    )
  }

  static defaultProps = {
    items: []
  }

  render() {
    const { name, items } = this.props
    if (!items.length) return null

    return (
      <Fragment>
        <h4>{name}</h4>
        <ul className="section-list">
          {items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default Section
