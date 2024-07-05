import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { ApolloServer } from "@apollo/server";

import { gql } from "graphql-tag";

import { NextRequest } from "next/server";
import { connectToMongoDB } from "@/app/lib/connectDB";
import Project from "@/app/_models/projectModel";

//create functions here then call in resolver
const getProject = async(projectId:any) => {
  //conect to db
  await connectToMongoDB()
  console.log(projectId)
  return Project.findById(projectId)

}

const resolvers = {
  Query: {
    hello: () => "world",
    getProject: async (_:any,{projectId}:{projectId:any}) => {
      try{
        const project = await getProject(projectId);
        return project;
        
      }catch(error){
        console.error("Error fetching project:",error)
        throw new Error('Failed to fetch project')
      }
    },
  },
};

const typeDefs = gql`
type Project {
_id:ID!
name:String!
description:String!
color:String
}

type Query {
    hello: String
    getProject(projectId:ID!):Project
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
