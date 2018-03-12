import React, { Component } from 'react'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (<div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            pdf2svg
          </Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>
  
          <Dropdown item simple text='PDFs'>
            <Dropdown.Menu>
              <Dropdown.Item href="/upload">Upload PDF</Dropdown.Item>
              <Dropdown.Item href="/list">List</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
      <Container text style={{ marginTop: '7em' }}>
        {this.props.children}  
      </Container>
      <Segment
        inverted
        vertical
        style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
      >
        <Container textAlign='center'>
          <Divider inverted section />
          <List horizontal inverted divided link>
            <List.Item as='a' href='https://sovremenius.com'>About Me</List.Item>
            <List.Item as='a' href='https://kontentapps.com'>KontentApps</List.Item>
          </List>
        </Container>
      </Segment>
    </div>)
  }
}

export default AppContainer