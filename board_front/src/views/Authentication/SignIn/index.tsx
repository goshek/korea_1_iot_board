import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/auth.store';

//* Interface *//
// 사용자 입력 정보(자격 정보)의 상태를 나타냄 
// credential: 자격증, 신원 정보
interface Credentials{
  email: string;
  password: string;
}

// 로그인 후 전역 상태에 저장될 사용자 데이터를 나타냄
interface UserAuthData{
  id: number;
  email: string;
}

// 서버에서 반환하는 로그인 응답 데이터의 형태를 나타냄
interface SignInResponseDto{
  token: string;
  user: UserAuthData;
  exprTime: number;
}

// * Main Component: 로그인 컴포넌트 * //
export default function SignIn() {
  // * State * //
  // const [user, setUser]= useState<Credentials>({
  //   email: '',
  //   password: ''
  // });
  // state: 로그인 입력 필드 상태  
  const [credentials, setCredentials]= useState<Credentials>({
    email: '',
    password:''
  });

  const [error, setError]= useState<string>('');
  const [,setCookies]= useCookies(['token']);

  const { login }= useAuthStore();
  // * Hooks 기능 정의 * //
  // function: 페이지 전환
  const navigate= useNavigate();

  // 로그인 성공 시 실행
  // : 서버 응답이 성공일 경우 token과 사용자 정보를 저장 & 페이지 이동
  
  const SignInSuccessResponse=(data: SignInResponseDto)=>{
    if(data){
      const {token, exprTime, user}= data;
      setToken(token, exprTime);
      login({
        id: user.id,
        name: user.email
      })
      navigate('/');
    }
    else{
      setError('로그인 실패: 인증 정보를 확인해주세요.');
    }
  }

  //# 인증 토큰을 저장하는 함수
  const setToken=(token: string, exprTime: number)=>{
    const expires= new Date(Date.now()+ exprTime);
    setCookies('token', token, {
      path: '/',
      expires
    });
  };

  // * Event Handler * //
  // 이벤트 핸들러: 로그인 입력 필드 입력 이벤트 처리 함수
  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const element= e.target;
    setCredentials({
      ...credentials,
      [element.name]: element.value
    });
  }

  // 로그인 버튼 클릭 이벤트 처리 함수
  const handleSignIn=async()=>{
    const {email, password}= credentials;
    // email O, password O > false
    // email X, password O > true
    // emial X, password O > true
    // email X, password O >  true
    if(!email || !password){
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    try{

      const response= await axios.post("http://localhost:8080/api/v1/auth/signIn", credentials);
      console.log(JSON.stringify(response));
      if(response.data){
        SignInSuccessResponse(response.data.data);
      }

    }
    catch (error) {
      setError('로그인 중 문제가 발생했습니다.');
    }
  };

  return (
    <>
      <Card variant='outlined' sx={{
        width: 360,
        m: 'auto',
        mt: 4
      }}>
        <CardContent>
          <Typography variant='h5' mb={2}>
            로그인
          </Typography>
          {/* 입력 필드 */}
        <TextField
          label="이메일"
          type="email"
          name="email"
          variant="outlined"
          value={credentials.email}
          onChange={handleInputChange}
          fullWidth // 전체 너비 차지
          margin="normal"
          // !!데이터 값
        />

        <TextField
          label="비밀번호"
          type="password"
          name="password"
          variant="outlined"
          value={credentials.password}
          onChange={handleInputChange}
          fullWidth // 전체 너비 차지
          margin="normal"
        />

        {error && (
          <Typography color='error' mt={2}>
            {error}
          </Typography>
        )}

        </CardContent>
        <CardActions>
          <Button onClick={handleSignIn} fullWidth variant="contained" color="primary">
            logIn
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
