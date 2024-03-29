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
        source={{uri:item.url}}
        style={{width:"100%",height:"100%"}}
      />

      </View>
    );
  }

  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };


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