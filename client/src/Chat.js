import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            messages: '',
            buttonDisabled: false
        };

        this.inputChange = this.inputChange.bind(this);
        this.messagesEndRef = React.createRef();
    }
    /**
     * Funkce skroluje prvek textarea dolů. (Aby byla nová zpráva viditelná.)
     */
    scrollToBottom = () => {
        const body = document.querySelector('#form');
        body.scrollTo(0, body.scrollHeight);        
    }    

    componentDidUpdate() {
        this.scrollToBottom();
    }

    setVisibility = () => {
        this.setState({buttonDisabled: false});
    }    

    /**
     * Funkce pro odeslání zprávy.
     * 
     * @param {*} event 
     */
    submitHandler = (event) => {
        var timer;
        event.preventDefault();        
        const text = event.target.formMessage.value.replace(/\n/g, " ");

        if((!text || text.trim() === "" || (text.trim()).length === 0)){
            this.setState({value: ""});  
            return;      
        }else {
            this.setState({messages: this.state.messages + "Uživatel: " + text + "\n"}); 
            clearTimeout(timer);
            timer = setTimeout(this.setVisibility, 2000);
            this.setState({buttonDisabled: true}); 
            console.log(timer);
        }        

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
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {    
                let tempMessages = this.state.messages + "Server: ";       
                resData.data.userQuery.forEach(message => {                    
                    tempMessages = tempMessages + message + "\n";                 
                });
                this.setState({
                    messages: tempMessages
                });
                this.setState({value: ""});  
            })

            .catch(err => {
                console.log(err.message);
            });
    };
    /**
     * Funkce změní hodnotu vstupního inputu.
     * 
     * @param {*} event 
     */
    inputChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Form className="col-md-12" onSubmit={this.submitHandler}>
                    <Form.Group className="mb-3" controlId="form">
                        <Form.Control ref={this.messagesEndRef} as="textarea" rows="10" readOnly={true} value={this.state.messages} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Control as="textarea" placeholder="Napiš něco..." value={this.state.value} onChange={this.inputChange} />
                        <Button variant="primary" type="submit" disabled={this.state.buttonDisabled}>Odeslat</Button>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }
}

export default ChatPage;