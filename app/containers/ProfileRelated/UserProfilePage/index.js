import React, { Component} from 'react';
import { withFirebase} from 'react-redux-firebase';
import _  from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import saga from './saga';
import reducer from './reducer';
import { loadProfile, loadedProfile, loadNews, loadEvents } from './actions'
import {makeSelectProfile, makeSelectNeedReload, makeSelectOwnership, makeSelectError,
    makeSelectNews, makeSelectEvents } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_PROFILE_PATH, UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile, makeSelectLoggedIn } from 'containers/App/selectors';
import {dimensions} from 'components/ProfileImage';
import {StyledLink} from 'components/StyledForm';
import Tags from 'components/Tags';

import {

    ProfileWrapper,
    Header,
    Options,
    Option,
    Footer,
    Content,
    ProfileImage,
    BioText,
    BioHeader,
    Links,
    StyledImageLink,
} from 'components/StyledComponents/UserProfilePage';
import { isNull } from 'util';
import {Button} from 'components/General';

import EventCard from 'components/EventCard';
import NewsCard from 'components/NewsCard';

import {

    tagClicked
} from 'containers/NewsPage/actions';



class UserProfilePage extends Component{


    constructor(props){

        super(props);

        this.state = {

            bioOpen:false,
            eventsHostedOpen:false,
            newsPostedOpen:false,
        };

        this.onContentViewUpdated = this.onContentViewUpdated.bind(this);

        //Unfortunately need to duplicate these functions for now, until think of better way to do this
        //does affect the store in terms of histoy, so maybe can create action
        //not huge duplicate though, so it's kinda fine lol.
        this.onGoToEvent = this.onGoToEvent.bind(this);
        this.onCardClicked = this.onCardClicked.bind(this);
    }


    onContentViewUpdated(toOpen){

        this.setState(state => {


            const newState = _.mapValues(state, () => false);

            newState[toOpen] = true;

            return newState;
        })

    }

    componentDidMount(){

        this.loadProfile();
    }

    loadProfile(){
        

        const uid = this.props.match.params.uid;
        const currUser = this.props.loggedInUser;

        if (currUser.isEmpty || uid != currUser.uid)
        {  
            this.props.loadProfile(uid);
        }
        else{
            
            this.props.alreadyLoaded(null);
        }
        

        this.props.loadEvents(uid);
        this.props.loadNews(uid);
        
    }

    
    onGoToEvent(event){

        console.log(this.props);

        const {history} = this.props;
        
        //becaues I do this. Better if i make it a link.
        history.push("/events/"+ event.eventUid);

    }


    onCardClicked = (postUid) =>{


        this.props.history.push("/news/"+postUid);
    }

    componentDidUpdate(){


        if (this.props.error != ""){

            this.props.history.push("/NotFound");
        }

         if (this.props.needReload == true){

            this.loadProfile();
        }

        console.log("Props of user profile", this.props);
    }

