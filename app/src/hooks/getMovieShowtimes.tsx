import {useEffect, useState} from 'react';
import {Movie, MovieDetails, Showtime} from './types';
import moment from 'moment';

export function getMovieShowtimes() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/Users/honzwilliams/Desktop/showtimesApp/json/theaterDetails.json`,
      );
      if (!response.ok) {
        throw new Error('failed to fetch data');
      }
      const data = await response.text();
      const parsedData = JSON.parse(data);
      const moviesArray: Movie[] = [];

      parsedData.forEach((item: {data: any}) => {
        const data = item.data;
        const theaterShowtimeGroup = data.theaterShowtimeGroupings;

        theaterShowtimeGroup.movies.forEach((movie: any) => {
          const movieDetails: MovieDetails = {
            movieName: movie.name,
            durationInMinutes: movie.durationMinutes,
            rottenTomatoScore: movie.tomatoRating?.tomatometer,
            motionPictureRating: movie.motionPictureRating.code,
            releaseDate: movie.releaseDate,
            posterImageUrl: movie.posterImage.url,
          };
          const showtimes: Showtime[] = [];
          movie.movieVariants.forEach((variant: any) => {
            variant.amenityGroups.forEach((amenityGroup: any) => {
              const isOpenCaption = amenityGroup.amenities.some(
                (amenity: any) => amenity.name.toLowerCase() === 'open caption',
              );

              amenityGroup.showtimes.forEach((showtime: any) => {
                const showtimeDate = showtime.providerDate;
                const showtimeTime = showtime.providerTime;
                const showtimeTheaterId = theaterShowtimeGroup.theaterId;
                const dateAndTimeString = `${showtimeDate} ${showtimeTime}`;
                const formattedTime = moment(dateAndTimeString).format('LT');

                showtimes.push({
                  movieName: movieDetails.movieName,
                  isOpenCaption,
                  showtimeDate,
                  showtimeTime: formattedTime,
                  showtimeTheaterId,
                });
              });
              showtimes.sort((a, b) => {
                const timeA = moment(a.showtimeTime, 'h:mm A');
                const timeB = moment(b.showtimeTime, 'h:mm A');
                return timeA.isBefore(timeB)
                  ? -1
                  : timeA.isAfter(timeB)
                  ? 1
                  : 0;
              });
            });
          });
          moviesArray.push({movieDetails: [movieDetails], showtimes});
        });
      });
      setMovies(moviesArray);
    } catch (error) {
      console.log('error fetching data', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {movies};
}
