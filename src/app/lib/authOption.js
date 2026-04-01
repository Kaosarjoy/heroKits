import { loginUser } from "@/action/server/auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbconnect";


export const authOptions = {
  
  providers: [
    CredentialsProvider({
    name: 'Credentials',
  
    credentials: {
      // username: { label: "Username", type: "text", placeholder: "jsmith" },
      // password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
     const user = await loginUser(credentials);
      return user;
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  ],
    callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
  //  console.log(user, account, profile, email, credentials);

    const userCollection = await dbConnect(collections.USERS);
        
        const isExist = await userCollection.findOne({
           email:user.email,
          // provider: account?.provider
           });
        
        if (isExist) {
            return true; // User already exists, allow sign-in
        }
    
        const newUser = {
        provider: account?.provider,
        name:user.name ,
        email:user.email,
        image:user.image,
        role: "user",
        
    };
    const result = await userCollection.insertOne(newUser);
    return result.acknowledged;
  },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl
  // },
  async session({ session, token, user }) {
    if(token){
      
      session.role = token.role,
      session.email = token.email
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if(user){
      if(account.provider =="google"){
        const userCollection = await dbConnect(collections.USERS);
      const dbUser = await userCollection.findOne({ email: user.email });
        token.role = dbUser.role,
        token.email =dbUser.email
      }else{
         token.role = user.role,
      token.email =user.email
      }
     
    }
    return token
  }
}

}