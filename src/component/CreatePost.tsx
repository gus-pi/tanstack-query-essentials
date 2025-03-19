import { Post } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const createPost = async (newPost: Post) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { Content_Type: 'application/json' },
    body: JSON.stringify(newPost),
  });
  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState('');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    //invalidate the posts query so that on creation it refetches the data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onMutate: async (newPost: Post) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (old: Post[]) => [
        ...old,
        { id: Date.now(), ...newPost },
      ]);

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, body: 'This is a new post' });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex items-center">
      <input
        type="text"
        placeholder="Add title..."
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white m-4"
      />
      <button
        type="submit"
        className="border rounded-md px-2 bg-gray-700 text-white hover:cursor-pointer hover:bg-gray-400"
      >
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
