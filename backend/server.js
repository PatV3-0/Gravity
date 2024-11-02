const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://rainbirdwebb05:IgnoreThisBull1@gravitymaincluster.0t7iv.mongodb.net/mainDatabase';
const client = new MongoClient(mongoURI);
let db;

client.connect()
  .then(()=>{
    console.log("MongoDB connected");
    db = client.db('mainDatabase');
  })
  .catch(err => console.error("MongoDB connection error:", err));

// API routes
app.get('/api/playlists', async (req, res) => {
  try {
    const playlists = await db.collection('playlists').find().toArray();
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error); 
    res.status(500).json({ message: 'Error fetching playlists' });
  }
});

app.get('/api/playlists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const playlist = await db.collection('playlists').findOne({_id: new ObjectId(id)});
      if(!playlist){
        return res.status(404).json({message: 'Playlist not found'});
      }
      
    res.json(playlist); // Send back the playlist
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ message: 'Error fetching playlist' });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find({}, {projection: {password: 0}}).toArray(); 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.collection('users').findOne({_id: new ObjectId(userId)}, {
      projection: { password: 0 }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    const songs = await db.collection('songs').find().toArray();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { fullName, email, password, username, surname, profileImage } = req.body;

  try {
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = {
      admin: "false",
      username,
      name: fullName,
      surname,
      email,
      password,
      profileImage,
      playlists: [],
      savedplaylists: [],
      followers: [],
      following: []
    };

const result = await db.collection('users').insertOne(newUser);
const createdUser = await db.collection('users').findOne({ _id: result.insertedId }); // Fetch the full user document

res.status(201).json({ message: 'User created successfully', user: createdUser });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.put('/api/playlists/:id/reorder-songs', async (req, res) => {
  const { id } = req.params;
  const { songIds } = req.body;

  try {
    const result = await db.collection('playlists').updateOne(
      { _id: new ObjectId(id) },
      { $set: { songs: songIds } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const updatedPlaylist = await db.collection('playlists').findOne({ _id: new ObjectId(id) });
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    console.error("Error updating song order:", error);
    res.status(500).json({ error: 'Error saving new song order' });
  }
});

app.delete('/api/songs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid song ID format' });
        }
        const result = await db.collection('songs').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ message: 'Error deleting song' });
    }
});

app.post('/api/songs', async (req, res) => {
  const { title, artist, album, genre, releaseYear, duration, spotifyUrl } = req.body;

  try {
    const newSong = {
      name: title,
      artist,
      album,
      genre,
      releaseYear,
      duration,
      spotifyUrl,
    };

    const result = await db.collection('songs').insertOne(newSong);
    res.status(201).json({ ...newSong, _id: result.insertedId }); // Return the new song with its ID
  } catch (error) {
    console.error('Error adding new song:', error);
    res.status(500).json({ message: 'Error adding new song' });
  }
});


app.put('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, profileImage, password, oldPassword } = req.body;

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password && oldPassword !== user.password) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }

    const updates = {};
    if (username) updates.username = username;
    if (profileImage) {
      const isValidUrlOrBase64 = profileImage.startsWith('http') || profileImage.startsWith('data:image/');
      if (!isValidUrlOrBase64) {
        return res.status(400).json({ message: 'Profile image must be a valid URL or base64 string.' });
      }
      updates.profileImage = profileImage;
    }
    if (password) updates.password = password;

    const updatedUser = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updates },
      { returnOriginal: false }
    );

    if (!updatedUser.value) {
      return res.status(200).json({ message: 'No changes were made.' });
    }

    res.json(updatedUser.value);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.get('/api/users/:userId/savedPlaylists', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { savedplaylists: 1 } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedPlaylists = await db.collection('playlists').find({ _id: { $in: user.savedplaylists.map(id => new ObjectId(id)) } }).toArray();
    
    res.json(savedPlaylists);
  } catch (error) {
    console.error('Error fetching saved playlists:', error);
    res.status(500).json({ message: 'Error fetching saved playlists' });
  }
});

app.post('/api/playlists/:id/save', async (req, res) => {
  const playlistId = req.params.id;
  const userId = req.body.userId;

  try {
    // Find the playlist using the MongoDB collection
    const playlist = await db.collection('playlists').findOne({ _id: new ObjectId(playlistId) });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Find the user and update their savedPlaylists
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedList = await db.collection('users.savedplaylists').findOne({ _id: new ObjectId(playlistId) });
    if (savedList) {
      return res.status(404).json({ message: 'Playlist already added' });
    }

    // Add the playlist to the user's savedPlaylists
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { savedplaylists: playlistId } } // Update the user's savedPlaylists in the database
    );

    res.status(200).json({ message: 'Playlist saved successfully', playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/playlists', async (req, res) => {
  const { userId, playlistName, description, playlistArt, tags, genre } = req.body; // Destructure additional fields
  try {
    const newPlaylist = {
      name: playlistName,
      description: description,
      dateCreated: new Date(),
      createdBy: userId,
      playlistArt: playlistArt || '',
      tags: tags || [], 
      genre: genre || [], 
      songs: [],
      comments: [],
    };

    // Insert the new playlist
    const result = await db.collection('playlists').insertOne(newPlaylist);

    // Update the user's document to include the new playlist ID
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { playlists: result.insertedId } } // Add the playlist ID to the user's playlists array
    );

    res.status(201).json(result.insertedId);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Error creating playlist' });
  }
});

