import React from 'react'

import UseState  from '../../react-study/A_useState'
import UseEffect from '../../react-study/B_useEffect'
import StateEffect from '../../react-study/C_StateEffect'

export default function ReactStudy() {
  return (
    <>
        <h2>Usestate: 상태관리</h2>
        <UseState />

        <h2>UseEffect: 부수효과</h2>
        <UseEffect />
        
        <h2>State & Effect: 메뉴 검색 구현</h2>
        <StateEffect />
    </>
  )
}
