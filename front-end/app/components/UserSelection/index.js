import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import CustomListItem from '../CustomListItem';
import CustomItem from '../CustomItem';
import SearchBar from 'react-native-search-bar';
import styles from './styles'

const DATA = [
    {
      id: '1',
      title: 'Simone Bartoli',
      profession: 'UNIBO',
      exp:250
    },
    {
      id: '2',
      title: 'Giovanni Bonaccio',
      profession: 'UNIBO',
      exp:200
    },
    {
      id: '3',
      title: 'Emanuele Viglierchio',
      profession: 'LUISS',
      exp:150
      
    },
    {
        id: '4',
        title: 'Francesco Scotta',
        profession: 'LUISS',
        exp:100
        
      }
];


class UserSelection extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [],
            error: null
        }
        this.arrayholder = []

        //Code that have to be deleted once I'll connect with the DB
        this.state.data = DATA
        this.arrayholder = DATA
    }

    startChallenge(){
        this.props.navigation.navigate('waitingReval')
    }

    updateSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = item.title.toUpperCase() + item.profession.toUpperCase()
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        this.setState({data:newData})
        
        
    };

    randomReval = () =>{
        const i = Math.floor(Math.random()*this.state.data.length)
        console.log(i)
    }

    renderHeader = () =>{
        return (
                <SearchBar
                    placeholder="Search"
                    onChangeText={ text => this.updateSearch(text)}
                />            
        )
    }

    render() {

        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageDashboard.jpg')}
                style = {styles.parent}
            >
                <View style={styles.headerLine}>
                    <View style={{flex:1}}>
                        <Text style={styles.title}>VS</Text>
                    </View>
                    <View style={{flex:1,marginLeft:5,marginRight:5}}>
                        <Text style={styles.subtitle}>Select the user to challange</Text>
                    </View>
                    <View style={{flex:1,marginLeft:5,marginRight:5}}>
                        <TouchableOpacity style ={styles.button} onPress={_ => this.randomReval()} >
                            <CustomListItem
                                iconName="retweet"
                                iconColor="#006622"
                                title="RANDOM CHOICE"
                                titleColor="#006622"
                            />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) =>   <TouchableOpacity
                                                            style={{flex:1}}
                                                            onPress={_ => this.startChallenge()}    
                                                        >
                                                            <CustomItem title={item.title} subtitle={item.profession} id={item.id} info={item.exp} />
                                                        </TouchableOpacity>
                                        }
                            keyExtractor={item => item.id}
                            ListHeaderComponent= {this.renderHeader}
                        />
                    </SafeAreaView>
                </View>
            </ImageBackground>
        );
    }
}

export default UserSelection