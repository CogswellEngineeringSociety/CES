import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import Tags from 'components/Tags';
//Aight, Ima just copy common news card layouts 
//seen in league, overwatch, runescape.
//I also want to do better than than that.. Fuck it that can be done later/

//Make it fucking viewable lmao.

const Wrapper = styled.div`


    width:100%;
    //Random hard coded height, no bueno.
    //I want to set this to soemthing else.
    height:240px;
    display:grid;
   // border-bottom: 2px solid black;
    grid-column-gap: 2%;
    grid-template-columns: 30% 60%; 
    grid-template-rows: 1fr 2fr 1fr 1fr;

    grid-template-areas:
    "thumbnail header"
    "thumbnail description"
    "thumbnail footer"
    "thumbnail . ";


    cursor:pointer;

    &:hover{
        background-color:rgba(2, 28, 73,0.5);
        //Not really sure what hover effect for this should be.
        //Or maybe instead of whole thing clickable, title and thumbnail can be
        //that way the author is also clickable
        //then also have a see more? But still need some indication that thumbnail clickable and title is on hover

    }
`;  

const Thumbnail = styled.div`

    grid-area: thumbnail;

    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat: no-repeat;


    ${Wrapper}:hover & {
        //background-size:contain;
    }  
`;

//Will include title and author
const Header = styled.div`

    grid-area:header;
    display:grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    "title title"
    "author uploadDate";
`;

const Title = styled.p`

    grid-area:title;
    font-weight: bold;
    color: rgb(254, 161, 0);
    

`;

const Author = styled.div`

    grid-area:author;
`;

const UploadDate = styled.div`

    grid-area:uploadDate;
    align-self:start;
`;

//Prob just first paragraph / sentence of news post.
//That will be done via form submission of adding new posts.
const Description = styled.p`

    grid-area:description;
    word-wrap: break-word;
`;



const Footer = styled.div`

    display:flex;
    width:100%;
    flex-wrap: nowrap;
    justify-content:space-between;

`;



const Button = styled.div`

    align-self:flex-end;
`;


//Essentially taking place of NewsPost.
const NewsCard = props => {



    const {postUid,thumbnail,topic,author, postDate, content,tags, onCardClicked} = props;
    console.log("post date", postDate);
    return (
        <Wrapper onClick = { () => {onCardClicked(postUid)}} style = {props.style}>


            <Thumbnail image = {thumbnail} />
            <Header>

                <Title> {topic} </Title>
                  <Author> by <i>{author.name}</i> </Author> <UploadDate>{ postDate && dateFns.format(postDate.toDate(), "MMMM     DD YYYY")} </UploadDate> 

            </Header>

            <Description> {content} </Description>
            <Footer>
                <Tags tags = {tags}/>
            </Footer>

        </Wrapper>
    )
    
}

export default NewsCard;