import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useUser } from '../userContext'; // Assuming you have a UserContext
import Song from './Song';
import AddSongToPlaylist from './AddSongToPlaylist';
import EditPlaylist from './EditPlaylist';

const Playlist = () => {
  const { id } = useParams(); 
  const { currentUser } = useUser();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); 

  const fetchPlaylistData = async () => {
    if (!id) {
      setError("Playlist ID is not defined");
      setLoading(false);
      return;
    }

    try {
      const playlistResponse = await fetch(`/api/playlists/${id}`);
      if (!playlistResponse.ok) {
        throw new Error(`Error fetching playlist: ${playlistResponse.statusText}`);
      }

      const playlistData = await playlistResponse.json();

      const songResponse = await fetch('/api/songs');
      if (!songResponse.ok) {
        throw new Error(`Error fetching songs: ${songResponse.statusText}`);
      }

      const allSongs = await songResponse.json();
      const playlistSongs = playlistData.songs
        .map(songId => allSongs.find(song => song._id === songId))
        .filter(song => song !== undefined);

      setPlaylist(playlistData);
      setSongs(playlistSongs);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Error loading playlist or songs');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPlaylistData();
  }, [id]);

  const handleAddSongClick = () => {
    setShowAddSongForm(true);
  };

  const handleCancelAddSong = () => {
    setShowAddSongForm(false);
  };

  const handleSongAdded = (song) => {
    fetchPlaylistData();
    setShowAddSongForm(false);
  };

  const handleRemoveSong = async (songId) => {
    try {
      await fetch(`/api/playlists/${playlist._id}/remove-song`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
      });
      fetchPlaylistData();
    } catch (error) {
      console.error('Error removing song from playlist:', error);
    }
  };

  const handleEditPlaylistClick = () => {
    setShowEditForm(true);
  };

  const handleSavePlaylist = (updatedPlaylist) => {
    setPlaylist(updatedPlaylist);
    setShowEditForm(false);
  };

  const handleDelete = async (id) => {
    console.log(`Deleting playlist with ID: ${id}`);
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedSongs = Array.from(songs);
    const [movedSong] = reorderedSongs.splice(result.source.index, 1);
    reorderedSongs.splice(result.destination.index, 0, movedSong);

    setSongs(reorderedSongs);

    // Send reordered list to the server
    try {
      const songIds = reorderedSongs.map(song => song._id);
      await fetch(`/api/playlists/${playlist._id}/reorder-songs`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songIds }), 
      });
    } catch (error) {
      console.error("Error saving reordered songs:", error);
    }
  };

  // Check if the current user is the owner of the playlist or an admin
  const isOwnerOrAdmin = playlist?.createdBy === currentUser?._id || currentUser?.admin;

  if (loading) {
    return <div>Loading playlist...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="playlist-component">
      {playlist.playlistArt && <img src={playlist.playlistArt} alt={`${playlist.name} cover`} style={{ width: '300px', height: '300px' }} onError={() => console.error("Image failed to load")} />}
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>
      {Array.isArray(playlist.tags) && playlist.tags.length > 0 && (  // Check if tags is an array
        <p>
          Tags: {playlist.tags.map(tag => `#${tag}`).join(', ')}
        </p>
      )}

      {isOwnerOrAdmin && (  // Use the new variable to conditionally render buttons
        <>
          <button onClick={handleEditPlaylistClick}>Edit Playlist</button>
          <button onClick={handleAddSongClick}>Add Song</button>
        </>
      )}

      {showAddSongForm && (
        <AddSongToPlaylist
          playlistId={playlist._id}
          songs={songs} 
          onCancel={handleCancelAddSong}
          onSongAdded={handleSongAdded} 
        />
      )}

      {showEditForm && (
        <EditPlaylist
          playlist={playlist}
          onSave={handleSavePlaylist}  
          onDelete={this.handleDeletePlaylist}
          fetchPlaylistData={fetchPlaylistData}      
        />
      )}

      <h3>Songs</h3>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="songs">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {songs.map((song, index) => (
                <Draggable key={song._id} draggableId={song._id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Song key={song._id} id={song._id} name={song.name} artist={song.artist} album={song.album} genre={song.genre} releaseYear={song.releaseYear} duration={song.duration} fetchPlaylistData={fetchPlaylistData}/>
                      {playlist?.createdBy === currentUser?._id && (
                        <button onClick={() => handleRemoveSong(song._id)}>Remove</button>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
};

export default Playlist;
