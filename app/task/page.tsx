import Task from "../_models/taskModel";
import TaskTable from "../_components/TaskTable";
import { DataType } from "../lib/types";
import ConfirmDeletion from "../_components/ConfirmDeletion";

export default async function Page({ searchParams }:{searchParams:{delete:string}}) {
  //title
  //description
  //status
  //priority
  //created
  //project

  let tasks = (await Task.find().populate("project").exec()).reverse();

  let data: DataType[] = tasks.map((task) => {
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

  data = JSON.parse(JSON.stringify(data));

  return (
    <>
      <TaskTable data={data} />
      <ConfirmDeletion
        id={searchParams?.delete}
      />
    </>
  );
}
