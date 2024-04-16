import {useEffect, useState} from 'react';
import {TheaterDetails} from './types';

export function getAllTheaters() {
  const [data, setData] = useState<TheaterDetails[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimesApp/json/theaterList.json`,
      );
      if (!response.ok) {
        throw new Error('failed to fetch data');
      }
      const data = await response.json();
      const allTheaters = data.data.theaters;
      const theaterDetails: TheaterDetails[] = allTheaters.map(
        (theater: {
          id: string;
          name: string;
          hasReservedSeating: boolean;
          hasShowtimes: boolean;
          distance: number;
        }) => {
          return {
            theaterId: theater.id,
            theaterName: theater.name,
            hasReservedSeating: theater.hasReservedSeating,
            hasCurrentShowtimes: theater.hasShowtimes,
            distanceFromUserZipcode: theater.distance,
          };
        },
      );
      setData(theaterDetails);
    } catch (error) {
      console.log('error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {data};
}
