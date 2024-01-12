import moment from 'moment';
import {useEffect, useState} from 'react';

export interface MovieInfo {
  displayDate: string;
  movieName: string;
  movieTimes: string[];
  duration: number;
  tomatoRating: number;
  motionPictureRating: string;
  releaseDate: string;
  posterImage: string;
  amenities: string[];
}

export const useGetMoviesShowtimesDates = (theaterId: string) => {
  const [movieShowtimes, setMovieShowtimes] = useState<MovieInfo[]>([]);
  const [movieName, setMovieName] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimes/json/${theaterId}.json`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.text();
      const parsedData = JSON.parse(jsonData);
      const displayDate = parsedData.data.theaterShowtimeGroupings.displayDate;
      const movies = parsedData.data.theaterShowtimeGroupings.movies;

      const movieTimesMap = new Map<string, string[]>();
      movies.forEach(
        (movie: {
          name: string;
          duration: number;
          ratings: {tomatoRating: number};
          releaseDate: string;
          posterImage: string;
          movieVariants: {motionPictureRating: string; amenityGroups: any[]}[];
        }) => {
          const movieName: string = movie.name;
          const movieTimes: {dateTime: Date; formattedTime: string}[] = [];
          const amenities: string[] = [];
          let hasOpenCaption = false;

          movie.movieVariants.forEach((variant: {amenityGroups: any[]}) => {
            variant.amenityGroups.forEach(group => {
              const hasOpenCaptions = group.amenities.find(
                (amenity: {name: string}) => amenity.name === 'Open caption',
              );
              if (hasOpenCaptions) {
                hasOpenCaption = true;
                amenities.push('Open Caption')
              }
              group.showtimes.forEach(
                (showtime: {
                  isOpenCaption: boolean;
                  providerDate: string;
                  providerTime: string;
                }) => {
                  const timeFormat = `${showtime.providerDate} ${showtime.providerTime}`;
                  const isOpenCaption = showtime.isOpenCaption
                    ? ' (Open Caption)'
                    : '';
                  const formattedTime = moment(timeFormat).format('LT');
                  const displayTime = `${formattedTime}${isOpenCaption}`;
                  movieTimes.push({
                    dateTime: moment(
                      timeFormat,
                      'YYYY-MM-DD HH:mm:ss',
                    ).toDate(),
                    formattedTime: displayTime,
                  });
                },
              );
            });
          });
          movieTimes.sort(
            (a, b) => a.dateTime.getTime() - b.dateTime.getTime(),
          );
          const formattedShowtimesWithTag = movieTimes.map(
            time => time.formattedTime,
          );
          if (!movieTimesMap.has(movieName)) {
            movieTimesMap.set(movieName, formattedShowtimesWithTag);
          }
        },
      );

      const movieShowtimesArray: MovieInfo[] = [];
      movieTimesMap.forEach((movieTimes, movieName) => {
        const movieInfo: MovieInfo = {
          movieName: movieName,
          displayDate: displayDate,
          movieTimes: movieTimes,
          duration: 0,
          tomatoRating: 0,
          motionPictureRating: '',
          releaseDate: '',
          posterImage: '',
          amenities: [],
        };
        movieShowtimesArray.push(movieInfo);
      });
      

      setMovieShowtimes(movieShowtimesArray);
      setMovieName(movieName);
      setDisplayDate(displayDate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {movieShowtimes, displayDate, movieName};
};
