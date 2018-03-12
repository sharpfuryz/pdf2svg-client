import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import * as itemsActionCreators from '../actions/itemsActionCreators'

class Selection extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.deleteBlock = this.deleteBlock.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }
    deleteBlock(){
        this.props.selection.remove();
        let svg = document.getElementsByClassName('SVGInline')[0].innerHTML;
        this.props.updatePageContents(this.props.document.current_page, svg);
        this.props.resetSelection();
    }
    changeColor(){
        let randomColor = `#${(Math.random()*0xFFFFFF<<0).toString(16)}`
        this.props.selection.style.fill = randomColor;
        let svg = document.getElementsByClassName('SVGInline')[0].innerHTML;
        this.props.updatePageContents(this.props.document.current_page, svg);
        // this.props.resetSelection();
    }
    render() { 
        const isImage = (this.props.selection_type === 'image')
        const isText = (this.props.selection_type === 'text')
        return (<div className="ui message">
        <div className="header">selected {this.props.selection_type}</div>
        {isImage ? (<Button onClick={this.deleteBlock}>Delete image</Button>) : null}
        {isText ? (<div className="ui button">
            <Button className="positive" onClick={this.changeColor}>Change color</Button>
            <Button onClick={this.deleteBlock}>Delete text block</Button>
            </div>) : null}
        <p></p>
      </div>)
    }
}
Selection.defaultProps = {
    selection: null,
    selection_type: null
}
 
function mapStateToProps(state) {
    return state;
}
  
// tbh I should use here blockActionCreators
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, itemsActionCreators), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Selection);