// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// -- Definition of a new project (schema)
//         -- project name
//         -- project id (auto from mongodb)
//         -- project description
//         -- task array
//         -- users that have access to projects (coming soon)
//         -- date created
//         -- last updated

// Defining the structure of a todo item using TypeScript interfaces
export interface IProject {
  name: string;
  description:string;
  color:string;
}

// Merging ITodo interface with mongoose's Document interface to create 
// a new interface that represents a todo document in MongoDB
export interface IProjectDocument extends IProject, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the todo document, specifying the types 
// and constraints
const projectSchema = new mongoose.Schema<IProjectDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color:{
        type: String,
        required:false,
        default:"grey"
    },
    
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the todo document
const Project: Model<IProjectDocument> =
  mongoose.models?.Project || mongoose.model("Project", projectSchema);

export default Project;