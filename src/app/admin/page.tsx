'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiTrendingUp, FiEdit, FiUsers, FiBarChart2, FiClock, FiCheckCircle, FiFileText } from 'react-icons/fi';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('isAuthenticated');
    if (!token) {
      router.push('/login');
    } else {
      // Simulate authentication check
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1000);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">Authenticating...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-8">
    <header className="mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Dashboard Overview
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
    </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Posts" 
          value="142" 
          change="+12%"
          icon={<FiFileText className="text-blue-500" size={24} />}
          color="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard 
          title="Total Views" 
          value="58.4K" 
          change="+24%"
          icon={<FiBarChart2 className="text-purple-500" size={24} />}
          color="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatCard 
          title="Active Authors" 
          value="18" 
          change="+2"
          icon={<FiUsers className="text-emerald-500" size={24} />}
          color="bg-emerald-100 dark:bg-emerald-900/30"
        />
        <StatCard 
          title="Engagement Rate" 
          value="78%" 
          change="+5%"
          icon={<FiTrendingUp className="text-amber-500" size={24} />}
          color="bg-amber-100 dark:bg-amber-900/30"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Posts */}
        {/* <div className="lg:col-span-2">
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FiEdit className="text-blue-500" />
                Recent Posts
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentPosts.map((post, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 text-center">
              <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                View All Posts
              </button>
            </div>
          </div>
        </div> */}

        {/* Quick Stats */}
        {/* <div>
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FiClock className="text-purple-500" />
                Activity Feed
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    activity.type === 'publish' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {activity.type === 'publish' ? <FiCheckCircle size={18} /> : <FiEdit size={18} />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time} • {activity.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, change, icon, color }) {
  return (
    <div className={`rounded-xl p-6 shadow-lg transition-all hover:shadow-xl ${color}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-3xl font-bold">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
        <FiTrendingUp className="mr-1" /> {change} from last week
      </p>
    </div>
  );
}

// Sample data
const recentPosts = [
  { title: 'How to Build a Blog with Next.js', date: 'May 15, 2023', status: 'Published' },
  { title: 'Understanding React Server Components', date: 'May 14, 2023', status: 'Draft' },
  { title: 'The Complete Guide to CSS Grid', date: 'May 12, 2023', status: 'Published' },
  { title: 'Authentication Best Practices', date: 'May 10, 2023', status: 'Published' },
];

const activities = [
  { type: 'publish', title: 'New post published', time: '2 hours ago', author: 'Sarah Johnson' },
  { type: 'edit', title: 'Post updated', time: '5 hours ago', author: 'Michael Chen' },
  { type: 'publish', title: 'New post published', time: '1 day ago', author: 'Emma Davis' },
  { type: 'edit', title: 'Draft saved', time: '2 days ago', author: 'Alex Wong' },
];