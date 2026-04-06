import { getMyOrders } from "@/action/server/Order";
import Link from "next/link";
import { FaBoxOpen, FaChevronRight, FaClock, FaCheckCircle } from "react-icons/fa";

const MyOrdersPage = async () => {
    const orders = await getMyOrders();

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
                        <p className="text-gray-500 mt-1">Track and manage your recent toy purchases</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-2xl">
                        <FaBoxOpen className="text-primary text-3xl" />
                    </div>
                </div>

                {/* Orders Content */}
                {orders.length > 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="py-5 pl-8 text-sm font-semibold text-gray-600 uppercase tracking-wider">Order Info</th>
                                        <th className="py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Date</th>
                                        <th className="py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Status</th>
                                        <th className="py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Amount</th>
                                        <th className="py-5 pr-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="py-6 pl-8">
                                                <div className="flex flex-col">
                                                    <span className="font-mono font-bold text-gray-800 text-sm">
                                                        #{order._id.slice(-8).toUpperCase()}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-1 italic">
                                                        {order.items?.length || 0} items
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-center">
                                                <span className="text-sm text-gray-600">
                                                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td className="py-6 text-center">
                                                <div className="flex justify-center">
                                                    {order.status === 'pending' ? (
                                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold capitalize">
                                                            <FaClock className="text-[10px]" /> {order.status}
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold capitalize">
                                                            <FaCheckCircle className="text-[10px]" /> {order.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-6 text-right font-bold text-gray-900 pr-4">
                                                ৳{order.grandTotal.toLocaleString()}
                                            </td>
                                            <td className="py-6 pr-8 text-right">
                                                <Link 
                                                    href={`/OrderSuccess/${order._id}`} 
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
                                                >
                                                    <FaChevronRight className="text-xs" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBoxOpen className="text-gray-300 text-4xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No orders yet</h3>
                        <p className="text-gray-500 mb-6 px-4">Looks like you haven`t bought any toys for your little ones yet!</p>
                        <Link href="/" className="btn btn-primary rounded-xl px-8 text-white font-bold">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;