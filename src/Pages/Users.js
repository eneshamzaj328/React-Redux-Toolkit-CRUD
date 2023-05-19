import Users from '../components/Users/Users';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser';


const UsersPage = () => {
    const searchParams = new URL(document.location.href).searchParams;
    const action = searchParams.get('action') || 'add';

    let content = <Users />;

    switch (action) {
        case "add":
            content = <AddUser />
            break;
        case "edit":
            content = <EditUser />;
            break;
        default: break;
    }

    return (
        <>
            {content}
        </>
    );
};

export default UsersPage;