import axios from "axios";

type Posts ={ 
    id:number,
    image: string,
    title:string,
    content:string
   }
   
 function AxiosFunctionCreatePost( {title, content, image} ) {
   return axios.post<Posts>("http://localhost:3004/posts/",{
    title,
    content,
    image,
 })
    .then(res => res.data)
}

    
export default AxiosFunctionCreatePost;