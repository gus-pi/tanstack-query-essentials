import { Post } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchPost = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};
const PostById = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <>
      <p>{data.title}</p>
    </>
  );
};

export default PostById;
