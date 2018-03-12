import React, { Component } from 'react'
import Selection from './Selection'
import SVGInline from 'react-svg-inline'

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { selection: null, selection_type: null}
        this.svgClick = this.svgClick.bind(this)
        this.resetSelection = this.resetSelection.bind(this)
    }
    resetSelection(){
        this.setState({
            selection: null,
            selection_type: null
        })
    }
    svgClick(e){
        if(e.target.nodeName === 'image'){
            this.setState({ selection: e.target, selection_type: 'image'});
        }
        if(e.target.nodeName === 'tspan'){
            this.setState({ selection: e.target, selection_type: 'text'});
        }
    }
    render() { 
        const isEmpty = (this.props.current.svg.length < 5);
        if(isEmpty){
            return (<b>Loading page</b>);
        } else {
            return (<div className="svg_frame">
                {this.state.selection ? ( <Selection resetSelection={this.resetSelection} page={this.props.current} selection={this.state.selection} selection_type={this.state.selection_type} />) : null}
                <SVGInline onClick={this.svgClick} svg={this.props.current.svg}/>
            </div>)
        }
    }
}
Page.defaultProps = {
    current: {
        id: 0,
        svg: ""
    }
}
 
export default Page;