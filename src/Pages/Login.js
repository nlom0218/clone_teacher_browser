import React, { useState } from 'react';
import AccountTitle from '../Components/Account/AccountTitle';
import AccountForm from '../Components/Account/styled/AccountForm';
import AccountInput from '../Components/Account/styled/AccountInput';
import AccountSubmitInput from '../Components/Account/styled/AccountSubmitInput';
import SocialLogin from '../Components/Account/SocialLogin';
import { FaUser, FaLock } from "react-icons/fa";
import LoginNavigation from '../Components/Account/styled/LoginNavigation';
import AccountContainer from '../Components/Shared/AccountContainer';
import InputLayout from '../Components/Account/styled/InputLayout';
import DivideLine from '../Components/Account/DivideLine';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes';
import { useForm } from 'react-hook-form';
import BackBtn from '../Components/Account/BackBtn';
import { gql, useMutation } from '@apollo/client';
import { logInUser } from '../apollo';
import ErrMsg from '../Components/Account/styled/ErrMsg';

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      ok
      token
      error
    }
}
`

const Login = () => {
  const [errMsg, setErrMsg] = useState(undefined)
  const { state } = useLocation()
  const navigate = useNavigate()
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      ...(state && {
        email: state.email,
        password: state.password
      }),
    }
  })
  const onCompleted = (result) => {
    const { loginUser: { ok, error, token } } = result
    if (error) {
      setErrMsg(error)
    }
    if (ok) {
      logInUser(token)
      navigate(routes.menu)
    }
  }
  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    const { email, password } = data
    if (loading) {
      return
    }
    loginUser({
      variables: {
        email,
        password
      }
    })
  }
  const onChangeInput = () => setErrMsg(undefined)
  return (<AccountContainer>
    <BackBtn />
    <AccountTitle title="?????????" />
    <AccountForm onSubmit={handleSubmit(onSubmit)}>
      <InputLayout>
        <FaUser />
        <AccountInput
          {...register("email", {
            required: true,
            onChange: onChangeInput
          })}
          type="email"
          placeholder="???????????? ??????????????????."
          autoComplete="off"
        />
      </InputLayout>
      <InputLayout>
        <FaLock />
        <AccountInput
          {...register("password", {
            required: true,
            onChange: onChangeInput
          })}
          type="password"
          placeholder="??????????????? ??????????????????."
          autoComplete="off"
        />
      </InputLayout>
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      <AccountSubmitInput
        type="submit"
        value="?????????"
        disabled={!isValid}
      />
      <DivideLine />
      <SocialLogin />
    </AccountForm>
    <LoginNavigation>
      <div>????????? ???????????????? <Link to={routes.createAccount}>?????? ?????????</Link></div>
      <div className="findNavigation">?????????/??????????????? ????????????????</div>
    </LoginNavigation>
  </AccountContainer>);
}

export default Login;