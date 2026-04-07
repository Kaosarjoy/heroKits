import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOption";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/buttons/AuthButton";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-2xl overflow-hidden border border-base-300">
          
          {/* Top Banner Gradient */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary opacity-80"></div>

          <div className="px-8 pb-10">
            <div className="relative flex flex-col items-center -mt-20">
              {/* Profile Image with Edit Icon */}
              <div className="relative group">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={140}
                    height={140}
                    className="rounded-full border-8 border-base-100 shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-primary text-primary-content rounded-full border-8 border-base-100 shadow-lg flex items-center justify-center text-5xl font-bold uppercase">
                    {user?.name?.charAt(0)}
                  </div>
                )}
                
                {/* Image Update Overlay Button */}
                <button title="Change Photo" className="absolute bottom-2 right-2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200 transition-all border border-gray-200">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                   </svg>
                </button>
              </div>

              {/* User Identity */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-3xl font-extrabold text-base-content">{user?.name}</h1>
                  <button title="Edit Name" className="text-gray-400 hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-500 font-medium text-lg mt-1">{user?.email}</p>
                <div className="badge badge-accent badge-outline mt-3 font-bold px-4 py-3">
                   {user?.role || "CUSTOMER"}
                </div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/my-orders" 
                className="btn btn-neutral btn-wide shadow-lg flex items-center gap-2 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                My Orders
              </Link>

              {/* Logout using your AuthButton */}
              <AuthButton />
            </div>

            {/* Account Details Table (Optional but looks professional) */}
            <div className="mt-10 border-t border-base-300 pt-8 grid grid-cols-2 gap-4">
              <div className="bg-base-200 p-4 rounded-xl text-center">
                <p className="text-xs uppercase text-gray-400 font-bold">Member Since</p>
                <p className="font-semibold">April 2026</p>
              </div>
              <div className="bg-base-200 p-4 rounded-xl text-center">
                <p className="text-xs uppercase text-gray-400 font-bold">Total Spent</p>
                <p className="font-semibold text-primary">৳ 12,450</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;