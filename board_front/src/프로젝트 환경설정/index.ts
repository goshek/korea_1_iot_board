export const tmp= "";

/*
    ! 프로젝트 환경 설정

    1. 외부 라이브러리 설치(의존성)
    : react-router-dom(경로 관리)
    : react-cookie(서버내부에서의 데이터 저장)
    : axios(비동기 상태관리)
    : zustand(전역상태관리)

    - npm i 뒤에 각 라이브러리명 사용

    2. 공통 상수, 공통 함수, 공통 타입 명시
    : 화면 URL
    : 네비게이션 구조 작성

    3. root 경로의 index.tsx에서 BrowserRouter 등록
        +) App.tsx에 Routes, Route를 사용하여 네비게이션 지정 

    4. index.tsx에서 BrowserRouter import하고 App /을 그 안에 넣기

    5. App.tsx의 빈 프래그먼트 안에 Routes  <Route element={<Container />}>

    6. src 하위에 layouts/Container/ index.tsx로 rfc하고 index 함수명을 Container로 변경

    7. src 하위에 새 폴더 constants

*/