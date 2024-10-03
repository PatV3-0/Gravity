const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://rainbirdwebb05:IgnoreThisBull1@gravitymaincluster.0t7iv.mongodb.net/mainDatabase';
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define schemas
const PlaylistSchema = new mongoose.Schema({
  name: String,
  description: String,
  dateCreated: { type: Date, default: Date.now },
  createdBy: mongoose.Schema.Types.ObjectId,
  songs: [mongoose.Schema.Types.ObjectId],
  comments: [mongoose.Schema.Types.ObjectId],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  profileImage: String,
  surname: String,
  password: String,
  email: String,
  playlists: [mongoose.Schema.Types.ObjectId],
  friends: [mongoose.Schema.Types.ObjectId]
});

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  releaseYear: Number,
  duration: String,
  albumArt: String
});

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'PlayList' }, // Reference to the PlayList model
  text: String,
  date: { type: Date, default: Date.now }
});

// Create models
const PlayList = mongoose.model('PlayList', PlaylistSchema, 'playlists');
const User = mongoose.model('User', UserSchema, 'users');
const Song = mongoose.model('Song', SongSchema, 'songs');
const Comment = mongoose.model('Comment', CommentSchema, 'comments');

// API routes
app.get('/api/playlists', async (req, res) => {
  try {
    const playlists = await PlayList.find();
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error); 
    res.status(500).json({ message: 'Error fetching playlists' });
  }
});

app.get('/api/playlists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await PlayList.findById(id)
      .populate('songs')
      .populate('comments'); // Populate comments with user information

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist); // Send back the playlist
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ message: 'Error fetching playlist' });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId); 

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
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({
      username,
      name: fullName,
      surname,
      email,
      password, 
      profileImage,
      playlists: [],
      friends: [],
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  const { username, profileImage, password, oldPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password && oldPassword !== user.password) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }

    if (username) user.username = username;
    if (profileImage) user.profileImage = profileImage;
    if (password) user.password = password;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.post('/api/playlists', async (req, res) => {
  const { userId, playlistName, description, dateCreated } = req.body;
  try {
    const newPlaylist = new PlayList({
      name: playlistName,
      description: description,
      dateCreated: dateCreated || new Date(),
      createdBy: userId,
      songs: [],
      comments: [],
    });

    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Error creating playlist' });
  }
});

app.put('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedPlaylist = await PlayList.findByIdAndUpdate(
      id, 
      { name, description }, 
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(updatedPlaylist);
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ message: 'Error updating playlist' });
  }
});

app.delete('/api/playlists/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlaylist = await PlayList.findByIdAndDelete(id);
    
    if (!deletedPlaylist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const userId = deletedPlaylist.userId;
    await User.findByIdAndUpdate(userId, { $pull: { playlists: id } });

    res.json({ message: 'Playlist deleted successfully' });
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await PlayList.deleteMany({ createdBy: userId });
    await user.deleteOne();

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
    const user = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!user || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add current user to the friend's list
    user.friends.push(currentUser._id);
    await user.save();

    // Optionally, add this user to the current user's friend list as well
    currentUser.friends.push(user._id);
    await currentUser.save();

    res.json(currentUser); // Return updated current user
  } catch (error) {
    console.error('Error friending user:', error);
    res.status(500).json({ message: 'Error friending user' });
  }
});

app.post('/api/unfriend/:userId', async (req, res) => {
  const { userId } = req.params;
  const { currentUserId } = req.body;

  try {
    const user = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!user || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove current user from the friend's list
    user.friends.pull(currentUser._id);
    await user.save();

    // Optionally, remove this user from the current user's friend list as well
    currentUser.friends.pull(user._id);
    await currentUser.save();

    res.json(currentUser); // Return updated current user
  } catch (error) {
    console.error('Error unfriending user:', error);
    res.status(500).json({ message: 'Error unfriending user' });
  }
});


app.put('/api/playlists/:id/add-song', async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;

  try {
    const playlist = await PlayList.findByIdAndUpdate(
      id,
      { $addToSet: { songs: songId } }, // Add song only if it's not already in the list
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ message: 'Error adding song to playlist' });
  }
});

// Remove a song from the playlist
app.put('/api/playlists/:id/remove-song', async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;

  try {
    const playlist = await PlayList.findByIdAndUpdate(
      id,
      { $pull: { songs: songId } }, // Remove song from the list
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    res.status(500).json({ message: 'Error removing song from playlist' });
  }
});

app.get('/api/playlists/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the playlist by ID and populate the comments with user details
    const playlist = await PlayList.findById(id)
      .populate({
        path: 'comments', // Populate comments
        populate: { path: 'user', select: 'username' } // Within each comment, populate the 'user' field
      });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Return only the populated comments array
    res.status(200).json(playlist.comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

app.post('/api/playlists/:playlistId/comments', async (req, res) => {
  const { playlistId } = req.params;
  const { userId, text } = req.body;

  try {
    const comment = new Comment({
      user: userId,
      text,
      date: new Date(),
    });

    await comment.save();

    // Update the playlist to include the new comment
    await PlayList.findByIdAndUpdate(playlistId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

app.get('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve static files from React app build
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

// Catch-all handler for serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
