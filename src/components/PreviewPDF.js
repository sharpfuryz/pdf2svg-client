import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, List, Button } from 'semantic-ui-react'
import * as itemsActionCreators from '../actions/itemsActionCreators'
import Page from './Page'

class PreviewPDF extends Component {
    constructor(props) {
        super(props);
        if(props.document.title === ""){
            const document_id = this.props.match.params.id;
            this.props.requestPDF(document_id);
        }
        this.state = {  }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }
    nextPage(e) {
        const current_page = this.props.document.current_page;
        const index = this.props.document.pages.indexOf(current_page);
        const next_page = this.props.document.pages[index + 1];
        this.props.requestPage(next_page);
    }
    prevPage(e){
        const current_page = this.props.document.current_page;
        const index = this.props.document.pages.indexOf(current_page);
        if(index > 0){
            const next_page = this.props.document.pages[index - 1];
            this.props.requestPage(next_page);
        }
    }
    render() { 
        return (<div>
            <h2>Preview of {this.props.document.title}</h2>
            <div className="ui buttons">
                <Button className="red basic" onClick={this.prevPage}>
                    <i className="left chevron icon"></i>
                    Prev page
                </Button>
                <Button className="green basic" onClick={this.nextPage}>
                    Next page
                    <i className="right chevron icon"></i>
                </Button> 
            </div>
            <Page current={this.props.page} />
            </div>)
    }
}
PreviewPDF.defaultProps = {
    document: {
        title: ""
    }
}
function mapStateToProps(state) {
    return state;
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, itemsActionCreators), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PreviewPDF);