import {useEffect, useState} from 'react';
import {MovieShowtimes} from './useGetMovieDetails';

export interface TheaterDetails {
  id: string;
  theaterName: string;
  hasShowtimes: boolean;
  hasReservedSeating: boolean;
  distance: number;
  movieShowtimes: MovieShowtimes[];
}

interface ExtendedMovie extends MovieShowtimes {
  theaterName: string;
}
//actual API url
// const url = 'https://flixster.p.rapidapi.com/theaters/list?zipCode=11221&radius=10';
export const getTheaterList = (showtimes: MovieShowtimes[]) => {
  const [theaterDetails, setTheaterDetails] = useState<TheaterDetails[]>([]);
  const [theaterId, setTheaterId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimes/json/theaterList.json`,
      );
      if (!response.ok) {
        throw new Error('oops failed to fetch ;/');
      }
      const data = await response.json();
      const theaters = data.data.theaters;
      const theaterId = theaters.map((theater: {id: string}) => theater.id);
      const theaterData = theaters.map(
        (theater: {
          id: any;
          name: any;
          hasShowtimes: string;
          hasReservedSeating: any;
          distance: any;
          movieShowtimes: MovieShowtimes[];
        }) => ({
          id: theater.id,
          theaterName: theater.name,
          hasShowtimes: theater.hasShowtimes === 'true', // Convert string to boolean
          hasReservedSeating: theater.hasReservedSeating,
          distance: theater.distance,
          movieShowtimes: showtimes,
        }),
      );
      setTheaterId(theaterId);
      setTheaterDetails(theaterData);
    } catch (error) {
      console.log('errrrrro', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {theaterDetails, theaterId};
};
