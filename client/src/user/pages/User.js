import React, {useEffect, useState} from 'react';
import UserList from '../components/UserList';
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useHttpClient } from "../../shared/components/CustomHooks/HttpHooks";

const User = () => {
    const [loadUsers, setLoadUsers] = useState();

    const { isLoading, error, sendRequest, errClear } = useHttpClient();

    useEffect( () => {
        const getAllUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');
                setLoadUsers(responseData.users);
            }
            catch (err) { throw err;}
        };
        getAllUsers();
    }, [sendRequest]);


   return  (
       <React.Fragment>
           <ErrorModal error={error} onClear={errClear} />
               { isLoading && (
                   <div className="center">
                       <LoadingSpinner />
                   </div>
               )}
           { !isLoading && loadUsers && <UserList items={loadUsers}/>}
       </React.Fragment>
   )  
}

export default User;