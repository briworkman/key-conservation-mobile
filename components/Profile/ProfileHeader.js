import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import { AmpEvent } from '../withAmplitude';
import { FontAwesome } from '@expo/vector-icons';

import styles from '../../constants/Profile/ProfileHeader';
import MapMarker from '../../assets/js icons/headerIcons/map-marker';
import { randomImage } from '../../components/Animals/RandomImage';

const ProfileHeader = props => {
  let profile = props.profile;

  const WebsiteClick = async () => {
    if (profile.org_link_url && profile.org_link_url !== null) {
      (await WebBrowser.openBrowserAsync(profile.org_link_url)) &&
        AmpEvent('Website Link Clicked', { orgName: profile.org_name });
    }
  };

  const randomHeaderImage = randomImage();

  return (
    <ImageBackground
      source={randomHeaderImage}
      resizeMode='cover'
      style={{
        // zIndex: 2,
        paddingTop: 100,
        //flex: 2,
        backgroundColor: '#000000'
      }}
      imageStyle={{ opacity: 0.7 }}
    >
      <ScrollView style={styles.pic}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Avatar
              size={61}
              rounded
              source={{
                uri: profile.profile_image
              }}
            />
          </View>
          <View style={styles.textContainer}>
            {profile.org_name === null || profile.org_name === '' ? (
              <Text style={styles.org}>{profile.username}</Text>
            ) : (
              <Text style={styles.org}>{profile.org_name}</Text>
            )}
            {profile.location === null || profile.location === '' ? null : (
              <Text style={styles.locationText}>
                <MapMarker /> {profile.location}
              </Text>
            )}
            {profile.org_link_url || profile.org_link_url !== '' ? (
              profile.org_link_text || profile.org_link_text !== '' ? (
                <Text style={styles.websiteText} onPress={WebsiteClick}>
                  {profile.org_link_text}
                </Text>
              ) : (
                <Text style={styles.websiteText} onPress={WebsiteClick}>
                  {profile.org_link_url}
                </Text>
              )
            ) : null}
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{profile.mini_bio}</Text>
          </View>
        </View>

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
          {!props.myProfile ? (
            <TouchableOpacity
              style={[styles.TouchableOpacity]}
              onPress={() => props.navigation.navigate('Location')}
            >
              <View style={styles.ButtonStyle}>
                <Text style={styles.DetailButton}>Location</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              props.navigation.navigate(
                props.myProfile ? 'MyDetail' : 'Detail'
              );
            }}
          >
            <View style={styles.ButtonStyle}>
              <Text style={styles.DetailButton}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileHeader;
