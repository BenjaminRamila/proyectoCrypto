import React, {useEffect,useState} from 'react';
import axios from 'axios';

const All = () => {

    const [users,setUsers]=useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('/api/users', {withCredentials: true})
        .then(res=> {
            setUsers(res.data);
            console.log(res.data);
            setLoaded(true);
        } )
        .catch(err=>console.log('Error:',err))
    },[])



    return (
        <div>
            all
        </div>
    );
}

export default All;
