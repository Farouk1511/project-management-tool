'use server';
import { revalidatePath } from "next/cache";
import Project from "../_models/projectModel";
import { connectToMongoDB } from "./connectDB";
import Task from "../_models/taskModel";
import mongoose from "mongoose";

export const createProject = async (formData:any) => {
    await connectToMongoDB()
    // Extracting todo content and time from formData
    const name = formData.name;
    const description = formData.description;
    //const color = formData.color
    try {
        // Creating a new todo using Todo model
        const newProject = await Project.create({
            name,
            description,
            //color:color?color:null
        });
        // Saving the new todo
        newProject.save();
        // Triggering revalidation of the specified path ("/")
        revalidatePath("/","layout");
        // Returning the string representation of the new todo
        return newProject.toString();
    } catch (error) {
        console.log(error);
        return {message: 'error creating Project'};
    }
};
export const createTask = async (formData:any) => {
    await connectToMongoDB()
    // Extracting todo content and time from formData
    const title = formData.title;
    const description = formData.description;
    const status = formData.status;
    const priority = formData.priority;
    const projectId = formData.projectId

    console.log("formdata",formData)
    //const color = formData.color
    try {
        // Creating a new todo using Todo model
        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            projectId
        });
        // Saving the new task
        newTask.save();
        console.log('Task created:', newTask);
        // Triggering revalidation of the specified path ("/")
        revalidatePath("/","layout");
        // Returning the string representation of the new todo
        return newTask.toString();
    } catch (error) {
        console.log(error);
        return {message: 'error creating Project'};
    }
};

