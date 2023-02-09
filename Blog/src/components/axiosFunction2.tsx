import axios from "axios";
type Posts ={ 
    id:number,
    image: string,
    title:string,
    content:string
   }
   
async function AxiosFunctionwithID( id:string ) {
    const { data } = await axios.get<Posts[]>(`http://localhost:3004/posts/${id}`)
    return data
}

    
export default AxiosFunctionwithID;