app.post('/api/users/:userId/removeFriend', async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;

    try {
        // Remove friendId from the user's friends list
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { friends: friendId } } // Remove the friendId from the friends array
        );

        // Optionally, you might want to also remove userId from the friend's friends list
        await db.collection('users').updateOne(
            { _id: new ObjectId(friendId) },
            { $pull: { friends: userId } } // Remove the userId from the friend's friends array
        );

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ message: 'Error removing friend' });
    }
});

app.delete('/api/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    const result = await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Optionally, remove comment ID from playlist's comments array
    await db.collection('playlists').updateOne(
      { comments: new ObjectId(commentId) },
      { $pull: { comments: new ObjectId(commentId) } }
    );

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

app.post('/api/comments/:id/like', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid comment ID format' });
  }

  try {
    const result = await db.collection('comments').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ message: 'Error liking comment' });
  }
});

app.post('/api/comments/:id/dislike', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid comment ID format' });
  }

  try {
    const result = await db.collection('comments').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { dislikes: 1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment disliked successfully' });
  } catch (error) {
    console.error('Error disliking comment:', error);
    res.status(500).json({ message: 'Error disliking comment' });
  }
});


app.put('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, genre, tags, playlistArt } = req.body;

  try {
    const updatedPlaylist = {
      name,
      description,
      genre,
      tags,
      playlistArt,
    };

    const result = await db.collection('playlists').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPlaylist }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json(updatedPlaylist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ message: 'Error updating playlist' });
  }
});


app.delete('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection('playlists').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(204).send(); // No content to return
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ message: 'Error deleting playlist' });
  }
});

app.post('/api/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await db.collection('users').findOne({_id: new ObjectId(userId)});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.collection('playlists').deleteMany({ createdBy: new ObjectId(userId) });
    await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

    res.json({ message: 'User and all associated playlists deleted successfully' });
  } catch (error) {
    console.error('Error deleting user and playlists:', error);
    res.status(500).json({ message: 'Error deleting user and playlists' });
  }
});

app.post('/api/friend/:userId', async (req, res) => {
  const { userId } = req.params;
  const { currentUserId } = req.body;

  try {
    // Update the current user's following list
    await db.collection('users').updateOne(
      { _id: new ObjectId(currentUserId) },
      { $addToSet: { following: userId } } // Add userId to the current user's following list
    );

    // Update the target user's followers list
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { followers: currentUserId } } // Add currentUserId to the target user's followers list
    );

    // Optionally return the updated user data
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(currentUserId) });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Error adding friend' });
  }
});

app.post('/api/unfriend/:userId', async (req, res) => {
  const { userId } = req.params;
  const { currentUserId } = req.body;

  try {
    // Remove userId from the current user's following list
    await db.collection('users').updateOne(
      { _id: new ObjectId(currentUserId) },
      { $pull: { following: userId } } // Remove userId from following
    );

    // Remove currentUserId from the target user's followers list
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { followers: currentUserId } } // Remove currentUserId from followers
    );

    // Optionally return the updated user data
    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(currentUserId) });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ message: 'Error removing friend' });
  }
});


app.put('/api/playlists/:id/add-song', async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const playlist = await db.collection('playlists').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $addToSet: { songs: new ObjectId(songId) } }, // Add song only if it's not already in the list
      { returnOriginal: false }
    );

    if (!playlist.value) {
      return res.status(200).json({ message: 'Playlist not found' });
    }

    res.json(playlist.value);
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ message: 'Error adding song to playlist' });
  }
});

// Remove a song from the playlist
app.put('/api/playlists/:id/remove-song', async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const playlist = await db.collection('playlists').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $pull: { songs: new ObjectId(songId) } },
      { returnOriginal: false }
    );

    if (!playlist.value) {
      return res.status(200).json({ message: 'Playlist not found' });
    }

    res.json(playlist.value);
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    res.status(500).json({ message: 'Error removing song from playlist' });
  }
});

app.get('/api/playlists/:id/comments', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const playlist = await db.collection('playlists').findOne({ _id: new ObjectId(id) });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const comments = await db.collection('comments').find({ _id: { $in: playlist.comments } }).toArray();
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

app.post('/api/playlists/:playlistId/comments', async (req, res) => {
  const { playlistId } = req.params;
  const { userId, text } = req.body;

  try {
    const comment = {
      user: new ObjectId(userId),
      text,
      date: new Date(),
      likes: 0,        // Initialize likes
      dislikes: 0,     // Initialize dislikes
    };

    const result = await db.collection('comments').insertOne(comment);

    // Update the playlist to include the new comment's ID
    await db.collection('playlists').updateOne(
      { _id: new ObjectId(playlistId) },
      { $push: { comments: result.insertedId } }
    );

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

app.get('/api/comments/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const comment = await db.collection('comments').findOne({ _id: new ObjectId(id) });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ message: 'Error fetching comment' });
  }
});

app.get('/api/users/:userId/playlists', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const playlists = await db.collection('playlists').find({ _id: { $in: user.playlists } }).toArray();
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching user's playlists:", error);
    res.status(500).json({ message: 'Error fetching playlists' });
  }
});


app.use(express.static(path.join(__dirname, '..', '..', '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
