import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.endChat = React.createRef();
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    scrollToBottom = () => {
        if(this.endChat.current)
            this.endChat.current.scrollIntoView({ behavior: "smooth" });
      }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats, loadingChats: false });
                this.scrollToBottom();
            });
        } catch (error) {
            this.setState({ readError: error.message, loadingChats: false });
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
                user: this.state.user.email
            });
            this.setState({ content: "" });
            this.scrollToBottom();
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="row mt-2 justify-content-md-center">
                    <div className="col-md-6 mx-2">
                        {this.state.loadingChats === true ? 
                        <div>
                        <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                            </div>
                      :
                            <div className="chat-area row align-items-start">
                                <div className="row chat-content" >
                                    {this.state.chats.map(chat =>
                                        (<div className="container">
                                            <p className={(chat.uid === this.state.user.uid ? "alert alert-secondary float-right" : "alert alert-dark float-left")}
                                                key={chat.timestamp}>
                                                {chat.content}<sub>{chat.user}</sub>
                                            </p></div>)
                                    )}
                                    <div ref={this.endChat}></div>
                                </div>
                            </div>
                        }

                        <div className="row my-2 align-items-end">
                            <div className="col col-md-6">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row form-group">
                                        <textarea className="form-control" onChange={this.handleChange} value={this.state.content}></textarea>
                                    </div>
                                    <div>
                                        <button className="btn btn-dark" type="submit">send</button>
                                    </div>
                                </form>

                                <div className="row my-2 mx-1">
                                    {this.state.writeError ? <p className="col col-md-auto alert alert-danger" role="alert" >{this.state.writeError}</p> : null}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}