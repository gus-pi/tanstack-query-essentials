import CreatePost from './component/CreatePost';
import PostById from './component/PostById';
import Posts from './component/Posts';

const App = () => {
  return (
    <div className="flex items-center">
      {/* <Posts /> */}
      {/* <PostById id={3} /> */}
      <CreatePost />
    </div>
  );
};
export default App;
