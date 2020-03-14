import config from './config'

const link = `${config.REACT_APP_API_BASE}/people`

const peopleservice = {
    getpeople(){
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
    dq(){
        return fetch(link,{
            method:'DELETE',
            headers:{
                'content-type':"application/json"
            }
        })
    },
    addperson(person){
        return fetch(link, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                person: person
            })
        })
    }
}

export default peopleservice