    //Need to add check on render of this in App where I check if it's a user, so need to load in all user uids.
    //at start? Or push on check in the saga.
    renderContent(userInfo, ownProfile){

        if (userInfo == null) return null;

        const {events, news, onTagClicked} = this.props;

        const {firstName, lastName, bio, major, year, profilePicture, mediaLinks} = userInfo;

        var profilePicUrl = null;
       
        if (profilePicture != null){
            profilePicUrl = profilePicture.url;
        }


        const concentrations = [{title:"Wrapper"}, {title:"Phisolaraptor"}, {title:"Yes"}, {title:"Animator"},{title:"Pornstar"},
        {title:"f"},{title:"sdsf"},{title:"sdfsfs"}, {title:"Phisolaraptor"}, {title:"Phisolaraptor"}, {title:"Phisolaraptor"},];


        //Using grid areas so order of mark up doesn't matter.
        return (<ProfileWrapper>

                <Header>

                    <div style = {{justifySelf:"end",gridArea:"actions", display:"flex", justifyContent:"flex-end"}}>                     
                    {ownProfile?  
                            
                            <StyledLink to={this.props.location.pathname+"/update"}> Update </StyledLink>
                            
                    : null }
                    </div>

                    <p style = {{gridArea:"role"}}> Developer </p>
                    <ProfileImage src={profilePicUrl} alt={"No image given"}  width={dimensions.width} height={dimensions.height}/>
                    <p style = {{gridArea:"name"}}> {firstName} {lastName} </p>
                    <p style = {{gridArea:"standing"}}> {major}, {year} </p>
                </Header>

                <Tags tags = {concentrations} style = {{gridArea:"concentrations", width:"25%", justifyContent:"center"}}/>
                
                <Footer>
                        {/*Will maybe add more as needed */}

                        <Options>

                            {/*Will be buttons later*/}
                            <Option selected = {this.state.bioOpen}onClick = {() => {this.onContentViewUpdated("bioOpen");}}> Bio </Option>
                            <Option selected = {this.state.eventsHostedOpen} onClick = {() => {this.onContentViewUpdated("eventsHostedOpen");}}> Events Hosted </Option>
                            <Option selected = {this.state.newsPostedOpen} onClick = {() => {this.onContentViewUpdated("newsPostedOpen");}}> News Posted </Option>

                        </Options>

                        <Content>
                        {this.state.eventsHostedOpen && events && events.map( event => {

                        return <EventCard  

                        //Oh this may be a problem. This isn't an action I can dispatch, I would just have to duplicate it unfortunately.
                        onCardClicked = {() => {this.onGoToEvent(event);}}
                        //It's aligned the most at margin left 5%, but problem is there's weird leak on the fade
                        style = {{width:"40%", height:"20em", margin:"auto", marginBottom:"5em", marginLeft:"40px"}} key = {event.eventUid} {...event}/>
                        })}

                        {/*So then depending on what's clicked will show diff content */}
                        {this.state.newsPostedOpen && news && news.map(post => {

                        return <NewsCard  key ={post.topic + "_" + post.author.name} {...post}
                        style = {{margin:"auto", width:"90%",}} 
                        onCardClicked = {this.onCardClicked} onTagClicked = {onTagClicked}/> 

                        })}
                        </Content>

                       

                </Footer>
            



                {/*If profile image not downloaded then stop, it no longer takes while
                after first session I could send get request for profile lodaed
                This works, but so that image loads in faster, I will instead send ftp request and save it
                locally.
                <Links>
                
                    {/*Need to add media links, and bio in update profile.*
                    { (mediaLinks == null)? null : 

                        mediaLinks.map(link => {

                            return (<a href={link.url}> <StyledImageLink src = {link.image}/> {link.name} </a>);
                        })
                    }
                    


                </Links>
                */}

    

            </ProfileWrapper>
        );

    }

    render(){

        
        
        //Welp, all the userINfo stuff was waste of time, but still works.
        const props = this.props;

        if (!props.userInfo && this.props.loggedInUserProfile == null){
            return null;
        }

        var userInfo = this.props.userInfo;
        var ownProfile = false;

        if (this.props.match.params.uid == this.props.loggedInUser.uid){

            ownProfile = true;
            userInfo = this.props.loggedInUserProfile;
        }

    
        
        
        //Gotta do this every render cause they log out.
        return  this.renderContent(userInfo,ownProfile);
        
    }
}



const mapStateToProps = createStructuredSelector({

    events: makeSelectEvents(),
    news: makeSelectNews(),
    needReload: makeSelectNeedReload(),
    loggedInUser: makeSelectLoggedIn(),
    loggedInUserProfile: makeSelectLoggedInProfile(),
    userInfo: makeSelectProfile(),
    error: makeSelectError(),

});

function mapDispatchToProps(dispatch){

    return {


        onTagClicked : (tag) => {

            return dispatch(tagClicked(tag));
        },
        replaceInventory : (inventoryID, page ) => {

            return dispatch(nextPageClicked(inventoryID,page));
        },

        loadNews : (uid) => {

            return dispatch(loadNews(uid));
        },

        loadEvents : (uid) => {

            return dispatch(loadEvents(uid));
        },

        loadProfile : (uid) => {

            return dispatch(loadProfile(uid));
        },
        alreadyLoaded: (profile) => {

            return dispatch(loadedProfile(profile));
        },
    }
}


const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:USER_PROFILE_PATH,reducer});
const withSaga = injectSaga({key:USER_PROFILE_PATH,saga})

export default compose(
    withConnect,
    withReducer,
    withFirebase,
    withSaga,
)(UserProfilePage);
