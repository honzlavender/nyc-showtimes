export interface MovieDetails {
    movieName: string;
    durationInMinutes: number;
    rottenTomatoScore: number;
    motionPictureRating: string;
    releaseDate: string;
    posterImageUrl: string;
}

export interface MovieShowtimes {
    movieName: string;
    isOpenCaption: boolean;
    showtimeDate: string;
    showtimeTime: string;
    showtimeTheaterId: string;
}

export interface TheaterDetails {
    theaterId: string;
    theaterName: string;
    hasReservedSeating: boolean;
    hasCurrentShowtimes: boolean;
    distanceFromUserZipcode: number;
}

export interface MovieWithShowtimes extends MovieDetails {
    showtimes: MovieShowtimes[];
  }

export interface MoviesAndTheatersAndShowtimes extends MovieDetails {
    theaterInfo: {
      [theaterId: string]: {
        theaterDetails: TheaterDetails[];
        showtimes: MovieShowtimes[];
      };
    };
  }

  [
    {
       "durationInMinutes":112,
       "motionPictureRating":"PG-13",
       "movieName":"Mean Girls",
       "posterImageUrl":"https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/489x0/v2/https://resizing.flixster.com/0YWXiIrzIIikzllZUpKsCoHJVFY=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQxMzU5NGYyLTA5N2MtNDI0MS04YTI5LWNkMTg3NTZlMTU3MC5qcGc=",
       "releaseDate":"2024-01-12",
       "rottenTomatoScore":73,
       "theaterInfo":
       {
        "9XbfBRfMDS1Wswz":{
           "showtimes":[
              "Array"
           ],
           "theaterDetails":[
              "Object"
           ]
        },
        "Al2f6XiGOIkVTp4":{
           "showtimes":[
              "Array"
           ],
           "theaterDetails":[
              "Object"
           ]
        },
        "YkgfGwfNWS2bcgZ":{
           "showtimes":[
              "Array"
           ],
           "theaterDetails":[
              "Object"
           ]
        }
     },
    },
    {
       "durationInMinutes":141,
       "motionPictureRating":"PG-13",
       "movieName":"The Color Purple",
       "posterImageUrl":"https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/489x0/v2/https://resizing.flixster.com/_8mqDG_CFMbH75r18jov-puBBzA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzZiMzNiZmJiLTk1ODItNDBhMi05M2Y1LTJmMjJkNzUwNzJiYy5qcGc=",
       "releaseDate":"2023-12-25",
       "rottenTomatoScore":87,
       "theaterInfo":
       {
        "9XbfBRfMDS1Wswz":{
           "showtimes":[
              "Array"
           ],
           "theaterDetails":[
              "Object"
           ]
        },
        "Al2f6XiGOIkVTp4":{
           "showtimes":[
              "Array"
           ],
           "theaterDetails":[
              "Object"
           ]
        },
        "YkgfGwfNWS2bcgZ":{
           "showtimes":[
              "Array"
           ],
           "theaterDetails":[
              "Object"
           ]
        }
     },
    }
]