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
         |                                    |                              |
         |                       +------------+ State (depends on selection) +------+
         |                       |            |                              |      |
         |                       |            +-------------+----------------+      |
         |                       |                          |                       |
         |                       |                          |                       |
         |                       |City Selected             |Movie Selected         |Showtime Selected
         |                       |                          |                       |
+--------+-----+        +--------v----+          +----------v-----+         +-------+--------+
|              |        |             |          |                |         |                |
|  Search Bar  |        | Movie List  |          | Showtime List  |         |  Theater Sits  |
|              |        |             |          |                |         |                |
+--------------+        +--------+----+          +----------+-----+         +-------+--------+
                                 |                          |                       |
                                 |                          |                       |
                                 |                          |                       |
                             +---+----+              +------+-----+         +-------+-------+
                             |        |              |            |         |               |
                             | Movie  |              |  Showtime  |         |  Reservation  |
                             |        |              |            |         |               |
                             +--------+              +------------+         +---------------+

```

``` text
| Component     | Description                                     |
|---------------|-------------------------------------------------|
| Search Bar    | looks for a City in Poland.                     |
| Movie List    | Shows list of movies for given city.            |
| Movie         | Particular title, *clickable*                   |
| Showtime List | List of all avaliable showtimes, *clickable*    |
| Places        | Grid of sits for specific showtime, *clickable* |
| Reservation   | Pop-up-like dialog with reservation fields      |
```

# State and Flow

Most relevant state is kept in App component. This component, based on this state, should decide what to present.


```javascript
state = {
    cities: '',
    movies: [],
    selectedMovie: '',
    showtimes: []
}
```

At start there is only search bar. Once user hits enter, Movies are shown. Selecting movie, unmounts its component and loads Showtimes.

# TODO

## Required

Those things need to be added to the project
* Theater sits component (available/free places)
* Reservation
* CSS
* Redux

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
