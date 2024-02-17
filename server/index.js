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


async function startServer() {
    await server.start();
    server.applyMiddleware({app})
const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected successfully!")
    return app.listen(PORT, ()=>{
        console.log(`Server started at ${PORT}`)
    });
})
.catch((error) => {
    console.log(error.message)
})

}

startServer()

