import React, { useEffect, useState } from 'react'
import { auth, database } from '../Data/Firebase';
import { User, Tab, TabGroup } from '../Data/Data';
import { Button, Card, Collapse, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const [tabGroups, setTabGroups] = useState<TabGroup[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.currentUser){
            navigate('/');
        } 


        const unsubscribe = database.collection('users').doc(auth.currentUser!.uid).onSnapshot((doc) => {
            const user = doc.data() as User;
            setTabGroups(user.tabGroups);
        });
        return unsubscribe;
    }, []);

    //Create Function to add new tab group to database
    const addTabGroup = async () => {
        const newTabGroup: TabGroup = {
            id: Math.floor(Math.random() * 10000000).toString(),
            name: "New Tab Group",
            tabs: []
        }
        console.log("New Tab Group: ", newTabGroup);
        const userRef = database.collection('users').doc(auth.currentUser!.uid);
        const doc = await userRef.get();
        const user = doc.data() as User;
        user.tabGroups.push(newTabGroup);
        userRef.set(user);
    };
    // //Create Function to delete tab group from database
    // const deleteTabGroup = async (tabGroup: TabGroup) => {
    //     const userRef = database.collection('users').doc(auth.currentUser!.uid);
    //     const doc = await userRef.get();
    //     const user = doc.data() as User;
    //     const index = user.tabGroups.findIndex((tg) => tg.id === tabGroup.id);
    //     user.tabGroups.splice(index, 1);
    //     userRef.set(user);
    // };

    // //Create Function to add new tab to database
    // const addTab = async (tabGroup: TabGroup) => {
    //     const newTab: Tab = {
    //         id: Math.floor(Math.random() * 10000000).toString(),
    //         name: "New Tab",
    //         link: "https://www.google.com"
    //     }
    //     console.log("New Tab: ", newTab);
    //     const userRef = database.collection('users').doc(auth.currentUser!.uid);
    //     const doc = await userRef.get();
    //     const user = doc.data() as User;
    //     const index = user.tabGroups.findIndex((tg) => tg.id === tabGroup.id);
    //     user.tabGroups[index].tabs.push(newTab);
    //     userRef.set(user);
    // };
    //Create Function to delete tab from database
    const deleteTab = async (tabGroup: TabGroup, tab: Tab) => {
        const userRef = database.collection('users').doc(auth.currentUser!.uid);
        const doc = await userRef.get();
        const user = doc.data() as User;
        const tgIndex = user.tabGroups.findIndex((tg) => tg.id === tabGroup.id);
        const tIndex = user.tabGroups[tgIndex].tabs.findIndex((t) => t.id === tab.id);
        user.tabGroups[tgIndex].tabs.splice(tIndex, 1);
        userRef.set(user);
    };

  return auth.currentUser? (

    //Add buttons to add and delete tab groups and tabs
    <div className='d-flex justify-content-start'>
    <ListGroup>
    {tabGroups.map(tabGroup => (
      <ListGroup.Item key={tabGroup.id}>
        <h4>{tabGroup.name}</h4>
        <ListGroup>
          {tabGroup.tabs.map(tab => (
            <ListGroup.Item key={tab.id}>
              <a href={tab.link}>{tab.name}</a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ListGroup.Item>
    ))}
  </ListGroup>
    </div>
   
) : <h3>You arent logged in</h3>;
  
  
}
