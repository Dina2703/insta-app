import Post from "./Post";

function Posts() {
  const posts = [
    {
      id: "1",
      username: "gohn doe",
      userImg: "avatar.jpeg",
      img: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      caption: "Nice picture",
    },
    {
      id: "2",
      username: "mary grey",
      userImg: "avatar.jpeg",
      img: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      caption: "Nice picture",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
