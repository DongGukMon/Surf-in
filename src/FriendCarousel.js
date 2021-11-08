import React, {useState,useEffect,useContext} from 'react';
import {FlatList, StyleSheet, Dimensions, Image,View,Text, ActivityIndicator,Button} from 'react-native';
import {getPreciseDistance} from 'geolib';
import * as firebase from 'firebase';
import firebaseInit from './firebaseInit';
import {UserInfoContext} from './UserInfoContext';
import {pushMyFriends} from "./notification";

firebaseInit();

export default function FriendCarousel({pages, pageWidth, gap, offset}) {

  const {userInfo} = useContext(UserInfoContext);
  const {uid} = userInfo

  const [page, setPage] = useState(0);
  const [myLocation,setMyLocation] = useState();

  function renderItem({item}) {
    return (
      <View style={{...styles.itemStyle,width:pageWidth,marginHorizontal: gap / 2,}}>
      
      <Image
        source={{uri:item.profile_picture}}
        style={{width:"20%",height:"20%"}}
      />
      
      <Text>
        name: {item.name}
      </Text>

      {myLocation ?
      <Text>Distance from: {getPreciseDistance({latitude:item.latitude,longitude:item.longitude},{latitude:myLocation.latitude,longitude:myLocation.longitude})}</Text>
      : <ActivityIndicator/>
      }

      <Button title="PUSH" color="blue" onPress={()=>{pushMyFriends(item)}}/>
      </View>
    )
  }

  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  useEffect(()=>{
    firebase.database().ref('location/'+uid).once('value',(snapshot)=>{
    setMyLocation(snapshot.val())
  })},[])

  return (
        <FlatList
          style={{flex:1, position:'absoulte'}}
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{
            paddingHorizontal: offset + gap / 2,
          }}
          data={pages}
          decelerationRate="fast"
          horizontal
          keyExtractor={(item) => `page__${item.num}`}
          onScroll={onScroll}
          pagingEnabled
          renderItem={renderItem}
          snapToInterval={pageWidth + gap}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
        />
  );
}


const styles = StyleSheet.create({
  itemStyle: {
    borderWidth:5,
    borderColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow:'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})