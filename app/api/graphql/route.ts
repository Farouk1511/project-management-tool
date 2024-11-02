import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { ApolloServer } from "@apollo/server";

import { gql } from "graphql-tag";

import { NextRequest } from "next/server";
import { connectToMongoDB } from "@/app/lib/connectDB";
import Project from "@/app/_models/projectModel";
import Task from "@/app/_models/taskModel";

interface TaskType {
  _id: any;
  title: string;
  description: string;
  priority: string;
  status: string;
}

//create functions here then call in resolver
const getProject = async (projectId: any) => {
  //conect to db
  await connectToMongoDB();
  return Project.findById(projectId);
};

const resolvers = {
  Query: {
    getProject: async (_: any, { projectId }: { projectId: any }) => {
      try {
        const project = await getProject(projectId);
        return project;
      } catch (error) {
        console.error("Error fetching project:", error);
        throw new Error("Failed to fetch project");
      }
    },
    getTask: async (_: any, { taskId }: { taskId: any }) => {
      try {
        await connectToMongoDB();
        const task = await Task.findById(taskId).populate("project").exec();
        return task;
      } catch (err) {
        console.error("Error fetching tasks");
        throw new Error("Failed to fetch tasks");
      }
    },
  },
  Mutation: {
    updateTask: async (
      _: any,
      {
        id,
        input,
      }: {
        id: string;
        input: {
          title?: string;
          description?: string;
          status?: string;
          priority?: string;
          projectId?: string;
        };
      }
    ) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updatedTask;
      } catch (err) {
        console.error("Error updating task:", err);
        throw new Error("Failed to update task");
      }
    },

    deleteTask: async (_: any, { id }: { id: string }) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
      } catch (err) {
        console.log("Error deleting task", err);
        throw new Error("Error deleting task");
      }
    },

    updateProject: async (
      _: any,
      {
        id,
        input,
      }: {
        id: string;
        input: {
          name: string;
          color: string;
          description: string;
        };
      }
    ) => {

      try{
        const updateProject = await Project.findByIdAndUpdate(id,input,{
          new:true
        })

        return updateProject
      }catch(error){
        console.error("Error updating project details: ",error)
        throw new Error("Error updating project")
      }
    },

    deleteProject: async (_:any,{id}:{id:string}) => {
      try{
        // Delete all tasks related to project Id
        const tasks = await Task.find({projectId:id})

        if(tasks.length === 0){
          console.log("No task founf for this project")
          return;
        }

        await Task.deleteMany({projectId:id})

        // Delete project
        const project = await Project.findByIdAndDelete(id)

        // return deleted project
        return project

      }catch(error){
        console.error("Error deleting project: ",error)
        throw new Error("Error deleting project")
      }
    }
  },
};

const typeDefs = gql`
  type Project {
    _id: ID!
    name: String!
    description: String!
    color: String
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    priority: String!
    projectId: ID
    project: Project
    createdAt: String!
    updatedAt: String!
  }

  input UpdateTaskInput {
    title: String!
    description: String!
    status: String!
    priority: String!
    projectId: ID
  }

  input UpdateProjectInput {
    name: String!
    description: String!
    color: String!
    projectId: ID
  }

  type Query {
    hello: String
    getProject(projectId: ID!): Project
    getTask(taskId: ID!): Task
  }

  type Mutation {
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    deleteTask(id: ID!): Task!
    updateProject(id:ID!, input: UpdateProjectInput): Project
    deleteProject(id: ID!): Project!
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
