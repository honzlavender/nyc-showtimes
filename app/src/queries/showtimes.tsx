import {SetStateAction, useEffect, useState} from 'react';

type ShowtimeData = {
  providerTime: string;
  providerDate: string;
};

export const showtimesQuery = () => {
  const [showtimes, setShowtimes] = useState<string[]>([]);
  const [showdates, setShowdates] = useState<string[]>([]);
  const theaters: string[] = ['amc', 'angelika', 'williamsburgCinema'];

  const fetchData = async () => {
    try {
      const timeArray: string[] = [];
      const datesArray: string[] = [];
      await Promise.all(
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
          movies.forEach((movie: {movieVariants: any[]}) => {
            movie.movieVariants.forEach(
              (movieVariant: {amenityGroups: any[]}) => {
                movieVariant.amenityGroups.forEach(
                  (amenityGroup: {showtimes: ShowtimeData[]}) => {
                    amenityGroup.showtimes.forEach((showtime: ShowtimeData) => {
                      timeArray.push(showtime.providerTime);
                      datesArray.push(showtime.providerDate);
                    });
                  },
                );
              },
            );
          });
        }),
      );
      setShowtimes(timeArray);
      setShowdates(datesArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // fetchShowtimes();
    fetchData();
  }, []);

  return {showtimes, showdates};
};
