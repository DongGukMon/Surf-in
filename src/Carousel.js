import React, {useState,useEffect} from 'react';
import {FlatList, StyleSheet, Dimensions, Image,View,Text} from 'react-native';
// import styled from 'styled-components/native';

// import Page from './Page';



export default function Carousel({pages, pageWidth, gap, offset}) {

  
  const {width: screenWidth} = Dimensions.get('window');
  const {height: screenHeight} = Dimensions.get('window');

  const [page, setPage] = useState(0);

  function renderItem({item}) {
    return (
      <View style={{
        width: pageWidth,
        backgroundColor: item.color,   
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: gap / 2}}/>
    );
  }

  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };


  return (
    <View style={{...styles.container, backgroundColor:'white'}}>
      
      <View style={{flex:1, backgroundColor:'blue'}}></View>

      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <FlatList
          style={{flex:1, backgroundColor:'green'}}
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
      </View>

      <View style={{flex:1, backgroundColor:'yellow'}}></View>
    </View>
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