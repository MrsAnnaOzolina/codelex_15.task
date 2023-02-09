import axios from "axios";

type Posts ={ 
    id:number,
    image: string,
    title:string,
    content:string
   }
   
async function AxiosFunctionwithIDComments( id:string ) {
    const { data } = await axios.get<Posts[]>(`http://localhost:3004/comments/?postId=${id}`)
    return data
}

    
export default AxiosFunctionwithIDComments;