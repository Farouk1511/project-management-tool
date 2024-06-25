import gql from "graphql-tag";
import { getClient } from "../lib/client";

export default async function Members() {
  const client = getClient();

  const query = gql`
    query ExampleQuery {
      hello
    }
  `;

  const {data} = await client.query({query})
  console.log(data)


  return <div>This is the members page {data.hello} </div>;
}
