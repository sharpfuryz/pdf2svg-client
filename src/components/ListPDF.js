import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as itemsActionCreators from '../actions/itemsActionCreators'
import { withRouter } from 'react-router-dom'
import { Header, List } from 'semantic-ui-react'

class ListPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.props.loadPDFs();
    }
    selectItem(item){
        this.props.selectItem(item.id);
    }
    render() { 
        const displayPlaceholder = (this.props.items.length === 0);
        return (<div>
            <Header as='h1'>List of uploaded and parsed PDFs</Header>
            {displayPlaceholder ? (<Header as='h2'>No files? <a href="/upload">Try to upload one</a></Header>) : (null)}
            <List ordered>
                {this.props.items.map((item) => {
                    return (<List.Item as='a' onClick={ () => { this.selectItem(item)}} key={item.id}>{item.title}</List.Item>)
                })}
            </List>
        </div>)
    }
}

ListPDF.defaultProps = {
    items: []
}
function mapStateToProps(state) {
  return { items: state.items };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, itemsActionCreators), dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPDF));

