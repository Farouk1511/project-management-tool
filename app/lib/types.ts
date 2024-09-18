import {IProjectDocument} from "../_models/projectModel";
export interface DataType {
    key: any;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: String;
    project: string;
  }

export interface ProjectType extends IProjectDocument{
  _id:string
}