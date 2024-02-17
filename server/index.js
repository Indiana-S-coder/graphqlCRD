const mongoose = require("mongoose");
const express = require("express")
const {ApolloServer} = require("apollo-server-express");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({app})
const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected successfully!")
    return app.listen(PORT);
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
})
.catch((error) => {
    console.log(error.message)
})

