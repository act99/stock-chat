import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 400px;
  background: #17181e;
  border: solid ${shade(0.2, "#8b8b8e")} 1px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  max-height: 600px;
  width: 100%;
  max-width: 600px;
  background: #17181e;
  border: solid ${shade(0.2, "#8b8b8e")} 1px;
  input {
    margin-top: 8px;
    padding: 2px;
    height: 40px;
    border: solid #333 1px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #8b8b8e;
    color: #fff;
    border-radius: 9px;
    border: none;
    height: 40px;
    margin-top: 16px;
  }
  ul {
    padding: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const Card = styled.div`
  margin-top: 16px;
  height: 100%;
  overflow: auto;
  border: solid #333 1px;
`;

export const MyMessage = styled.li`
  padding: 8px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-end;
  width: 200px;
  background: #0088cc;
  color: #fff;
  border-radius: 9px;
  + li {
    margin-top: 4px;
  }
`;

export const OtherMessage = styled.li`
  padding: 8px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  background: #f1f1f1;
  border-radius: 9px;
`;
