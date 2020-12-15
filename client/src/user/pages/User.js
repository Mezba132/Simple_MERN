import React from 'react';
import UserList from '../components/UserList';

const User = () => {

    const User = [{
        id : "uid12",
        name : "Leo Messi",
        image : "https://english.cdn.zeenews.com/sites/default/files/2015/06/05/365209-lionel-messi-young.jpg",
        placeCount : 5
    }];

   return  (
       <div>
            <UserList items={User}/>
       </div>
   )  
}

export default User;