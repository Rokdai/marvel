import styled from "styled-components";
import { Link } from "react-router-dom";
import { Error } from "../error/error";

export const Page404 = () => {
  const Wrapper = styled.div`
    max-width: 820px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const MessegeWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const Messege = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  `;

  const LinkText = styled.span`
    text-decoration: underline;
    &:hover {
      color: #9f0013;
    }
  `;

  return (
    <Wrapper>
      <Error />
      <MessegeWrapper>
        <Messege>Sorry, page not found</Messege>
        <Link to="/">
          <LinkText>Back to main page</LinkText>
        </Link>
      </MessegeWrapper>
    </Wrapper>
  );
};
