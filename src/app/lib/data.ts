import { createClient } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import { Post } from "@/app/lib/definition";

export async function connectToDB() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log("Connected to database");
      return client;
    }
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const data = await sql`SELECT * FROM posts`;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log(data.rows);
    return data.rows as Post[];
  } catch (error) {
    console.log("Error connecting to database", error);
    return [];
  }
}
