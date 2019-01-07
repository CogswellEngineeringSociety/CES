import { createSelector } from 'reselect';
import { BLOG_PATH } from 'components/Header/pages';

const blogPageState = (state) => state.get(BLOG_PATH);


const makeSelectPosting = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) 
            return false;

        return blogPageState.get("posting");
    }

)


//Something like this could use generic for, but instantiating an object just for that is excessive,
//rather dupe code, then have that overhead.
const makeSelectError = () => createSelector(

    blogPageState,
    (blogPageState) => {
        

        return (blogPageState == null)? "" : blogPageState.get("error");
    }

)

const makeSelectPosts = () => createSelector(

    blogPageState,
    (blogPageState) => {
        
        if (blogPageState == null) return [];
        

        const toShow = [];
        const amountToShow = blogPageState.get("amountToShow");
        const allPosts = blogPageState.get("allPosts");
        for (var i = 0; i < amountToShow && i < allPosts.length; ++i){

            toShow.push(allPosts[i]);
        }
        console.log(toShow);
        
        return toShow;
    }
);

const makeSelectAmountToShow = () => createSelector(


    blogPageState,
    (blogPageState) => {


        if (blogPageState == null) return 0;

        const amountToShow = blogPageState.get("amountToShow");

        return amountToShow;
    }
)

const makeSelectMaxAmountToShow = () => createSelector(


    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) return 0;

        const allPosts = blogPageState.get("allPosts");

        return allPosts.length;
    }
)

const makeSelectPostFields = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) {
                return null;
        }

        return blogPageState.get("postContent");
    }
);



export{
    makeSelectPosts,
    makeSelectMaxAmountToShow,
    makeSelectAmountToShow,
    makeSelectPostFields,
    makeSelectError,
    makeSelectPostsPerPage,
    makeSelectCurrentPage,
    makeSelectPosting,
};