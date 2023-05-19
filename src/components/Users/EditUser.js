import { useReducer, useRef, lazy, Suspense } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../store/slice/userSlice';

import { useNavigate, Link } from 'react-router-dom';

import Form from '../UI/Form';
import Input from "../UI/Input";
import Button from "../UI/Button";

const LazyUsers = lazy(() => import('./Users'));

const initialState = {
    name: '',
    email: '',
    error: null
};

const reducer = (state, action) => {
    if (action.type === 'error') {
        return {
            ...state,
            error: action.errMessage
        }
    }

    if (action.type === 'input_name') {
        return {
            ...state,
            name: action.value,
            // email: state.email
        }
    }

    if (action.type === 'input_email') {
        return {
            ...state,
            email: action.value,
            // name: state.name
        }
    }

    if (!(action.type in initialState)) {
        throw Error('Unknown action: ' + action.type);
    }

    return initialState;
};

const idToFix = (id) => isNaN(id) ? id : String(id);

const EditUser = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users);

    const navigate = useNavigate();

    const searchParams = new URL(document.location.href).searchParams;
    const userId = searchParams.get('id') || null;

    const existingUser = users.find(user => idToFix(user.id) === idToFix(userId));

    const nameInputRef = useRef();
    const emailInputRef = useRef();

    const [inputState, localDispatch] = useReducer(reducer, initialState);

    const inputNameBlurHandler = (event) => {
        localDispatch({ type: 'input_name', value: event.target.value });
    };

    const inputEmailBlurHandler = (event) => {
        localDispatch({ type: 'input_email', value: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const nameInputValue = nameInputRef.current.value;
        const emailInputValue = emailInputRef.current.value;

        if (nameInputValue === '' || emailInputValue === '') {
            const inValidInput = (nameInputValue === '' && emailInputValue === '') ? "Name and Email" : "Name or Email";

            localDispatch({ type: 'error', errMessage: `${inValidInput || 'Please fill in All Fields!'} cannot be empty!` });

            return;
        }

        dispatch(
            editUser({
                id: (isNaN(+userId) ? userId : +userId),
                name: nameInputValue,
                email: emailInputValue
            })
        );

        navigate('/');
    };

    if (!userId) {
        return <Suspense fallback={<p>Loading...</p>}><LazyUsers /></Suspense>;
    }

    return (
        <div className="mt-10 max-w-xl mx-auto">
            <h1 className="text-center text-2xl font-thin underline mt-20 mb-10">Edit User</h1>
            <Form onSubmit={submitHandler}>
                <Input ref={nameInputRef}
                    label="Name"
                    onBlur={inputNameBlurHandler}
                    options={{
                        type: 'text', placeholder: "John Doe",
                        value: inputState.name,
                        defaultValue: existingUser.name
                    }}
                />
                <Input ref={emailInputRef}
                    label="Email"
                    className="mt-5"
                    onBlur={inputEmailBlurHandler}
                    options={{
                        type: 'email', placeholder: "john-doe@email.com",
                        value: inputState.email,
                        defaultValue: existingUser.email
                    }} />
                <div>
                    <Button options={{ type: 'submit' }}>Edit</Button>
                    <Link to="/" className="ml-2 p-1.5 font-medium text-lg text-slate-900 border rounded">
                        Back to Home {'>'}
                    </Link>
                </div>
                {inputState.error && <p>{inputState.error}</p>}
            </Form>
        </div>
    );
};

export default EditUser;