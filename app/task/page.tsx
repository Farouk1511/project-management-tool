import { Table, TableProps, Tag } from "antd";
import { TASK_PRIORITY, TODO_STATUS } from "../lib/constants";
import Task from "../_models/taskModel";
import Product from "../_models/projectModel";


export default async function Page() {
  //title
  //description
  //status
  //priority
  //created
  //project

  const tasks = (await Task.find()).reverse();

  console.log(tasks)

  interface DataType {
    key: any;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: String;
    productName:string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const data: DataType[] = tasks.map((task) => {

    //console.log(await Product.findById(task.productId))
    let taskObj: DataType = {
      key: task._id,
      title:task.title,
      description:task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt.toUTCString(),
     // productName: await Product.findById(task.productId)
    }

    return taskObj
  });

  return <Table columns={columns} dataSource={data} />;
}
