import {useEffect, useState} from 'react';

export interface TheaterInfo {
  theaterName: string;
  hasShowtimes: boolean;
  hasReservedSeating: boolean;
  distance: number;
}

export interface TheaterDetails {
  id: string;
  theaterName: string;
  hasShowtimes: boolean;
  hasReservedSeating: boolean;
  distance: number;
}
export const useGetTheaterById = (theaterId: string) => {
  const [theaterName, setTheaterName] = useState('');
  const [hasShowtimes, setHasShowtimes] = useState(false);
  const [hasReservedSeating, setHasReservedSeating] = useState(false);
  const [distance, setDistance] = useState(0);

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
      const theaterById = theaters.find(
        (theater: {id: string}) => theater.id === theaterId,
      );
      if (theaterById) {
        const {name, hasShowtimes, hasReservedSeating, distance} = theaterById;
        setTheaterName(name);
        setHasShowtimes(hasShowtimes);
        setHasReservedSeating(hasReservedSeating);
        setDistance(distance);
      }
    } catch (error) {
      console.log('errrrrro', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {theaterName, hasReservedSeating, hasShowtimes, distance};
};

export const getTheaterList = () => {
  const [theaterList, setTheaterList] = useState<TheaterDetails[]>([]);
  const [theaterId, setTheaterId] = useState('');
  //actual API url
  // const url = 'https://flixster.p.rapidapi.com/theaters/list?zipCode=11221&radius=10';
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
        }) => ({
          id: theater.id,
          theaterName: theater.name,
          hasShowtimes: theater.hasShowtimes === 'true', // Convert string to boolean
          hasReservedSeating: theater.hasReservedSeating,
          distance: theater.distance,
        }),
      );
      setTheaterId(theaterId);
      setTheaterList(theaterData);
    } catch (error) {
      console.log('errrrrro', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {theaterList, theaterId};
};
