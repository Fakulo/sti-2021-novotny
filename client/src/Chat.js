import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

class ChatPage extends Component {

    state = {
        messages: []
    }
    /**
     * Funkce přihlásí uživatele.
     * 
     * @param {*} event 
     */
    submitHandler = (event) => {
        event.preventDefault();
        console.log(event.target.formMessage.value);

        const text = "jak se jmenuješ";

        const requestBody = {
            query: `
                query {
                    userQuery(messageInput: {text: "${text}"}) 
                }
            `
        };
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {   
                if (res.status !== 200 && res.status !== 201) {                           
                    return res.json();
                }
            })
            .then(resData => { 
                console.log(resData);
                return resData.data;
            })
            
            .catch(err => {
                console.log(err.message);
            });
    };

    render() {
        return (
            <Form className="col-md-3" onSubmit={this.submitHandler}>
                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>text</Form.Label>
                    <Form.Control type="textarea" placeholder="E-mail" />                    
                </Form.Group>
                <Button variant="primary" type="submit">Odeslat</Button>
            </Form>
        );
    }
}

export default ChatPage;