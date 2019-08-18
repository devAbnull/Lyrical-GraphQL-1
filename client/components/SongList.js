import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import gql from "graphql-tag";

import fetchSongsQuery from "../queries/fetchSong";

const x = () => console.log;

class SongList extends React.Component {
  constructor(props) {
    super(props);
  }

  onSongDelete = song => {
    this.props.mutate({
      variables: { id: song.id },
      refetchQueries: [{ query: fetchSongsQuery }]
    });
  };

  renderSongs = () => {
    return this.props.data.songs.map(song => (
      <li key={song.id} className="collection-item">
        {song.title}
        <i className="material-icons" onClick={() => this.onSongDelete(song)}>
          delete
        </i>
      </li>
    ));
  };

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const deleteSongMutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(deleteSongMutation)(graphql(fetchSongsQuery)(SongList));
