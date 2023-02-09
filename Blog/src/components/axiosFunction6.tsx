import axios from "axios";

type Posts ={ 
    id:number,
    image: string,
    title:string,
    content:string
   }
   
 function AxiosFunctionEditPost( {id ,title, content, image}:{
  id:number,
  image: string,
  title:string,
  content:string
 }) {
   return axios.put<Posts>(`http://localhost:3004/posts/${id}`,{
    id,
    title,
    content,
    image
 })
    .then(res => res.data)
}

    
export default AxiosFunctionEditPost;