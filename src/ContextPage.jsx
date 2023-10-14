import { createContext, useState } from "react";

const ContextPage = createContext();

export function ContextProvider({ children }) {
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(28);
  const [currentCategory, setCurrentCategory] = useState("Genres");
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };
  function addFav(added) {
    setFavoriteMovies([...favoriteMovies, added]);
    saveToLocalStorage([...favoriteMovies, added]);
  }
  function removeFav(removed) {
    const newFavList = favoriteMovies.filter(function (removedMovie) {
      return removedMovie.id !== removed.id;
    });
    setFavoriteMovies(newFavList);
    saveToLocalStorage(newFavList);
  }

  return (
    <ContextPage.Provider
      value={{
        genres,
        page,
        setPage,
        totalPages,
        setTotalPages,
        searchTerm,
        setSearchTerm,
        favoriteMovies,
        setFavoriteMovies,
        currentGenre,
        setCurrentGenre,
        currentCategory,
        setCurrentCategory,
        addFav,
        removeFav,
        saveToLocalStorage,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextPage;
