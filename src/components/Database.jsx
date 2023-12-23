import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/FirebaseConfig';

export default function Database() {
    const [moviesList, setMoviesList] = useState([]);
    const [moviesTitle, setMoviesTitle] = useState("");
    const [moviesYears, setMoviesYears] = useState(0);
    const [receivedOscar, setReceivedOscar] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    

    // this is to refer to the collection name from the firestore database
    const q = collection(db, "movies");

    const getMovieList = async () => {
        try {
            // now fetching the document directly from firebase database
            const data = await getDocs(q)
            // This is to fetch the documenet from the main collection 
            const filteredDoc = data.docs.map(doc => {
                return({
                    ...doc.data(),
                    id : doc.id
                })
            })
            setMoviesList(filteredDoc);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovieList()

    }, [])

    const handleMovies = async () => {
        try {
            await addDoc(q, {
                title : moviesTitle,
                releaseDate : moviesYears,
                receivedOscar : receivedOscar,
                userId : auth?.currentUser?.uid
            })
            .then(res => {
                getMovieList();
            })
            .catch(err => {
                console.log(err)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMovies = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc);
            // Call getMovieList after the deletion is complete
            getMovieList();
        } catch (error) {
            console.log(error);
        }
    };

    const updateMovieTitle = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id);
            await updateDoc(movieDoc, {
                title : updatedTitle
            });
            // Call getMovieList after the deletion is complete
            getMovieList();
        } catch (error) {
            console.log(error.message);
        }
    }
    

  return (
    <div>
        <div>
            <input 
                type="text" 
                placeholder='Movies Title'
                onChange={(e) => setMoviesTitle(e.target.value)}
            />
            <input 
                type="number" 
                placeholder='Movies year'
                onChange={(e) => setMoviesYears(Number(e.target.value))}
            />
            <input 
                type="checkbox" 
                checked={receivedOscar}
                onChange={e => setReceivedOscar(e.target.checked)}
            />
            <span>Received an Oscar</span>
            <br />
            <button onClick={handleMovies}>Submit</button>
        </div>
      {
        moviesList.map((movies) => {
            return(
                <div key={movies.id}>
                    <h3 style={{color : `${movies.receivedOscar ? "green" : "red"}`}}>{movies.title}</h3>
                    <h4>{movies.releaseDate}</h4>
                    <button onClick={() => deleteMovies(movies.id)}>Delete movie</button>
                    <input 
                        type="text" 
                        placeholder='new title...' 
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <button onClick={() => updateMovieTitle(movies.id)}>Update Title</button>
                </div>
            )
        })
      }
    </div>
  )
}
