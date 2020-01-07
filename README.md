# Wipnema app

Work In Progress ciNEMA app. Concept for showtime booking app.

# Basic design

``` text
                     +-------+
                     |       |
         +-----------+  App  +-----------------------------+
         |           |       |                             |
         |           +-------+                             |
         |                                                 |
         |                                    +------------+-----------------+
         |                                    |                              +--------------------------+
         |                       +------------+ State (depends on selection) +------+                   |
         |                       |            |                              |      |                   |
         |                       |            +-------------+----------------+      |                   |
         |                       |                          |                       |                   |
         |                       |                          |                       |                   |
         |                       |City Selected             |Movie Selected         |Showtime Selected  |
         |                       |                          |                       |                   |
+--------+-----+        +--------v----+          +----------v-----+         +-------+--------+          |
|              |        |             |          |                |         |                |          |
|  Search Bar  |        | Movie List  |          | Showtime List  |         |  Theater Seats  |          |
|              |        |             |          |                |         |                |          |
+--------------+        +--------+----+          +----------+-----+         +----------------+          |
                                 |                          |                                           |
                                 |                          |                                           |
                                 |                          |                                           |
                             +---+----+              +------+-----+         +---------------+           |
                             |        |              |            |         |               |           |
                             | Movie  |              |  Showtime  |         |  Reservation  +-----------+
                             |        |              |            |         |               |
                             +--------+              +------------+         +---------------+

```

``` text
| Component     | Description                                     |
|---------------|-------------------------------------------------|
| Search Bar    | looks for a City in Poland.                     |
| Movie List    | Shows list of movies for given city.            |
| Movie         | Particular title, *clickable*                   |
| Showtime List | List of all avaliable showtimes                 |
| Showtime      | Particular showtime, *clickable*                |
| Seats          | Grid of sits for specific showtime, *clickable* |
| Reservation   | View with reservation fields                    |
```

# State and Flow

Most relevant state is kept in App component. This component, based on this state, should decide what to present.


```javascript
    state = {
        cities: '',
        movies: [],
        selectedMovie: '',
        showtimes: [],
        showtimeId: '',
        showtimeDate: '',
        sits: [],
        // Viewing states
        pageView: 0b0001
```

At start there is only search bar. Once user hits enter, Movies are shown. Selecting movie, unmounts its component and loads Showtimes.
pageView is in binary format, each bit corresponds to certain view.

# TODO

## Required

Those things need to be added to the project
* Finish Reservation form
* CSS
* Redux
* 'Back' functionality
* Show showtimes per city not the 'blank' list

## Nice to have

Current flow is rigid and limiting, it would be good to have more options
* Search for movie, based on current location (30km radius)
* Add drop-downs and what-not for better customization
  * Maybe user profile instead
* Custom search/filter component
  * If blank, show movies for place
  * When movies are present, filter them

# Instruction

Please look at [this file](./README.react.md).
