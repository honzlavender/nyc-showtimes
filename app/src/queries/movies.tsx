import {useEffect, useState} from 'react';
import movies from '../../../json/amc.json';

export const movieQuery = () => {
  const [movieTitle, setMovieTitle] = useState([]);
  const theaters = ['amc', 'angelika', 'williamsburgCinema'];

  const fetchData = async () => {
    try {
      const theaterData = await Promise.all(
        theaters.map(async theater => {
          const response = await fetch(
            `/Users/honzwilliams/Desktop/showtimes/json/${theater}.json`,
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const jsonData = await response.text();
          const parsedData = JSON.parse(jsonData);
          const movies = parsedData.data.theaterShowtimeGroupings.movies;
          //   const showtimes = movies[0].movieVariants[0].amenityGroups[0].showtimes;
          const title = movies?.map((title: {name: any}) => title.name);
          setMovieTitle(title);
        }),
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // fetchShowtimes();
    fetchData();
  }, []);

  return movieTitle;
};
