import { Table, TableProps, Tag } from "antd";
import { TASK_PRIORITY, TODO_STATUS } from "../lib/constants";
import Task from "../_models/taskModel";

export default async function Page() {
  //title
  //description
  //status
  //priority
  //created

  const tasks = (await Task.find()).reverse();

  console.log(tasks)

  interface DataType {
    key: any;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: String;
  }

  const columns: TableProps<DataType>["columns"] = [
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
    let taskObj: DataType = {
      key: task._id,
      title:task.title,
      description:task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt.toUTCString()
    }

    return taskObj
  });

  return <Table columns={columns} dataSource={data} />;
}
