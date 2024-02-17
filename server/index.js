const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected successfully!")
    return server.listen(PORT);
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
})
.catch((error) => {
    console.log(error.message)
})

