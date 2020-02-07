import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ellipse from '../assets/jsicons/Ellipse';
import { reportUser, getProfileData } from '../store/actions';

const Report = props => {
  const reportUser = desc => {
    props.reportUser(props.postId, props.postType, desc).then(error => {
      if (error) Alert.alert(error);
    });
  };

  const promptReport = () => {
    Alert.alert(
      'Report User',
      `Why are you reporting this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: "It's Inappropriate",
          onPress: () =>
            reportUser(
              //   props.currentUserProfile.id,
              //   'users',
              "It's Inappropriate"
            )
        },
        {
          text: "It's Spam",
          onPress: () => reportUser("It's Spam")
        }
      ],
      { cancelable: true }
    );
  };

  const showAlert = () => {
    Alert.alert(
      'Report',
      'Are you sure you want to report this user?',
      [
        {
          text: 'Report User',
          onPress: promptReport
        },
        { text: 'Deactivate User', style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity onPress={showAlert}>
      <Ellipse />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, {
  reportUser,
  getProfileData
})(Report);
