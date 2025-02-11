import { useNavigate } from 'react-router-dom';
import SvelteSVG from "../assets/svelte.svg?react";
import LabeledInput from '../components/LabeledInput';
import { useState } from 'react';
import useUserStore from '../store/userStore';

const SignIn = () => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');

  const LogoSection = () => {
    return (
      <div className="icon-container w-24 h-24 m-4">
        <SvelteSVG
          className="fill-theme-color-500 cursor-pointer"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
    );
  };

  const UsernameInput = () => (
    <div className="id-container w-full h-2/6 box-border">
      <LabeledInput
        label="Username"
        value={inputUsername}
        onChange={(event) => {
          setInputUsername(event.target.value!);
        }}
        required
      />
    </div>
  );

  const PasswordInput = () => (
    <div className="password-container w-full h-2/5">
      <LabeledInput
        label="Password"
        type="password"
        autoComplete="off"
        value={inputPassword}
        onChange={(event) => {
          setInputPassword(event.target.value!);
        }}
        required
      />
      <div className="text-sm py-2 cursor-pointer font-medium text-theme-color-400 flex justify-end">
        Forgot Password?
      </div>
    </div>
  );

  const SubmitButton = () => (
    <div className="submit-button-container h-1/5 flex justify-center items-center mt-auto">
      <button className="w-32 h-5/6 border-2 rounded-lg bg-theme-color-400 text-gray-100 tracking-widest font-light">
        Sign In
      </button>
    </div>
  );

  const CreateAccountText = () => (
    <div className="account-create-container flex justify- w-full p-4 ">
      <div className="text-slate-400 mr-2 font-light">No Account?</div>
      <div className="text-theme-color-400 font-medium cursor-pointer">
        Create an Account
      </div>
    </div>
  );

  const submitUserInfo = () => {};

  return (
    <div className="userinfo-container flex flex-col items-center justify-center h-screen">
      <div className="form-container flex flex-col items-center justify-center">
        {/* logo */}
        <LogoSection />

        {/* ID-PW form  */}
        <div className="user-form-container">
          <form
            className="user-form-card-container h-80 min-w-96 m-4 p-4 bg-slate-50 shadow-theme-color-300 shadow-md border-2 rounded-lg flex flex-col"
            onSubmit={submitUserInfo}
          >
            {/* ID input */}
            <UsernameInput />

            {/* PW input */}
            <PasswordInput />

            {/* submit button */}
            <SubmitButton />
          </form>
        </div>

        {/* Account Create  */}
        <CreateAccountText />
      </div>
    </div>
  );
};

export default SignIn;
