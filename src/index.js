import React, {Component} from 'react'
import assign from 'react/lib/Object.assign'

class MultiProp extends Component {
  constructor(props){
    super(props)
    this.state = {index: 0}
    this.updateCount = this.updateCount.bind(this)
  }

  componentDidMount(){
    setTimeout(this.updateCount, this.props.interval)
  }

  updateCount(){
    this.setState({index: (this.state.index + 1) % this.props.changingProps.length})
    setTimeout(this.updateCount, this.props.interval)
  }

  render(){

    const Component = this.props.component

    let props = assign({}, this.props, this.props.changingProps[this.state.index])
    delete props.changingProps
    delete props.interval
    delete props.component

    return (
      <Component {...props} />
    )
  }
}

MultiProp.propTypes =
  { changingProps: React.PropTypes.array.isRequired
  , interval: React.PropTypes.number.isRequired
  }

MultiProp.displayName = 'MultiProp'

export default MultiProp