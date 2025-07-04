import React, { useState, useEffect } from 'react';

function App() {
  const [songs, setSongs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const BACKEND_URL = 'https://your-backend-url.up.railway.app'; // Replace with your Railway URL

  useEffect(() => {
    fetch(`${BACKEND_URL}/songs`)
      .then(res => res.json())
      .then(data => setSongs(data));
  }, [BACKEND_URL]);

  const handleUpload = async () => {
    if (!file || !title || !artist) {
      alert("Fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("artist", artist);

    await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData
    });

    const res = await fetch(`${BACKEND_URL}/songs`);
    const data = await res.json();
    setSongs(data);

    setTitle('');
    setArtist('');
    setFile(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">🎶 My Music Uploader</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border m-1 p-1"/>
      <input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artist" className="border m-1 p-1"/>
      <input type="file" accept="audio/mp3" onChange={e => setFile(e.target.files[0])} className="m-1"/>
      <button onClick={handleUpload} className="bg-blue-500 text-white p-1 rounded">Upload</button>

      <div className="mt-4">
        {songs.map(song => (
          <div key={song._id} className="mb-2">
            <p>{song.title} - {song.artist}</p>
            <audio controls src={song.fileUrl}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
