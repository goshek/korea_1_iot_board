import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

/*
    Menu 카테고리 검색
    
    ! Menu 객체 구조
    - 고유 값 id(Long - number)
    - 메뉴 명 name
    - 메뉴 설명 description
    - 메뉴 가격 price(number)
    - 메뉴 이용가능 여부 isAvailable(boolean)
    - 메뉴 카테고리 category
    - 메뉴 크기 size

    ! HTTP 
    - 메서드: GET
    - 경로: http://localhost:8080/api/v1/menus/search/category

*/
type Category = 'Food' | 'Drink' | 'Dessert';

const DOMAIN= 'http://localhost:8080';
const MENU_API= 'api/v1/menus';

interface GetMenuCategoryResponseDto {
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    category: string;
    size: string; 
}

export default function C_StateEffect() {
  const [query, setQuery]= useState<Category>('Food');
  const [category, setCategory]= useState<string>('');
  const [results, setResults]= useState<GetMenuCategoryResponseDto[]>([]);

  const handleCategoryChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setCategory(e.target.value);
  }
  const fetchMenuData=async(category: string)=>{
    if(category.trim()){
        try{
            const response= await axios.get(
                `${DOMAIN}/${MENU_API}/search/category`,
                {params: {category}}
            );
            const data= response.data.data;
            setResults(data);
        }
        catch(e){
            console.log("Error fetching data: ", e);
        }
    }
  }

   //! 매개변수 query 변경
   const fetchMenuButtonData = async (category: string) => {
    if (category.trim()) {
      try {

        const response = await axios.get(
          `${DOMAIN}/${MENU_API}/search/category`,
          //! params 값 변경
          { params: { category }}
        );

        const data = response.data.data;

        setResults(data);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }

  useEffect(()=>{
    fetchMenuData(category);
  },[category]);

  useEffect(()=>{
    fetchMenuButtonData(query);
  },[query]);

  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const selectedCategory = e.currentTarget.value as Category;
    setQuery(selectedCategory);
  }

  return (
    <div>
        <input type="text" 
        value= {category}
        onChange={handleCategoryChange}
        placeholder='Enter Category'
        required
        />

        <div>
            <button value='Food' onClick={handleButtonClick}>Food</button>
            <button value='Drink' onClick={handleButtonClick}>Drink</button>
            <button value='Dessert' onClick={handleButtonClick}>Dessert</button>
        </div>
        <ul>
            {results.map((result, index)=>(
                <li key={index}>{result.name}</li>
            ))}
        </ul>
    </div>
  )
}
