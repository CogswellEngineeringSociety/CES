//idk why didn't do this ooner
const prefix = 'ces/BlogPage/'

//WIll keep here for now, but pagination gone for news page cause
//infinite scrolling makes more sense.
 const LOAD_MORE = prefix+'LOAD_MORE';
 const LOAD_POSTS = prefix+'LOAD_POSTS';
 const LOADING_POSTS = prefix+'LOADING_POSTS';
 const LOADED_POSTS = prefix+'LOADED_POSTS'; 
 //incase correcting or updating a post, I could force to a new post but editing should be allowed.
 const MODIFICATIONS_MADE = prefix+'MODIFICATIONS_MADE';
 

 const ON_TAG_CLICKED = prefix + 'ON_TAG_CLICKED';
 const REMOVE_TAG_FILTER = prefix + 'REMOVE_TAG_FILTER';


export {
    LOAD_MORE,
    LOAD_POSTS,
    LOADING_POSTS,
    LOADED_POSTS,
    MODIFICATIONS_MADE,
    ON_TAG_CLICKED,
    REMOVE_TAG_FILTER,

}