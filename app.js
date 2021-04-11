const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Movie = require('./models/movie');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);
app.use(express.static('frontend'))

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/frontend/index.html'));
  });

app.use(
  '/api',
  graphqlHttp({
    schema: buildSchema(`
        type Movie{
            _id: ID!
            title: String!
            locations: [String]!
            production_company: String
            director: String
            actor1: String
            actor2: String
            actor3: String
        }

        input MovieInput {
            title: String!
            locations: [String]!
            production_company: String
            director: String
            actor1: String
            actor2: String
            actor3: String
        }

        type RootQuery {
            movies(searchby: String, like: String): [Movie]
        }

        type RootMutation {
            createMovie(movieInput: MovieInput): Movie
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      movies: args => {
        var queryParam = {};
        var sub = new RegExp(args.like.toString(), 'i');
        queryParam[args.searchby] = sub;
        return Movie.find(queryParam).then( movies => {
            return movies.map(movie =>{
                return {...movie._doc};
            });
        })
        .catch(err =>{
            console.log(err);
        })
      }
    ,
    createMovie: args => {
        const movie = new Movie({
            title: args.movieInput.title,
            locations: args.movieInput.locations,
            production_company: args.movieInput.production_company,
            director: args.movieInput.director,
            actor1: args.movieInput.actor1,
            actor2: args.movieInput.actor2,
            actor3: args.movieInput.actor3
        });

        return movie
            .save()
            .then(result => {
                console.log(result);
                return {...result._doc};
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
},

    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERID}:${process.env.MONGO_PASSWORD}@cluster0-wmcx9.mongodb.net/moviestab?retryWrites=true&w=majority`
).then(()=>{
    console.log('Connected');
    app.listen(process.env.PORT || 4000);
}).catch(err=>{
    console.log(err);
});

