import { Breadcrumb } from "antd";
import gql from "graphql-tag";
import Link from "next/link";
//import { getClient } from "../lib/client";

export default async function Members() {
  // const client = getClient();

  // const query = gql`
  //   query ExampleQuery {
  //     hello
  //   }
  // `;

  // const {data} = await client.query({query})
  // console.log(data)

  let items = [
    { title: <Link passHref href="//">Home</Link> },
    { title: "Members" },
  ];

  


  return <div><Breadcrumb items={items}/> </div>;
  //return <div>This is the members page {data.hello} </div>;
}
