import React from 'react'
import { useState } from 'react';
/*
    ! useState
    1. 함수형 컴포넌트
    2. 상태 관리
    3. Hook

    cf) Hook
    : 리액트 함수형 컴포넌트에서 사용할 수 있는 기능의 모음
    : 문법 체계가 use- 로 시작

    파일에서 파일로는 useState사용 불가 why? component단위로 하기 때문
    부모 컴포넌트에서 자식 컴포넌트로 전달 힐 수는 있게 Props, 자식에서는 read-only

    ! useState 사용법
    const [state, setState]= useState<타입>(초기값);

    useState의 return value
    : [상태변수, 상태업데이트함수]

    const 상태변수= 초기값;
    const 상태업데이트함수(){
    }

    const 상태업데이트함수= () =>{
    }

    cf) 구조 분해 할당
    : 배열이나 객체의 속성을 변수로 쉽게 추출할 수 있도록 하는 기능
*/
// 배열
const[a, b]= [1, 2];

// 객체
const {name, age}={
    name: 'gsh',
    age: 20
}
// const a= 0;
// const name= 'ksh';

export default function A_useState() {
  /*
    React의 체계
    : TSX 문법 체계
    : TS(JS) 내에서 HTML을 작성
    - 함수형 컴포넌트의 반환을 HTML문서로 반환 

    1. TS내에서 HTML 작성: () 소괄호로 묶음
    2. HTML내에서 TS 작성: {} 중괄호로 묶음

  */
  const [count, setCount]= useState<number>(0);
  const handleIncrementButton=()=>{
    // set 상태 설정함수에 전달되는 인자값으로 count값이 업데이트됨.
    // * 이전의 상태와 연관이 없는 경우 
    //setCount(count+1);

    // * 이전의 상태와 연관이 있는 경우
    // :prev 상태변수명
    // : 최신의 상태변수값을 가지고 옴
    setCount(prev=> prev+1);

  }
  return (
    <div>
        <p>Count: {count}</p>
        <button onClick={handleIncrementButton}>증가</button>
    </div>
  );
}
