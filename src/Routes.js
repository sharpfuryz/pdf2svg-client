import React, { Component } from 'react'
import ListPDF from './components/ListPDF'
import PreviewPDF from './components/PreviewPDF'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <Switch>
            <Route exact path="/" component={ListPDF} />
            <Route exact path="/app/index.html" component={ListPDF} />
            <Route path="/view/:id" component={PreviewPDF} />
        </Switch>);
    }
}
function mapStateToProps(state){
    return state;
}
function mapDispatchToProps(dispatch){
    return {};
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
