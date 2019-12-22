# Movie Search
The web app is intended to help travllers  to find out shooting locations of their favorite movies. Currently it has dataset of films shooted around SF.


#Tech Stack

### Database
MongoDB has been used to utilise the benfit of scalability as MongoDB is a highly scalable NoSQL Database. The database has been hosted on Mongo Atlas.
The dataset has already been restrucutred using python automations (convert csv to objects, merge redundant data and feed to mongo cluster) to solve redundancy problem. The current schema can be found in models/movie.js.

### API
GraphQL has been used because GraphQL is way faster, as it can cut down accordint to your request by picking only the fields we want to query. It makes use of a single endpoint and its also good fit for complex systems and microservices.
The backend has been coded as a production level scalable app.

### Frontend
Fromtend is more like KISS (Keep it simple stupid) Frontend makes use of bootstrap framework alongwith pure javascript. 
Note: Fronted is bit low from production level but that surely doesn't quantify the power of the app. Some of the feautures prepared in the backend are not yet connected to the frontend (e.g. - currently the app searches only by movie name but the api has been configured to search either by actor / director / production_company).

# Installation for Development Version

    
    git clone https://github.com/manigedit/moviesearchgraphql
    
    cd moviesearchgraphql
    
    npm install
    
    npm start
    
    Navigate to http://localhost:4000
