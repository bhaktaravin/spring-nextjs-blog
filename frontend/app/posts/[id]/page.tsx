'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPostById, deletePost, type Post } from '@/lib/api';

export default function PostDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(parseInt(params.id));
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      await deletePost(parseInt(params.id));
      router.push('/');
      router.refresh();
    } catch (error) {
      alert('Failed to delete post');
      console.error(error);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to all posts
        </Link>

        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
            <span>By {post.author}</span>
            {post.createdAt && (
              <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Link
              href={`/posts/${post.id}/edit`}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
