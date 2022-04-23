import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            messages: ''
        };

        this.inputChange = this.inputChange.bind(this);
        this.messagesEndRef = React.createRef();
    }
    scrollToBottom = () => {
        const body = document.querySelector('#form');
        body.scrollTo(0, body.scrollHeight);        
    }    

    componentDidUpdate() {
        this.scrollToBottom();
    }

    /**
     * Funkce pro odeslání zprávy.
     * 
     * @param {*} event 
     */
    submitHandler = (event) => {
        event.preventDefault();
        this.setState({
            messages: this.state.messages + "Uživatel: " + event.target.formMessage.value + "\n"
        });       

        const text = event.target.formMessage.value;

        const requestBody = {
            query: `
                query {
                    userQuery(messageInput: {text: "${text}"}) 
                }
            `
        };
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {                
                resData.data.userQuery.forEach(message => {
                    this.setState({
                        messages: this.state.messages + "Server: " + message + "\n"
                    });                    
                });
            })

            .catch(err => {
                console.log(err.message);
            });
    };

    inputChange(event) {
        //console.log(event.target.value);
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Form className="col-md-12" onSubmit={this.submitHandler}>
                    <Form.Group className="mb-3" controlId="form">
                        <Form.Control ref={this.messagesEndRef} controlId="formArea" as="textarea" rows="10" readOnly={true} value={this.state.messages} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Control as="textarea" placeholder="Napiš něco..." value={this.state.value} onChange={this.inputChange} />
                        <Button variant="primary" type="submit">Odeslat</Button>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }
}

export default ChatPage;