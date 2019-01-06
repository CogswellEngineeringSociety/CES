import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    
    background-color:rgb(36, 154, 29);
    position: -webkit-sticky;
    position:sticky;

    border:2px solid black;
    height:50px;
    flex-direction:row;
    justify-content: space-between;
    display:flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;

`;



const Link = styled.div`

    align-self:center;
`;

const Footer = props => {



    //This will have link to contact, repository.
    return (<Wrapper>
        
        <Link> Github </Link>      
        
        </Wrapper>)

}

export default Footer;