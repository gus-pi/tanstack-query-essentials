import { Post } from '@/types';
import { useMutation } from '@tanstack/react-query';
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
  const { mutate } = useMutation({ mutationFn: createPost });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, body: 'This is a new post' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add title..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePost;
