import styled from 'styled-components';

export const Card = styled.div`
    background:rgba(222, 225, 227, 0.9);
    border-radius: 3px;
    margin: 1em 1em;
    color:#4C4E50;
    display: block;
    width: 300px;
`;

export const CardWrapper = styled.div`
    margin: 10px;
`;

export const AddCard = styled.div`
    display: block;
    margin-top: 0.75em;
    padding: 0.5em 0.75em;
    color: #797a7c;
    border-radius: 0 0 3px 3px;
    cursor: pointer;
    :hover{
        background:#ccbcbc;
        color: black;
    }
`;