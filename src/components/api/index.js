import axios from'axios'
export const ENDPOINTS={
    participant:'participants',
    question:'Questions',
    getAnswers : 'Questions/GetAnswers'

}
export const URL= 'http://localhost:5267/';

export const createAPIEndpoint = endpoint=>{
    let url = URL+'api/'+ endpoint+'/'
    return{
        fetch:()=>axios.get(url),
        fetchById:id=>axios.get(url+id),
        post:newRecord=>axios.post(url,newRecord),
        put:(id,updatedRecord)=>axios.put(url+id,updatedRecord),
        delete:id=>axios.delete(url+id),
    }
}