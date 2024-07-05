import mongoose, { Document,Model } from "mongoose";
import { TASK_PRIORITY,TODO_STATUS } from "../lib/constants";

// - Definition of a new task (schema)
//         - Task id (auto)
//         - Task title
//         - Task description
//         - Task status
//         - Task creation date
//         - Task update date
//         - Task priority

export interface ITask {
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface ITaskDocument extends ITask, Document {
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITaskDocument>(
    {
        title:{
            required:true,
            type:String
        },
        description:{
            required:true,
            type:String
        },
        status:{
            required:false,
            type:String,
            default:TODO_STATUS.IN_PROGRESS,
            enum:Object.values(TODO_STATUS)
        },
        priority:{
            required:false,
            type:String,
            default:TASK_PRIORITY.MEDIUM,
            enum:Object.values(TASK_PRIORITY)
        }

    },{
        timestamps:true
    }
)

const Task: Model<ITaskDocument> =
  mongoose.models?.Task || mongoose.model("Task", taskSchema);

export default Task;