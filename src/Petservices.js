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
    },

    deletePet(breed){

        return fetch(link, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                type: breed
            })
        })
    }
}

export default PetService