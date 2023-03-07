import React from 'react'
import {db, auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {collection, addDoc, Timestamp, query, where,
onSnapshot, getDocs} from 'firebase/firestore'

import { Link } from 'react-router-dom';
import "./Homepage.css"

function Homepage() {
    //get user data
  const [user] = useAuthState(auth);

  const [topic, setTopic] = React.useState('')

  const [userTopics, setUserTopics] = React.useState([])
  //want to show / update topics for this user when page loads
  React.useEffect(
    ()=>{
        //console.log(user.uid)
        if (user){
            console.log('get data')
            //get reference to comments collection
            const topicsRef = collection(db, "topics")

            //filter to show only comments for this user
            const q = query(topicsRef, where("userId", "==", user.uid))

            onSnapshot(q,(snapshot)=>{
                console.log(snapshot)
                //convert to array
                const topics = snapshot.docs.map( item =>(
                    { id:item.id,
                        ...item.data()
                    } )
                ) 
                console.log(topics)
                setUserTopics(topics)
            })

        }
    }, [user]
  )

  const addTopic = () =>{
    console.log("add topic")
    //create article reference
    const topicsRef=collection(db, 'topics')
    //use addDoc to add
    addDoc(topicsRef, {
        title: topic,
        createdBy: user.displayName,
        userId: user.uid,
        createdAt: Timestamp.now().toDate()
    })
  }
  return (
    <div className="homepage-container">
        <h1>Welcome to Learning Log!</h1>
        <p>Learning Log helps you keep track of your learning, for any topic you are learning.</p>
        {
            user?
            <div>
                <input type="text" 
                onChange={(e)=>setTopic(e.target.value)} placeholder="enter new topic" />
                <button onClick={addTopic}>Add topic</button>
                <div className="topics-container">
                    {
                    userTopics.map(item=><Link 
                        key={item.id} to={`/topic/${item.id}`}>{item.title}</Link>)
                    }
                </div>
            </div>
            :
            <p>Please register or login to get started!</p>
        }
    </div>
  )
}

export default Homepage