/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from '../store/store.type';

const Layout = styled.section`
    margin-left: 218px;
    margin-top: 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
 `;

const ResumeColumn = styled.ul`
    display: flex;
    flex-direction: column;
    max-width: 260px;
    width: 100%;
    height: 100vh;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const CurrentResumeColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;

`;
const NavBar = styled.div`
    
`;

const ColumnItem = styled.li`
    display: flex;
    height: 56px;
  
    align-items: center;
    border: 1px solid #D6EDFF;
    :hover {
        border: 1px solid rgba(0, 95, 219, 1);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    margin-left: 5px;
    flex: auto;
`;
const Header = styled.p`
    font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 120%;
margin: 0;

color: #008FFA;

`;

const Span = styled.span`
    font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 122%;



color: #A5A5A5;
`;

const Status = styled.div`
    width: 43px;
    height: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #008FFA;
`;

const LayoutForCurrentResume: FC = () => {
  const location = useLocation();
  const { allResumes } = useSelector((state) => state.resume);
  useEffect(() => {
    console.log(location.pathname.slice(16));
  });
  return (
    <Layout>
      <ResumeColumn>
        {allResumes?.map((el) => (
          <ColumnItem>
            <Wrapper>
              <Header>{el.name}</Header>
              <Span>{el.city}</Span>
            </Wrapper>
            <Status>{`${el.rating}%`}</Status>
          </ColumnItem>
        ))}
      </ResumeColumn>
    </Layout>
  );
};

export default LayoutForCurrentResume;
