import { put, call, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase';
import { LOAD_PROFILE, LOAD_NEWS, LOAD_EVENTS } from './constants'
import { failedToLoadProfile, loadedProfile, loadedEvents, loadedNews, } from './actions';

function* loadProfileCall(action){


     //Otherwise load in profile from fire store.
     const firestore = firebase.firestore();
     

     const docRef = firestore.collection("users").doc(action.uid);
     try{


        const snapshot = yield (docRef.get());

        if (snapshot.exists){


            //Contemplated just putting all in profile, but if want only credits, don't want to pull all that extra info.
            const userInfo = snapshot.data();
            
            //Adding uid, for checking if same when clicked to skip reloading.
            userInfo.uid = action.uid;
           
            yield put(loadedProfile(userInfo));

        }
        else{
            yield put(failedToLoadProfile());
        }
    }
    catch(err){
        console.log(err);
            yield put(failedToLoadProfile());
    }

}


function* loadHostedEventsSaga(payload){

    console.log("What about me?");
    const firestore = firebase.firestore();


    const clubInfoRef = firestore.collection("ClubInfo");
        
    const eventCardsRef = clubInfoRef.doc("Events").collection("EventCards");
    
    const hostQuery = eventCardsRef.where("host.uid","==", payload.uid);
    
    const eventsSnapshot = yield hostQuery.get();
    
    const events = [];

    eventsSnapshot.docs.forEach( docSnapshot => {

                //In this case since I'm only user it should show all events.
        if (docSnapshot.exists){


                const event = docSnapshot.data();


                event.startDate = event.startDate.toDate();

                event.endDate = event.endDate.toDate();

                console.log("event", event);

                events.push(event);

        }

    });

        
    yield put(loadedEvents(events));
}


function* loadNewsSaga(payload){


    console.log("Am I happening?");
     const firestore = firebase.firestore();

     //Pulling news posted by user.
     const clubInfoRef = firestore.collection("ClubInfo");
     const newsCardsRef = clubInfoRef.doc("News").collection("NewsCards");
     const postedNewsQuery = newsCardsRef.where("author.uid", "==", payload.uid);
     
     const newsCards = [];

     const newsCardsSnapshot = yield postedNewsQuery.get();

     newsCardsSnapshot.docs.forEach( docSnapshot => {


         if (docSnapshot.exists){

             const newsCard = docSnapshot.data();

             newsCard.postDate = newsCard.postDate.toDate();

             console.log("newsCard", newsCard);

             newsCards.push(newsCard);
         }

     });

     yield put(loadedNews(newsCards));


}


function* saga(){

    yield takeEvery(LOAD_EVENTS, loadHostedEventsSaga);
    yield takeEvery(LOAD_NEWS, loadNewsSaga);
    yield takeEvery(LOAD_PROFILE,loadProfileCall);

}

export default saga;