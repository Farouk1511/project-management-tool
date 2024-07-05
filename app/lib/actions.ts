'use server';
import { revalidatePath } from "next/cache";
import Project from "../_models/projectModel";
import { connectToMongoDB } from "./connectDB";

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

