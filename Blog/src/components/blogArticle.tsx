import {useMutation, useQuery,QueryClient, useQueryClient} from "@tanstack/react-query"
import AxiosFunctionwithId from "./axiosFunction2"
import AxiosFunctionwithIDComments from "./axiosFunction4"
import AxiosFunctionAddComment from "./axiosFunction5"
import AxiosFunctionEditPost from "./axiosFunction6"
// import { Link } from "react-router-dom";
import './home.css'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useRef,useState } from "react";



 type Posts={ 
  id:number,
  image: string,
  title:string,
  content:string
 }
 type Comments={ 
    id: number,
    comment: string,
    postId: number
   
   }

   const Values = {
    editfield0: 0 ,
    editfield1: "",
    editfield2: "",
    editfield3: ""
  }
  
let editedTitle = " "
let editedContent = " "
let picture = " "
let myid = " "


function BlogArticles() {
    const [showInput, setShowInput] = useState(false);
    const [editfile, setEditFile] = useState(Values)
    const inputCommentRef = useRef<React.LegacyRef<HTMLInputElement>>();
    const inputAuthorRef = useRef<React.LegacyRef<HTMLInputElement>>();
    let { id } = useParams<{id:string}>();

    const navigate = useNavigate();
    const goBack = () => {
          navigate("/blog");
      };

      const {
        isLoading: loadingPost,
        error: errorPost,
        data: postData,
      } = useQuery<Posts>(['posts', id], () => AxiosFunctionwithId(id!),
      {
   
    }
      );
      const {
        isLoading: loadingPostComments,
        error: errorPostComments,
        data: commentsData,
      } = useQuery(
        ['comments', 'posts', id],
        () => AxiosFunctionwithIDComments(id!),
        {
          enabled: postData && Object.keys(postData).length > 0,
        }
      );

      useEffect(() => {
        // do some checking here to ensure data exist
        if (postData) {
          // mutate data if you need to
          setEditFile({
            editfield0: postData.id,
        editfield1: postData.title,
        editfield2: postData.content,
        editfield3: postData.image
          })
        }
      }, [postData])

    const queryClient = useQueryClient();
    const addNewCommentMutation = useMutation({
        mutationFn: AxiosFunctionAddComment,
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
        },
    })
    function handleSubmit(e){
        e.preventDefault();
        addNewCommentMutation.mutate({
            author: inputAuthorRef.current.value,
            comment: inputCommentRef.current.value,
            postId: id
        })
   
         inputCommentRef.current.value = "";
         inputAuthorRef.current.value = "";

    }

    const handleInputChange = (g:any) => {
        const target = g.target;
        const value = target.value;
        const name: string = target.name;

    
        setEditFile({
          ...editfile,
          [name]: value
    
        });
      }

const updateDataWithMutation = useMutation({
    mutationFn: AxiosFunctionEditPost, 
    onSuccess: () => {
        queryClient.invalidateQueries(["posts"])
    },
})

function saveChangesSubmit(e:any){

    e.preventDefault();
    updateDataWithMutation.mutate({
        id: editfile.editfield0,
        title: editfile.editfield1,
        content: editfile.editfield2,
        image: editfile.editfield3
    })
    setShowInput(false);

}



if (loadingPost) return <div>Loading...</div>
if (errorPost|| !postData) return <div>Error!</div>

if (loadingPostComments) return <div>Loading...</div>
if (errorPostComments|| !commentsData) return <div>Error!</div>

  return ( 
  
    <div className="blogArticle__cards">
        <div className="buttonGap">
        <button className="waves-effect waves-light btn" onClick={goBack}>back</button>
        <button 
        className="waves-effect waves-light btn"
        onClick={() => {setShowInput(true) }}
        >
        Edit post
        </button>
        </div>


        <div >
            {showInput && 
            <form 
             onSubmit={(e) => {saveChangesSubmit(e)}}
            >
            <label>
                change Title
                </label>
            <input 
            type="text"
            maxLength={20!}
            required
            name='editfield1'
            defaultValue={editfile.editfield1}
            onChange={(g) => { handleInputChange(g) }}
            
            />
            
            <label>
                change content
            </label>
            <input 
            type="text"
            name='editfield2'
            defaultValue={editfile.editfield2}
            onChange={(g) => { handleInputChange(g) }}
            />
            <div className="buttonGap">
            <button className="waves-effect waves-light btn-small">Save changes</button>
            </div>
            </form>
            }
            </div>
<div className="blogArticle__imageAndTitle">
    <img src={postData.image}  width="300px"/>
  <h1>{postData.title}</h1>
  </div>
    <p>{postData.content}</p>
    <h6 style={{textDecoration: "underline", color: "grey"}}>Comments:</h6>
    <div>{commentsData?.map( allComments => {
        return <div key={allComments.id}><p style={{fontWeight: "bold"}}>{allComments.author}: </p> <p className="brown-text text-lighten-3 gap">{allComments.comment}</p></div> 
      }) 
    }
    </div>
    <div style={{marginTop: " 40px"}}>
    <h6>You can add your comment here:</h6>
    <div className="blogArticle__comment">
        <form 
        onSubmit={handleSubmit}
        >
            <div className="blogArticle__commentLine">
              <label htmlFor="author">Your name</label>
              <input 
            type="text"
            placeholder="author name"
            required
            ref={inputAuthorRef}
            />
            <label htmlFor="comment">
                Add your comment here
            </label>
            <input 
            type="text"
            placeholder="comments"
            required
            ref={inputCommentRef}
            />
            </div>
            <div className="buttonAddNewComment">
        <button 
        className="waves-effect waves-light btn"
        > 
        add new comment
        </button>
        </div>
        </form>
    </div>
    </div>
</div>
  )
}

export default BlogArticles

       
  
  
  