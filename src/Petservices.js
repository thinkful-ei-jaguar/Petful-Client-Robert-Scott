import config from './config'

const link = `${config.REACT_APP_API_BASE}/pets`

const PetService = {
    getpets(){
        return fetch(link,{
            method:'GET',
            headers:{
                'content-type':"application/json"
            }
        })
        .then(res=>{
            return (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        })    
    }

}

export default PetService