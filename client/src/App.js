import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from './Chat';

class App extends Component {

  state = {
    token: null
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ChatPage />} exact />
        </Routes>
      </BrowserRouter>
    );
  };
}

export default App;

