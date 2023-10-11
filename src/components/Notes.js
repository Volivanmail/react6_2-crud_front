import { Component } from 'react';
import NewNote from './NewNote';
import NoteItem from './NoteItem';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.URL = 'http://localhost:7070/notes';
  }

  render() {
    return (
      <>
        <h2>Notes <span className='material-icons refresh' onClick={this.getNotes()}>refresh</span></h2>
        <div className='list-notes'>
          {this.state.notes.map((item) => (
            <NoteItem key={item.id} note={item} onDelete={this.handleDelete} />
          ))}
        </div>
        <NewNote onFormSubmit={this.handleSbmit} />
      </>
    );
  }

  handleDelete = (id) => {
    fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => this.getNotes());
  }

  handleSbmit = (newNote) => {
    fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newNote),
    })
      .then(() => this.getNotes());
  }

  getNotes = () => {
    fetch(this.URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ notes: result });
      });
  }

  componentDidMount() {
    this.getNotes();
  }
}
