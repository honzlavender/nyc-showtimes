export interface TheaterDetails {
    showtimes: Showtime[];
    theaterId: string;
    theaterName: string;
    hasReservedSeating: boolean;
    hasCurrentShowtimes: boolean;
    distanceFromUserZipcode: number;
}

export interface Showtime {
    movieName: string;
    isOpenCaption: boolean;
    showtimeDate: string;
    showtimeTime: string;
    showtimeTheaterId: string;
    theaterName?: string;
}

export interface MovieDetails {
    movieName: string;
    durationInMinutes: number;
    rottenTomatoScore: number;
    motionPictureRating: string;
    releaseDate: string;
    posterImageUrl: string;
  }

  export interface Movie {
    movieDetails: MovieDetails[];
    showtimes: Showtime[]
  }