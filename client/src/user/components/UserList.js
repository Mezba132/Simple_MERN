import React from 'react';
import './UserList.css'
import UserItem from './UserItem';

const UserList = (props) => {

    if(props.items.length === 0)
    {
    return (
        <div>
            <h1 className="center"> Nothing Found </h1>
        </div>
          );
    }

    return (
        <div>
            <ul className="users-list">
                {props.items.map( user => (
                <UserItem 
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    image={user.image}
                    placeCount={user.placeCount}
                />                 
                ))}
            </ul>
        </div>
    )
}

export default UserList;





















