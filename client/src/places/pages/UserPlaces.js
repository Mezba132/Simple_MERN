import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const placeList = [
    {
        id:'u1',
        imageUrl: 'https://www.burjkhalifa.ae/en/Images/BurjKhalifa-02982_new_tcm290-85702.jpg',
        title : 'Burj Khalifa',
        description:'The tallest building in the world',
        address: '1 Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab Emirates',
        creator: 'u1',
        location: {
            lat: 25.197197,
            lng: 55.2721877
        }
    },
    {
        id:'u2',
        imageUrl: 'https://i.ytimg.com/vi/pEBW9TQSl3I/hqdefault.jpg',
        title: 'Bangladesh National Parliament',
        description: 'Best Architectural building in Bangladesh',
        address: 'Main Plaza, Dhaka, Bangladesh',
        creator: 'Mezba',
        location: {
            lat: 23.762466,
            lng: 90.3763924
        }
    }
]

const userPlace = () => {
    const uId = useParams().userId;
    const loadPlace = placeList.filter(place => place.id === uId);
    return <PlaceList items={loadPlace}/>
}

export default userPlace;