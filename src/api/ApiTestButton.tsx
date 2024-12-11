// CreateUserButton.tsx
import React from 'react';
import { useCreateUserMutation } from '../api/userApi';

const CreateUserButton: React.FC = () => {
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();

  const handleClick = async () => {
    const hardcodedUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      password_hash: 'securepasswordhash',
      is_logged_in: false,
    };

    try {
      const response = await createUser(hardcodedUser).unwrap();
      console.log('User created successfully:', response);
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClick().catch(err => {
            console.error('Unexpected error during handleClick:', err);
          });
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create User'}
      </button>
      {isError && <p>Error: {JSON.stringify(error)}</p>}
    </div>
  );
};

export default CreateUserButton;
