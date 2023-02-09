import axios from "axios";

type Comments ={ 
    id:number,
    commnent:string,
    postId:number
   }
   
 function AxiosFunctionAddComment( {author, comment, postId} :{
  author:string,
  comment: string,
  postId:string
 }) {
   return axios.post<Comments>("http://localhost:3004/comments",{
   author,
   comment,
   postId
    
 })
    .then(res => res.data)
}

    
export default AxiosFunctionAddComment;