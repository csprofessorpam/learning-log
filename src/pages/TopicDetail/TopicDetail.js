import React from 'react'
import "./TopicDetail.css"
import {useParams} from 'react-router-dom'
import {db, auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {collection, addDoc, Timestamp, query, where,
    onSnapshot, getDocs,doc,  getDoc} from 'firebase/firestore'

function TopicDetail() {

    //this page gets topicId from url
    //get articleId from url
    const {topicId} = useParams();

    //get user data
  const [user] = useAuthState(auth);

  //state for user input
  const [newEntry, setNewEntry] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [topicEntries, setTopicEntries] = React.useState([])
    //user must be logged in

    React.useEffect(
        ()=>{

            console.log(topicId)
            //need to look up topic title from id

            const docRef = doc(db, 'topics', topicId)
            //console.log(docRef)

            getDoc(docRef)
            .then(res =>{
                console.log(res.data().title)
                setTitle(res.data().title)
            })
            .catch(err => console.log(err))

            //now get entries for this topic
            const entriesRef = collection(db, "entries")

            //filter to show only comments for this user
            const q = query(entriesRef, where("topicId", "==", topicId))

            onSnapshot(q,(snapshot)=>{
                console.log(snapshot)
                //convert to array
                const entries = snapshot.docs.map( item =>(
                    { id:item.id,
                        ...item.data()
                    } )
                ) 
                console.log(entries)
                setTopicEntries(entries)
            })
            
        }, []
    )

    //use this id to retrieve entries when page loads
    //display on page
    //allow to make new entries

    const addEntry = () =>{
        console.log("add entry")
        
    //create article reference
    const entriesRef=collection(db, 'entries')
    //use addDoc to add
    addDoc(entriesRef, {
        topicId: topicId,
        userEntry: newEntry,
        createdBy: user.displayName,
        userId: user.uid,
        createdAt: Timestamp.now().toDate()
    })
    //clear textarea
    setNewEntry("")
    }

  return (
    <div className="topic-detail-container">
        

        {
            user?
            <div>
                <div className="input-group">
                <label htmlFor="entry">New Entry</label>
                <textarea onChange={e=>setNewEntry(e.target.value)}  value={newEntry} id="entry"
                placeholder="make entry for this topic" />
                </div>

                <button onClick={addEntry} className="add-btn">Add entry</button>
                <div className="entry-container">
                    <h2>Entries for {title}</h2>
                    
                    {
                        topicEntries.map(item => 
                        <p key={item.id} className="entry-detail">{item.userEntry}</p>)
                    }
                </div>
            </div>
            :
            <p>Please register or login to get started</p>
        }
    </div>
  )
}

export default TopicDetail