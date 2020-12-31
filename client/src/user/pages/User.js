import React, {useEffect, useState} from 'react';
import UserList from '../components/UserList';
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

const User = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadUsers, setLoadUsers] = useState();

    useEffect( () => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users' );
                const responseData = await response.json();
                if(!response.ok)
                {
                    throw new Error(responseData.message);
                }
                setLoadUsers(responseData.users);
            }
            catch (err) {
                setError(  "something went wrong, try again");
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

   return  (
       <React.Fragment>
           <ErrorModal error={error} onClear={errorHandler} />
               { isLoading && (
                   <div className="center">
                       <LoadingSpinner />
                   </div>
               )}
           {/*{console.log(loadUsers)}*/}
           { !isLoading && loadUsers && <UserList items={loadUsers}/>}
       </React.Fragment>
   )  
}

export default User;