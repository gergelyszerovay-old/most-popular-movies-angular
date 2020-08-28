# Simple movie listing app that demonstrates how to create an Angular app with NgRx using the NX monorepo tools

The application uses the NgRx Store as Redux implementation, and the ng-bootstrap Angular Powered Bootstrap for the UI. 

I added movie genre tags as an additional feature. I also made the application responsive. 
I tried to cover most of the code with unit tests. I used Storybook and snapshot tests for testing the UI.

## Quickstart

You can use npm or docker-compose.

### Installation and configuration

`git clone https://github.com/gergelyszerovay/most-popular-movies-angular.git`

`cd most-popular-movies-angular`

Copy the `apps/app/src/environments/environment.ts.sample` 

file to 

`apps/app/src/environments/environment.ts` 

and set `tmdbApiKey` to your TMDb API key. If you leave the `tmdbApiKey` empty, the application fetches the data from a mock service.

To install the required packages, enter:

`docker-compose up install` or `npm install`

### Run the app

`docker-compose up app`

or

`npm run start`

You can open the app here: http://localhost:4200/

### Storybook

You can run Storybook with:

`docker-compose up storybook` or `nx run app-lib:storybook`

You can open the Storybook here: http://localhost:4400/

### Unit tests

You can run the unit test with:

`docker-compose up test-unit` or `nx affected:test --all`

## Development diary - this is what I did and what I used:

* Development environment
    * PhpStorm 2020.2 + Wallaby
    * NX tools (Angular 10)
* App architecture design: 
    * Single application in /app/apps
    * Single feature library in /libs/app-lib
    * Presentational components (pure, no store bindings):
        * Movie list: @app-lib/components/movie-list
        * Movie details: @app-lib/components/movie-detailed-information
    * Container component (store bindings)
        * Main app layout: @app-lib/containers/main-layout
    * NgRx store
        * State for movie list @app-lib/+state/movie list (appLib/movieList in store)
        * Using the facade pattern
    * Service for fetching data from TMDB: @app-lib/services/tmdb.resource.services.ts
* Building presentational components using a CDD approach
    * Building the components' code, template and style
    * Visualizing the states of the components by Storybook (using mock data)
    * Writing snapshot tests based on Storybook's .stories.ts files
    * Writing additional unit tests to test @Inputs / @Outputs 
* Building the container component
    * Building the component's code, template and style
    * Writing snapshot tests
    * Writing additional unit tests in order to integration test the child component's @Outputs
* Building the state for the movie list
    * Creating an NgRx entity based list
    * Adding the ability to store the selected movie
    * Unit testing the actions, reducers, effects, selectors and facade
    * The app fetches the movie list from the server, when the app starts
* Connecting the state and the container component
* Verifying performance optimizations with these requirements:
    * Use ChangeDetectionStrategy.OnPush
    * Instead of functions, use pure pipes in template
    * Use the trackBy option for *ngFor directives
* Writing some Cypress e2e tests
* Improving the UI: adding responsivity
* Implementing an additional feature: fetching movie genres from the server and show them in the detailed movie information component
    * Building the state for the movie genres
        * Creating an NgRx entity based list
        * Unit testing the actions, reducers, effects, selectors and facade
    * When the app starts, fetch the genres, then the movie list from the server 
    * Writing a selector to query the selected movie with its genres
* Creating docker-compose.yml file
 
## Possible future enhancements

* Search functionality:
    * Implementing a text-based search functionality using the https://developers.themoviedb.org/3/search/search-keywords API endpoint
    * e2e integration tests 

---

This application uses the TMDb API but is not endorsed or certified by TMDb.

Do not host this application from a publicly accessible server, because your TMDb API key will be exposed.
