import React, {useState,useEffect,useContext} from 'react';
import {FlatList, StyleSheet, Dimensions, Image,View,Text, ActivityIndicator} from 'react-native';
import {getPreciseDistance} from 'geolib';
import * as firebase from 'firebase';
import firebaseInit from './firebaseInit';
import {UserInfoContext} from './UserInfoContext';

firebaseInit();

export default function FriendCarousel({pages, pageWidth, gap, offset}) {

  const {userInfo} = useContext(UserInfoContext);
  const {uid} = userInfo

  const [page, setPage] = useState(0);
  const [myLocation,setMyLocation] = useState();

  function renderItem({item}) {
    return (
      <View style={{
        width: pageWidth,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow:'hidden',
        marginHorizontal: gap / 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        }}>
      
      <Image
        source={{uri:item.profile_picture}}
        style={{width:"10%",height:"10%"}}
      />
      {myLocation ?
      <Text>Distance from: {getPreciseDistance({latitude:item.latitude,longitude:item.longitude},{latitude:myLocation.latitude,longitude:myLocation.longitude})}</Text>
      : <ActivityIndicator/>
      }
      </View>
    );
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
  }),[]})

  return (
        <FlatList
          style={{flex:1}}
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
  container: {
    flex:1,
    justifyContent:'center',
    // alignItems:'center'
  },
  Indicator:{
    width:6,
    height:6,
    backgroundColor:'green',
    borderRadius:3
  },
  IndicatorWrapper: {
    flexDirection:'row',
    alignItems:'center',
    marginTop:16,
    backgroundColor:'red'
  }
})