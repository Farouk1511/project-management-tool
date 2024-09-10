import { Breadcrumb } from "antd";
import Link from "next/link";

export default function Dashboard() {
  let items = [{ title: <Link href="//">Home</Link> }, { title: "Dashboard" }];

  return (
    <div>
      <Breadcrumb items={items} />{" "}
    </div>
  );
}
