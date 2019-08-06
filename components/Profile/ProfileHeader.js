import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Platform
} from 'react-native';

import { Avatar, Icon } from 'react-native-elements';

const ProfileHeader = props => {
  let profile = props.profile;

  return (
    <ScrollView style={styles.pic}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.TouchableOpacity,
            null ? {} : { borderBottomColor: '#00FF9D', borderBottomWidth: 2 }
          ]}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.CampaignButton}>Campaigns</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() =>
            {
              props.navigation.navigate(props.myProfile ? 'MyDetail' : 'Detail')
            }
          }
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.DetailButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Avatar
          size='large'
          rounded
          source={{
            uri: profile.profile_image
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.org}>{profile.org_name}</Text>
          <Text style={styles.location}>{profile.location}</Text>
          <Text style={styles.social}>{profile.org_link_text}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={{ textAlign: 'left', width: 300 }}>
            {profile.mini_bio}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e1e8ed',
    paddingTop: 50,
    flexWrap: 'wrap'
  },
  bioContainer: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 90,
    marginRight: 60,
    textAlign: 'center',
    alignItems: 'center'
  },
  bio: {
    marginBottom: 50
  },
  org: {
    fontSize: 22
  },
  pic: {
    flex: 1
  },
  textContainer: {},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'whitesmoke',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2
  },
  TouchableOpacity: {
    flex: 1
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },

  CampaignButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  DetailButton: {
    fontSize: 18,
    color: '#C4C4C4',
    fontWeight: 'bold'
  }
});

export default ProfileHeader;
