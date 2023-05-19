import { useSelector } from 'react-redux';

import UserList from './UserList';

// const USERS = [
//     { id: '1', name: 'Enes', email: 'eneshamzaj328@gmail.com' },
//     { id: '2', name: 'Plarent', email: 'hplarent328@gmail.com' }
// ];

const Users = () => {
    const users = useSelector((store) => store.users);

    return <UserList users={users} />
};

export default Users;