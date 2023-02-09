import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from 'react'
import AxiosFunction from "./axiosFunction"
import { Link } from "react-router-dom";
import './home.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AxiosFunctionCreatePost from "./axiosFunction3"

type Posts = {
  id: number,
  image: string,
  title: string,
  content: string
}


function BlogCards() {
  const [showInput, setShowInput] = useState(false);
  const imageRef = useRef<React.MutableRefObject<string>>()
  const titleRef = useRef<React.MutableRefObject<string>>()
  const contentRef = useRef<React.MutableRefObject<string | undefined>>()

  // const [inputValues, setInputValues] = useState(" ");

  const navigate = useNavigate();
  const goToPosts = () => {
    navigate(-1);
  };

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery<Posts[]>({
    queryKey: ["posts"],
    queryFn: AxiosFunction
  })

  const createPostMutation = useMutation({
    mutationFn: AxiosFunctionCreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    },
  })

  function handleSubmit(e) {
    e.preventDefault();
    // if (titleRef.current.value === " ") {
    //     alert("Please fill all fields")
    //     return
    // }

    createPostMutation.mutate({
      title: titleRef.current.value,
      content: contentRef.current.value,
      image: imageRef.current.value,
    })
    setShowInput(false);
    titleRef.current.value = "";
    contentRef.current.value = "";
    imageRef.current.value = " ";
    
  }


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !data) {
    return <div>Error!</div>
  }

  return (
    <div id="blog">
      <div className="blog__addPostButton" >
        <button
          disabled={createPostMutation.isLoading}
          className="waves-effect waves-light btn-large"
          onClick={() => setShowInput(true)}
        >Add new post
        </button>
      </div>
      <div className='blog_addPost' style={showInput ? { display: "block" } : null}>
        <form
          onSubmit={handleSubmit}
        >
          <h1>Add New Post</h1>
          {/* <label><h5>title</h5></label> */}
          <input
            type='text'
            placeholder='Title'
            ref={titleRef}
            maxLength={20!}
            required
          //  name='inputValues'
          // value={inputValues}
          //  onChange={handleChange}
          />
          {/* <label htmlFor="content"><h5>content</h5></label> */}
          <input
            type='text'
            placeholder='content'
            ref={contentRef}
            required
          //  name='inputValues'
          // value={inputValues}
          //  onChange={handleChange}
          />
           <input
            type='text'
            placeholder='image link'
            ref={imageRef}
            required
          //  name='inputValues'
          // value={inputValues}
          //  onChange={handleChange}
          />
          
          <button
            // disabled={createPostMutation.isLoading}
            // onClick={() => newPostMutation.mutate(inputValues)} 
            className='waves-effect waves-light btn'
          >
            Add
          </button>
        </form>
      </div>
      <div className="blog">
        {data.map(posts => {
          return <div key={posts.id} className="blog__cards" >
            <div className="blog__imageDiv"> 
              <img src={posts.image} className="blog__image" />
            </div>
            <div>
              <h1 style={{ backgroundImage: `${posts.image}` }}>{posts.title}</h1>
              <p>{posts.content.substr(0, 40)}...</p>
              <Link to={`/blog/${posts.id}`} >
                <button className="waves-effect waves-light btn-small" >Read more</button>
              </Link>
            </div>
          </div>
        })
        }
      </div>
      <div></div>
    </div>
  )
}

export default BlogCards;




