import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;
const dbname = process.env.DB_NAME;

export const collections={
  PRODUCTS:"products",
  USERS:"users",
  CART:"cart",
  ORDER:"order"
}
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export const dbConnect = async (cname) => {
  const client = await clientPromise;
  return client.db(dbname).collection(cname); 
};