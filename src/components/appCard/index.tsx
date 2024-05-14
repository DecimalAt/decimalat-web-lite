import React from "react"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


interface AppCardProp {
    appName: string;
    description: string;
    appCount: Number;

}

const AppCardContainer = styled.div`
  background-color: #25304c;
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; /* Set flex direction to column */
  justify-content: space-between;
  transition: transform 0.3s ease, background-color 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    background-color: #314068;
    cursor: pointer; /* Change cursor on hover */
  }
`;

const AppIcon = styled.img`
  width: 30px;
  height: 30px;
  /* border-radius: 50%; */
`;

const AppName = styled.h3`
  margin: 10px 0;
`;

const AppDescription = styled.p`
  margin-bottom: 20px;
`;

const AppCount = styled.div`
  font-style: italic;
  align-self: flex-end;
`;



const AppCard: React.FC<AppCardProp> = ({ 
  appName, 
  description, 
  appCount, 
}) => {

  const navigate = useNavigate();

    const handleNavigate = (appnName : string) => {
        navigate(`/create/${appnName}`)
        
    }
    return (
        <>
            <AppCardContainer onClick={() => handleNavigate(appName)}>
                <AppIcon src="https://decimal.at/wp-content/uploads/2024/03/iconmonstr-share-4-32.png" alt="App Icon" />
                <AppName>{appName}</AppName>
                <AppDescription>{description}</AppDescription>
                <AppCount>{`${appCount} Apps`}</AppCount>
            </AppCardContainer>

        </>
    )
}


export default AppCard
