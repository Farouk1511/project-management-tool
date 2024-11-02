import Task from "../_models/taskModel";
import TaskTable from "../_components/TaskTable";
import { DataType } from "../lib/types";
import ConfirmDeletion from "../_components/ConfirmDeletion";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { connectToMongoDB } from "../lib/connectDB";

export default async function Page({
  searchParams,
}: {
  searchParams: { delete: string };
}) {
  //title
  //description
  //status
  //priority
  //created
  //project
  let tasks;
  try {
    await connectToMongoDB()
    tasks = (await Task.find().populate("project").exec()).reverse();
  } catch (e) {
    console.log(e);
    throw new Error("error in task");
  }

  let data: DataType[] = tasks.map((task) => {
    let taskObj: DataType = {
      key: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt.toDateString(),
      project: task?.project?.name ?? "",
    };

    return taskObj;
  });

  data = JSON.parse(JSON.stringify(data));

  let items = [
    {
      title: (
        <Link passHref href="//">
          Home
        </Link>
      ),
    },
    { title: "Tasks" },
  ];

  return (
    <>
      <Breadcrumb items={items} style={{ marginBottom: "10px" }} />
      <TaskTable data={data} />
      <ConfirmDeletion id={searchParams?.delete} />
    </>
  );
}
