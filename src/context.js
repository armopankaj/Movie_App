
import React, { useContext, useEffect, useState } from "react";

export const API_KEY = '?api_key=55903b004b65252bf433fb4218601d2c'
export const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc'
export const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc'


const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [movie, setMovie] = useState([]);
    //To display an error when the movie does not load(have some error in this not displaying rightnow)
    //Have to check some conditions
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const scrollToend = () => {
        setPage((p) => {
            return p + 1;
        });
        console.log('to check');
        console.log(page);
    }



    useEffect(() => {
        let timeOut = setTimeout(() => {
            displayMovies(query);

        }, 500);
        //debouncing waiting before making an api call and if the user
        //comes back clearing the return function before the call
        return () => clearTimeout(timeOut);
    }, [query, page])


    useEffect(() => {
        window.onscroll = function () {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                scrollToend();
                console.log('inside window');


            }
        }

    }, [])
    // this is to load the default page according to the query
    const displayMovies = async (query) => {
        if (query) {
            const url = `${SEARCH_URL}&page=${page}&query=${query}`
            const res = await fetch(url)
            const data = await res.json()
            if (page === 1) {
                setMovie(() => {
                    return [...data.results]
                })
            }
            else {
                setMovie((mov) => {
                    return [...mov, ...data.results]
                })
            }
            // setMovie([...movie, ...data.results])
        }
        else {
            const url = `${API_URL}&page=${page}`
            console.log(url)
            const res = await fetch(url);
            const data = await res.json();
            setMovie((mov) => {
                return [...mov, ...data.results]
            });
            console.log(data.results, 'this is the checkpoint');
        }

    }
    // We are passing the variable to all the children where we can access and update them
    return (<AppContext.Provider value={{ isLoading, isError, movie, query, setQuery, setPage }}>
        {children}
    </AppContext.Provider>);

};


//will be using this global context to access variables
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext }
