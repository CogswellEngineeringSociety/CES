import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Pagination from 'rc-pagination';


//Honestly most will also have mainContentWrapper on them, but also specific ones.
const BlogPageWrapper = styled.div`



`;



///Panel of all the posts
const BlogsPanel = styled.div`

    width:60%;
    height:400px;

    margin-left:5%;
    margin-top:2.5%;

`;


//Pannel for posting.
const BlogPostPanel = styled(Modal)`

    margin-top:2.5%;

`;

const AddLinkPanel = styled(Modal)`


`;

const PostPanelButton = styled.button`

`;

const PostActions = styled.span`


`;

const PostActionButtons = styled.button`


`;

const StyledPagination = styled(Pagination)`

    margin-left:40%;
`;

const StyledTextArea = styled.textarea`

    width:100%;
    padding-bottom:20%;
    border: 1px solid black;
    vertical-align: baseline;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 20px;

`;


export{

    BlogPageWrapper,
    BlogsPanel,
    BlogPostPanel,
    PostPanelButton,
    PostActions,
    PostActionButtons,
    StyledPagination,
    StyledTextArea,
    AddLinkPanel,
};