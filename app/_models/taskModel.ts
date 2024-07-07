import mongoose, { Document, Model } from "mongoose";
import { TASK_PRIORITY, TODO_STATUS } from "../lib/constants";

// Interface for a task
export interface ITask {
  title: string;
  description: string;
  status: string;
  priority: string;
  productId: mongoose.Schema.Types.ObjectId; // Add the productId field
}

// Interface for a task document
export interface ITaskDocument extends ITask, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Task schema definition
const taskSchema = new mongoose.Schema<ITaskDocument>(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    status: {
      required: false,
      type: String,
      default: TODO_STATUS.IN_PROGRESS,
      enum: Object.values(TODO_STATUS),
    },
    priority: {
      required: false,
      type: String,
      default: TASK_PRIORITY.MEDIUM,
      enum: Object.values(TASK_PRIORITY),
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Task model definition
const Task: Model<ITaskDocument> = mongoose.models?.Task || mongoose.model<ITaskDocument>("Task", taskSchema);

export default Task;
