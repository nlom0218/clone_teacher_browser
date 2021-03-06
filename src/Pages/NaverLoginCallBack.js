import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { logInUser } from '../apollo';
import routes from '../routes';

const NAVER_LOGIN_MUTATION = gql`
  mutation NaverLogin($email: String!) {
    naverLogin(email: $email) {
      ok
      token
    }
  }
`

const NaverLoginCallBack = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(undefined)
  const onCompleted = (result) => {
    const { naverLogin: { ok, error, token } } = result
    if (error) {
      // setErrMsg(error)
    }
    if (ok) {
      logInUser(token)
      navigate(routes.menu)
    }
  }
  const [naverLoginMutation, { loading }] = useMutation(NAVER_LOGIN_MUTATION, {
    onCompleted
  })
  const inItNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "Gf04qU_FzIfDWz4a9_6Z",
      callbackUrl: "http://localhost:3000/naverLogin",
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: '50' },
      callbackHandle: true
    })
    naverLogin.init()
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { email } = naverLogin.user
        setEmail(email)
      }
    })
    if (email) {
      if (loading) {
        return
      }
      naverLoginMutation({
        variables: {
          email
        }
      })
    }
  }
  useEffect(() => {
    inItNaverLogin()
  }, [email])
  return <div>
    <div id="naverIdLogin" style={{ position: "absolute", top: "-10000000000px" }}></div>
  </div>
}

export default NaverLoginCallBack;