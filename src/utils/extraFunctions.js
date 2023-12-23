export const getRandomMovieObjectNumber = () => {
    return Math.floor(Math.random() * 5) + 1; // Generates a random number between 1 and 20 (assuming 20 movie objects)
};

export   const getRandomPageNumber = (numOfPages) => {
    return Math.floor(Math.random() * numOfPages) + 1; 
};

export const createLinkText = (title, id, checked) => { 
    if (title === undefined || id === undefined) {
        return ''; 
      }
      const type = checked ? 'tv' : 'movie';
      const fullLinktext = `${type}-${title}-${id}`;
      const linktext = fullLinktext.toLowerCase().replace(/\s+/g, '-');
    return linktext
  }

export const getGenreNamesByIds = (ids) => {
  const genresData = {
      "genres": [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]
    }
  return ids.map((id) => {
    const genre = genresData.genres.find((genre) => genre.id === id);
    return genre ? genre.name : "Genre not found";
  });
};

export const ArraySlicer = (arr) => { 
  if (arr === undefined) {
    return []
  }
  return arr.slice(0, 8)
}