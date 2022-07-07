import React from 'react'
import { useGlobalContext } from './context'

const Search = () => {
    const { query, setQuery, isError, setPage } = useGlobalContext();
    return (
        <>
            <section className='search-section'>
                <h2> Search your movie here</h2>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input type="text" placeholder='Search Here' value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }

                            } />
                    </div>
                </form>
                <div className='card-error'>
                    <p>{isError.show && isError.msg}</p>
                </div>
            </section>
        </>
    )
}

export default Search
