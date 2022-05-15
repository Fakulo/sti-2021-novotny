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

    /**
     * Funkce zneviditelní tlačítko pro odesílání.
     */
    setVisibility = () => {
        this.setState({ buttonDisabled: false });
    }

    /**
     * Funkce pro odeslání zprávy.
     * 
     * @param {*} event 
     */
    submitHandler = (event) => {
        let timer;
        event.preventDefault();
        const text = this.state.value.replace(/\n/g, " ");

        if ((!text || text.trim() === "" || (text.trim()).length === 0)) {
            this.setState({ value: "" });
            return;
        } else {
            this.setState({ messages: this.state.messages + "Uživatel: " + text + "\n" });
            clearTimeout(timer);
            timer = setTimeout(this.setVisibility, 2000);
            this.setState({ buttonDisabled: true });
        }

        const requestBody = {
            query: `
                query {
                    userQuery(messageInput: {text: "${text}"}) 
                }
            `
        };
        //fetch('https://sti-server.vercel.app/graphql', {
        //fetch('http://localhost:5000/graphql', {
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
                this.setState({ value: "" });
            })

            .catch(err => {
                console.log(err.message);
                const noConnectionText = "Server: Momentálně si dávám šlofíčka. Zkus to prosím později, nebo popožeň správce serveru, ať mě probudí.";
                this.setState({ messages: this.state.messages + noConnectionText + "\n" });
                this.setState({ value: "" });
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
            <React.Fragment >
                <h2 className="p-3">Chatovací aplikace</h2>
                <Form className="col-md-12 p-3 pt-0" onSubmit={this.submitHandler} >
                    <Form.Group className="mb-3" controlId="form">
                        <Form.Control data-testid="receive-textarea" ref={this.messagesEndRef} as="textarea" rows="10" readOnly={true} value={this.state.messages} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Control data-testid="send-textarea" as="textarea" placeholder="Napiš něco..." value={this.state.value} onChange={this.inputChange} />
                        <Button data-testid="send-button" className="mt-2" variant="primary" type="submit" disabled={this.state.buttonDisabled}>Odeslat</Button>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }
}

export default ChatPage;