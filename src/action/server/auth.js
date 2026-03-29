"use server"
import { collections, dbConnect } from "@/app/lib/dbconnect";
import bcrypt from "bcryptjs";


export const postUser = async (payload) => {
    const { email, password, name } = payload;
    if (!email || !password) return null;

    // ✅ dbConnect কে আগে await করে কালেকশনটি ধরো
    const userCollection = await dbConnect(collections.USERS);
    
    // এখন মেথডগুলো ব্যবহার করো
    const isExist = await userCollection.findOne({ email });
    
    if (isExist) {
        return { error: "User already exists" }; // null না পাঠিয়ে একটা মেসেজ পাঠানো ভালো
    }

    // হ্যশিং এর সময়ও await দিতে ভুলো না (bcrypt.hash ও async)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
        provider: "credentials",
        name,
        email,
        password: hashedPassword,
        role: "user",
        createdAt: new Date()
    };

    // ✅ এখানেও একইভাবে usercollection ব্যবহার করো
    const result = await userCollection.insertOne(newUser);
    
    if (result.acknowledged) {
        return {
            ...result,
            insertedId: result.insertedId.toString(),
        };
    }
};

export const loginUser = async(payload)=>{
    const {email , password} = payload;

    if(!email || !password) return null;
     const userCollection = await dbConnect(collections.USERS);
    
    const user = await userCollection.findOne({ email });
    if(!user){
        return null;
    }

    const isMacth = await bcrypt.compare(password,user.password);
    if(isMacth){
        return user;
    }else{
         return null;
    }

   
}



// import { collections, dbConnect } from "@/app/lib/dbconnect";
// import bcrypt from "bcryptjs";
// export const postUser = async(payload)=>{
//     const {email,password,name} = payload;
//     //check payload
//     if(!email || !password) return null;

//     //check user 
//     const isExist = await dbConnect(collections.USERS).findOne({email})
//     if(isExist){
//         return null;
//     }

//     //created user 
//     const newUser = {
//         provider:"credentials",
//         name , 
//         email,
//         password:bcrypt.hash(password, 12),
//         role:"user",
//        createdAt: new Date()

//     }


//     //insert user 
//     const result = await dbConnect(collections.USERS).insertOne(newUser);
//     if(result.acknowledged){
//         return{
//             ...result,
//             insertedId:result.insertedId.toString(),
//         }
//     }
// }

