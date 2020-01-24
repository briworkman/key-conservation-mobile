import React, { useState } from "react";
import {
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import { View } from "react-native-animatable";
import moment from "moment";
import { Video } from "expo-av";
import { ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Viewport } from "@skele/components";

import {
  getProfileData,
  setCampaign,
  toggleCampaignText
} from "../../store/actions";
import { AmpEvent } from "../withAmplitude";

import shorten from '../../util/shorten';

import styles from "../../constants/FeedScreen/FeedUpdate";

const Placeholder = () => <View style={styles.campImgContain} />;

// Redux gave us a hard time on this project. We worked on comments first and when our commentOnCampaign action failed to trigger the re-render we expected, and when we couldn't solve the
// issue in labs_help, we settled for in-component axios calls. Not elegant. Probably not super scalable—but it worked. Hopefully a more talented team can solve what we couldn't.
// In the meantime, ViewCampScreen, ViewCampUpdateScreen, FeedCampaign, and FeedUpdate are all interconnected, sharing props (state, functions) via React-Navigation.

const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

const FeedUpdate = props => {
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const { data, toggled } = props;

  const createdAt = data.created_at;
  const postTime = moment(createdAt).fromNow();

  const goToProfile = async () => {
    await dispatch(getProfileData(data.users_id));
    AmpEvent("Select Profile from Campaign", {
      profile: data.username,
      campaign: data.camp_name
    });
    props.navigation.navigate("Pro");
  };

  const goToCampUpdate = () => {
    dispatch(setCampaign(data));
    props.navigation.navigate("CampUpdate", {
      backBehavior: "Home",
      media: data.update_img
    });
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(`update${data.update_id}`));
  };

  const onPlaybackStatusUpdate = status => {
    if (status.isBuffering && !status.isPlaying) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      {props.hideUsername === undefined && (
        <ListItem
          onPress={goToProfile}
          title={
            <View>
              <Text style={styles.orgTitleView}>{data.username}</Text>
            </View>
          }
          leftAvatar={{ source: { uri: data.profile_image } }}
          subtitle={
            <View>
              <Text style={styles.subtitleText}>{data.location}</Text>
            </View>
          }
        />
      )}
      <View>
        {props.fromCampScreen ? (
          <View>
            {data.update_img.includes(".mov") ||
            data.update_img.includes(".mp3") ||
            data.update_img.includes(".mp4") ? (
              <View>
                {loader ? (
                  <View style={styles.indicator}>
                    <ActivityIndicator size="large" color="#00FF9D" />
                  </View>
                ) : null}
                <View style={styles.updateBar}>
                  <Text style={styles.updateBarText}>UPDATE</Text>
                </View>
                {props.isFocused ? (
                  <ViewportAwareVideo
                    source={{
                      uri: data.update_img
                    }}
                    retainOnceInViewport={false}
                    preTriggerRatio={-0.1}
                    rate={1.0}
                    isMuted={false}
                    shouldPlay={true}
                    isLooping
                    resizeMode="cover"
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    style={styles.campImgContain}
                  />
                ) : (
                  <View style={styles.campImgContain} />
                )}
              </View>
            ) : (
              <ImageBackground
                source={{ uri: data.update_img }}
                style={styles.campImgContain}
              >
                <View style={styles.updateBar}>
                  <Text style={styles.updateBarText}>UPDATE</Text>
                </View>
              </ImageBackground>
            )}
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.5} onPress={goToCampUpdate}>
            {data.update_img.includes(".mov") ||
            data.update_img.includes(".mp3") ||
            data.update_img.includes(".mp4") ? (
              <View>
                {loader ? (
                  <View style={styles.indicator}>
                    <ActivityIndicator size="large" color="#00FF9D" />
                  </View>
                ) : null}
                <View style={styles.updateBar}>
                  <Text style={styles.updateBarText}>UPDATE</Text>
                </View>
                {props.isFocused ? (
                  <ViewportAwareVideo
                    source={{
                      uri: data.update_img
                    }}
                    retainOnceInViewport={false}
                    preTriggerRatio={-0.1}
                    rate={1.0}
                    isMuted={false}
                    shouldPlay={true}
                    isLooping
                    resizeMode="cover"
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    style={styles.campImgContain}
                  />
                ) : (
                  <View style={styles.campImgContain} />
                )}
              </View>
            ) : (
              <ImageBackground
                source={{ uri: data.update_img }}
                style={styles.campImgContain}
              >
                <View style={styles.updateBar}>
                  <Text style={styles.updateBarText}>UPDATE</Text>
                </View>
              </ImageBackground>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.campDesc}>
        <Text style={styles.campDescName}>{data.camp_name}</Text>
        {toggled || data.update_desc.length < 80 ? (
          <Text style={styles.campDescText}>{data.update_desc}</Text>
        ) : (
          <Text style={styles.campDescText}>
            {shorten(data.update_desc, 80)}
            &nbsp;
            <Text onPress={toggleText} style={styles.readMore}>
              Read More
            </Text>
          </Text>
        )}
      </View>
      <Text style={styles.timeText}>{postTime}</Text>
      <View style={styles.demarcation}></View>
    </View>
  );
};

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  token: state.token
});

export default connect(mapStateToProps, {
  getProfileData,
  setCampaign,
  toggleCampaignText
})(withNavigationFocus(FeedUpdate));
// withNavigationFocus unmounts video and prevents audio playing across the navigation stack
