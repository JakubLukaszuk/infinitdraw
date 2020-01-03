import React, {Component} from 'react';
import {compose} from 'recompose';
import {withAuthorization, withEmailVerification, AuthUserContext} from '../Session';
import {withFirebase} from '../Firebase';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Messages/>
  </div>
);

class MessagesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      text: '',
      messages: []
    };
  }

  onChangeText = event => {
    this.setState({text: event.target.value});
  };

  onCreateMessage = (event, authUser) => {
    this
      .props
      .firebase
      .messages()
      .push({text: this.state.text, userId: authUser.uid});
    this.setState({text: ''});
    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;
    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
    });
  };

  componentDidMount() {
    this.setState({loading: true});
    this
      .props
      .firebase
      .messages()
      .on('value', snapshot => {
        const messageObject = snapshot.val();
        if (messageObject) {
          // convert messages list from snapshot
          const messageList = Object
            .keys(messageObject)
            .map(key => ({
              ...messageObject[key],
              uid: key
            }));
          this.setState({messages: messageList, loading: false});
        } else {
          this.setState({messages: null, loading: false});
        }
      });

      this
      .props
      .firebase
      .gameBaseValues()
      .on('value', snapshot => {
        const messageObject = snapshot.val();
        if (messageObject) {
        }
      });
  }
  componentWillUnmount() {
    this
      .props
      .firebase
      .messages()
      .off();
  }
  render() {
    const {text, messages, loading} = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}
            {messages
              ? (<MessageList messages={messages} onEditMessage={this.onEditMessage}/>)
              : (
                <div>There are no messages ...</div>
              )}
            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input type="text" value={text} onChange={this.onChangeText}/>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({messages, onEditMessage}) => (
  <ul>
    {messages.map(message => (<MessageItem key={message.uid} message={message} onEditMessage={onEditMessage}/>))}
  </ul>
);

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.message.text
    };
  }
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text
    }));
  };
  onChangeEditText = event => {
    this.setState({editText: event.target.value});
  };

  onSaveEditText = () => {
    this
      .props
      .onEditMessage(this.props.message, this.state.editText);
    this.setState({editMode: false});
  };

  render() {
    const {message, onRemoveMessage} = this.props;
    const {editMode, editText} = this.state;
    return (
      <li>
        {editMode
          ? (<input type="text" value={editText} onChange={this.onChangeEditText}/>)
          : (
            <span>
              <strong>{message.userId}</strong>
              {message.text}
            </span>
          )}
        {editMode
          ? (
            <span>
              <button onClick={this.onSaveEditText}>Save</button>
              <button onClick={this.onToggleEditMode}>Reset</button>
            </span>
          )
          : (
            <button onClick={this.onToggleEditMode}>Edit</button>
          )}
      </li>
    );
  }

}

const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition),)(HomePage);