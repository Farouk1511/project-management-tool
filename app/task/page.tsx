import Task from "../_models/taskModel";
import TaskTable from "../_components/TaskTable";
import { DataType } from "../lib/types";

export default async function Page() {
  //title
  //description
  //status
  //priority
  //created
  //project
  let tasks = (await Task.find().populate("project").exec()).reverse();

  const data: DataType[] = tasks.map((task) => {
    console.log(task);
    let taskObj: DataType = {
      key: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt.toUTCString(),
      project: task?.project?.name ?? "",
      // productName: await Product.findById(task.productId)
    };

    return taskObj;
  });

  return (
    <>
      <TaskTable data={data} />
    </>
  );
}
