import { useQuery } from '@tanstack/react-query';
import './App.css';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <>
      {data.map((post: Post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  );
}

export default App;
