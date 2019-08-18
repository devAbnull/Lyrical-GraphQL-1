import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import fetchSongsQuery from "../queries/fetchSong";
import { Link, hashHistory } from "react-router";

class SongCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit = event => {
    event.preventDefault();
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => hashHistory.push("/"))
      .catch(() => {});
  };

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Enter a song title</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
