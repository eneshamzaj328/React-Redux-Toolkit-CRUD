import { useReducer, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { addUser } from '../../store/slice/userSlice';

import { v4 as uuidv4 } from 'uuid';

import { useNavigate, Link } from 'react-router-dom';


import Form from '../UI/Form';
import Input from "../UI/Input";
import Button from "../UI/Button";

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
            name: action.value,
            email: state.email
        }
    }

    if (action.type === 'input_email') {
        return {
            email: action.value,
            name: state.name
        }
    }

    if (!(action.type in initialState)) {
        throw Error('Unknown action: ' + action.type);
    }

    return initialState;
};

const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameInputRef = useRef();
    const emailInputRef = useRef();

    const [inputState, localDispatch] = useReducer(reducer, initialState);

    // const inputNameHandler = (event) => {
    //     localDispatch({ type: 'input_name', value: event.target.value });
    // };

    // const inputEmailHandler = (event) => {
    //     localDispatch({ type: 'input_email', value: event.target.value });
    // };

    const inputNameBlurHandler = (event) => {
        localDispatch({ type: 'input_name', value: nameInputRef.current.value });
    };

    const inputEmailBlurHandler = (event) => {
        localDispatch({ type: 'input_email', value: emailInputRef.current.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const nameInputValue = nameInputRef.current.value;
        const emailInputValue = emailInputRef.current.value;

        if (nameInputValue === '' || emailInputValue === '') {
            const inValidInput = (nameInputValue === '' && emailInputValue === '') ? "Name and Email" : "Name or Email";

            localDispatch({ type: 'error', errMessage: `Input ${inValidInput || 'Please fill in All Fields!'} cannot be empty!` });

            return;
        }

        dispatch(
            addUser({ id: uuidv4(), name: nameInputValue, email: emailInputValue })
        );

        navigate('/');
    };

    return (
        <div className="mt-10 max-w-xl mx-auto">
            <h1 className="text-center text-2xl font-thin underline mt-20 mb-10">Add User</h1>
            <Form onSubmit={submitHandler}>
                <Input ref={nameInputRef}
                    label="Name"
                    // onChange={inputNameChangeHandler}
                    onBlur={inputNameBlurHandler}
                    options={{
                        type: 'text', placeholder: "John Doe",
                        value: inputState.name
                    }}
                />
                <Input ref={emailInputRef}
                    label="Email"
                    className="mt-5"
                    // onChange={inputEmailChangeHandler}
                    onBlur={inputEmailBlurHandler}
                    options={{
                        type: 'email', placeholder: "john_doe@email.com",
                        value: inputState.email
                    }} />
                <div>
                    <Button>Submit</Button>
                    <Link to="/" className="ml-2 p-1.5 font-medium text-lg text-slate-900 border rounded">
                        Back to Home {'>'}
                    </Link>
                </div>
                {inputState.error && <p>{inputState.error}</p>}
            </Form>
        </div>
    );
};

export default AddUser;