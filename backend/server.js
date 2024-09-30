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
  dateCreated: { type: Date, default: Date.now }, // Ensure to include dateCreated
  createdBy: mongoose.Schema.Types.ObjectId,
  songs: [mongoose.Schema.Types.ObjectId],
  comments: [{ user: mongoose.Schema.Types.ObjectId, text: String, date: { type: Date, default: Date.now } }], // Define comments as an array of objects
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

// Create models
const PlayList = mongoose.model('PlayList', PlaylistSchema, 'playlists');
const User = mongoose.model('User', UserSchema, 'users');
const Song = mongoose.model('Song', SongSchema, 'songs');

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
    const playlist = await PlayList.findById(id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
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
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Check password (you might want to hash passwords and check hashed values in a production app)
    if (user.password !== password) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    res.status(200).send(user); // Send back user data upon successful login
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { fullName, email, password, username, surname, profileImage } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use' });
    }

    // Create new user
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

    await newUser.save(); // Save user to the database
    res.status(201).send({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, profileImage, password, oldPassword } = req.body; // Include oldPassword in the request

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password matches the stored password only if the password is being updated
    if (password && oldPassword !== user.password) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }

    // Update user data
    if (username) user.username = username;
    if (profileImage) user.profileImage = profileImage;
    if (password) {
      user.password = password; // Set new password (consider hashing this later)
    }

    // Save the updated user
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
      dateCreated: dateCreated || new Date(), // Use provided date or current date
      createdBy: userId, // Ensure you save the userId who created the playlist
      songs: [], // Initialize with an empty array or handle it according to your logic
      comments: [], // Initialize comments as an empty array
    });

    await newPlaylist.save();
    res.status(201).json(newPlaylist); // Send the created playlist back to the client
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
      { new: true } // Return the updated document
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
    // Find and delete the playlist
    const deletedPlaylist = await PlayList.findByIdAndDelete(id);
    
    if (!deletedPlaylist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Assuming you have a way to get the user ID (either from the request or as part of the playlist)
    const userId = deletedPlaylist.userId; // Adjust this to your actual logic

    // Remove playlist reference from the user
    await User.findByIdAndUpdate(userId, { $pull: { playlists: id } });

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ message: 'Error deleting playlist' });
  }
});

app.post('/api/logout', (req, res) => {
  // Implement your session or token invalidation logic here.
  // For example, if using sessions, destroy the session:
  // req.session.destroy(err => { ... });
  
  // If using JWT, you can just inform the client to remove the token.
  res.status(200).json({ message: 'Logged out successfully' });
});


app.delete('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId); // Delete the user

    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});



app.use(express.static(path.join(__dirname, '..', '..', 'frontend/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend/public', 'index.html')); // Ensure this points to your correct index.html
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
