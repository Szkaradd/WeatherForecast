# Weather App

### Author: Mikołaj Szkaradek

The Weather App is a simple yet functional service that allows users to check the current weather for any city in the world. It also offers functionality to review recently viewed cities and the ability to add cities to a favorites list.

## Features

- Search for the current weather in any city worldwide.
- Browse through recently viewed cities.
- Add and remove cities from the favorites list.
- Stores recent and favorite cities in the browser's local storage.

## User stories

- User can search for real-time weather information by city name. 

- Users can see detailed weather conditions, including temperature, humidity, wind speed, etc. 

- User can add cities to favourites and fetch data from favourite cities with ease. 

- User can see recent search results. 

- When user closes the page and reopens it, he should see same city as his last browse result 

- In case of error like invalid city name a proper message is displayed.

- User can see ai generated text description of the weather that looks as natural forecast in tv

## Installation & Setup

### Backend

Ensure that you have set up and started the backend service, which is built with Spring, before running the frontend.

1. Add a file named `application-secrets.properties` in the appropriate location in backend directory. Add the following content to the file:

```
codeopenai.api.key=YOUR_KEY
weather.api.key=YOUR_KEY
```

Replace `YOUR_KEY` with the appropriate keys.

2. Navigate to the backend directory and run:

```bash
mvn spring-boot:run
```

This will start the backend server.

### Frontend

1. Clone this repository:

2. Navigate to the frontend directory

3. Install the dependencies:

```
npm install
```

4. Start the local development server:

```
ng serve
```

Open your browser and navigate to `http://localhost:4200/`.

## Technologies

- **Frontend**: Angular
- **Backend**: Spring Boot

## Screenshots![image-20230810141350396](images\app-ss.png)
