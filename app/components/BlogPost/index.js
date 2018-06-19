import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Like use profile prob move this into corresponding folder in components, but here for quick tseting.
const BlogPostWrapper = styled.div`




`;

const Topic = styled.p`



`;

const Author = styled.p`

`;

const Body = styled.textarea`


`;


//infact this whole thing should be a component actually.

const BlogPost = (props) => {

    //Change all dscriptions to body, makes mroe sense.
    const {topic,body,author} = props;

    return (<BlogPostWrapper>

            <Topic> {topic} </Topic>

            <Author> by <Link to ={"/account/"+author.uid} > {author.name} </Link> </Author>

            <Body> {body} </Body>



        </BlogPostWrapper>
    )

}

BlogPosts.propTypes={


    topic:PropTypes.string.isRequired,
    body:PropTypes.string.isRequired,
    author:PropTypes.object.isRequired,

}



export default BlogPost;