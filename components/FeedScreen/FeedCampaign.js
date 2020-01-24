import React, { useState } from "react";
import {
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import { View } from "react-native-animatable";
import moment from "moment";
import { Video } from "expo-av";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Viewport } from "@skele/components";

import shorten from '../../util/shorten';

import {
  getProfileData,
  getCampaign,
  toggleCampaignText
} from "../../store/actions";
import { AmpEvent } from "../withAmplitude";

import styles from "../../constants/FeedScreen/FeedCampaign";
import styles2 from "../../constants/Comments/Comments";

const Placeholder = () => <View style={styles.campImgContain} />;

// Redux gave us a hard time on this project. We worked on comments first and when our commentOnCampaign action failed to trigger the re-render we expected, and when we couldn't solve the
// issue in labs_help, we settled for in-component axios calls. Not elegant. Probably not super scalable—but it worked. Hopefully a more talented team can solve what we couldn't.
// In the meantime, ViewCampScreen, ViewCampUpdateScreen, FeedCampaign, and FeedUpdate are all interconnected, sharing props (state, functions) via React-Navigation.

const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

const FeedCampaign = props => {
  const [urgTop, setUrgTop] = useState(0);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const { data, toggled } = props;

  const createdAt = data.created_at;
  const postTime = moment(createdAt).fromNow();

  //// All styles for the urgency bar
  let urgencyColor;
  if (data.urgency === "Critical") {
    urgencyColor = "rgba(227,16,89,0.7)";
  } else if (data.urgency === "Urgent") {
    urgencyColor = "rgba(255,199,0,0.7)";
  } else if (data.urgency === "Longterm") {
    urgencyColor = "rgba(0,255,157,0.7)";
  } else {
    urgencyColor = "#323338BF";
  }
  
  let urgencyStatus;
  if (data.urgency) {
    urgencyStatus = data.urgency.toUpperCase();
  } else {
    urgencyStatus = "Standard";
  }

  const urgencyStyles = {
    backgroundColor: urgencyColor,
    height: 37,
    width: "100%",
    position: "absolute",
    top: urgTop,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  };

  const goToProfile = async () => {
    await dispatch(getProfileData(data.users_id));
    AmpEvent("Select Profile from Campaign", {
      profile: data.username,
      campaign: data.camp_name
    });
    props.navigation.navigate("Pro");
  };

  const goToCampaign = async () => {
    await dispatch(getCampaign(data.camp_id));
    AmpEvent("Select Profile from Campaign", {
      campaign: data.camp_name,
      profile: data.username
    });
    props.navigation.navigate("Camp", {
      media: data.camp_img
    });
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.camp_id));
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
      <ListItem
        onPress={goToProfile}
        title={
          <View>
            <Text style={styles.orgTitleView}>{data.username}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: data.profile_image } }}
        subtitle={data.location}
      />
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
          {data.camp_img.includes(".mov") ||
          data.camp_img.includes(".mp3") ||
          data.camp_img.includes(".mp4") ? (
            <View>
              {data.urgency ? (
                <View style={urgencyStyles}>
                  <Text style={styles.urgencyBarText}>{urgencyStatus}</Text>
                </View>
              ) : null}
              {loader ? (
                <View style={styles.indicator}>
                  <ActivityIndicator size="large" color="#00FF9D" />
                </View>
              ) : null}
              {props.isFocused ? (
                <ViewportAwareVideo
                  source={{
                    uri: data.camp_img
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
              source={{ uri: data.camp_img }}
              style={styles.campImgContain}
            >
              {data.urgency ? (
                <View style={urgencyStyles}>
                  <Text style={styles.urgencyBarText}>{urgencyStatus}</Text>
                </View>
              ) : null}
            </ImageBackground>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.campDesc}>
        <Text style={styles.campDescName}>{data.camp_name}</Text>
        {toggled || data.camp_desc.length < 80 ? (
          <Text style={styles.campDescText}>{data.camp_desc}</Text>
        ) : (
          <Text style={styles.campDescText}>
            {shorten(data.camp_desc, 80)}
            &nbsp;
            <Text onPress={toggleText} style={styles.readMore}>
              Read More
            </Text>
          </Text>
        )}
      </View>
      <View style={{ marginLeft: 17 }}>
        <FlatList
          data={data.comments.slice(0, 1)}
          keyExtractor={comment => comment.comment_id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles2.commentWrapper}>
                <View style={styles2.commentView}>
                  <View style={styles2.feedAvatar}>
                    <Avatar
                      rounded
                      source={{
                        uri: item.profile_image
                      }}
                    />
                  </View>
                  <View style={styles2.feedCommentWrapper}>
                    <Text style={styles2.username}>{item.username}</Text>
                    <Text style={styles2.commentBody}>{item.comment_body}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View>
        {data.comments.length >= 1 ? (
          data.comments.length === 1 ? (
            <Text style={styles.comments} onPress={goToCampaign}>
              View {data.comments.length} comment
            </Text>
          ) : (
            <Text style={styles.comments} onPress={goToCampaign}>
              View all {data.comments.length} comments
            </Text>
          )
        ) : null}
      </View>
      <Text style={styles.timeText}>{postTime}</Text>
      <View style={styles.demarcation}></View>
    </View>
  );
};
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  currentUser: state.currentUser,
  token: state.token
});
export default connect(mapStateToProps, {
  getProfileData,
  getCampaign,
  toggleCampaignText
})(withNavigationFocus(FeedCampaign));
// withNavigationFocus unmounts video and prevents audio playing across the navigation stack
