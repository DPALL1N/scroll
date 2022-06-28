import './App.css';
import React, {useEffect, useState} from "react";
import axios from 'axios'

function App() {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [photos, setPhotos] = useState([])
    const [users, setUsers] = useState([])
    const [albums, setAlbums] = useState([])
    const [updating, setUpdating] = useState(true)
    const [page, setPage] = useState(0)
    let lastPage = 0
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            setUsers(res.data)
        })
        axios.get('https://jsonplaceholder.typicode.com/albums').then((res) => {
            setAlbums(res.data)
        })
    }, [])
    useEffect(() => {
        if (updating) {
            axios.get('https://jsonplaceholder.typicode.com/photos?limit=5&_page=' + page).then((res) => {
                setPhotos([...photos, ...res.data])
                setPage((page) => page + 1)
            }).finally(() => {
                setUpdating(false)
            })
        }
    }, [updating])
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollTop + window.innerHeight > e.target.documentElement.scrollHeight - 200) {
            setUpdating(true)
        }
    }
    return (
        <div className="App" style={{textAlign: 'left', marginLeft: 100 + 'px'}}>
            {photos.map(photo =>
                <div>
                    <h2>{users[albums[photo.albumId].userId].username}</h2>
                    <h3>{users[albums[photo.albumId].userId].email}</h3>
                    <h1>{photo.title}</h1>
                    <img src={photo.url} alt=""/>
                    <h1 style={{marginLeft: 1000 + 'px', position: 'absolute', marginTop: -300 + 'px'}}>Бесконечный
                        скролл<br/>В 5000 постов</h1>
                </div>
            )}
        </div>
    );
}

export default App;
