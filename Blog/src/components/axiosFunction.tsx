import axios from "axios";
type Posts ={ 
    id:number,
    image: string,
    title:string,
    content:string
   }
   
async function AxiosFunction() {
    const { data } = await axios.get<Posts[]>("http://localhost:3004/posts?_sort=id&_order=desc")
    return data
}
    
export default AxiosFunction;