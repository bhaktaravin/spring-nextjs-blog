import Link from "next/link";
import { getAllPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Blog Posts</h1>
          <Link
            href="/posts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {post.author}</span>
                  {post.createdAt && (
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

