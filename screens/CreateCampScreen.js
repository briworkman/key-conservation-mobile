import React from 'react';
import {
  TextInput,
  Text,
  View,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { postCampaign, getCampaigns } from '../store/actions';
import BackButton from '../components/BackButton';
import { AmpEvent } from '../components/withAmplitude';
import UploadMedia from '../components/UploadMedia';

import styles from '../constants/screens/CreateCampScreen';
import CheckMark from '../assets/icons/checkmark-24.png';

import Lightening from '../assets/jsicons/bottomnavigation/Lightening';

class CreateCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'CREATE A CAMPAIGN',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <BackButton
          navigation={navigation}
          content='Cancel'
          confirm='Are you sure you want to cancel? Any progress will be lost'
        />
      ),
      gestureEnabled: false
    };
  };

  constructor(props) {
    super(props);

    this.URGENCY_LEVELS = [
      {
        title: 'Critical',
        description:
          'Dire consequences may occur of no immediate support is made available',
        color: '#E31059'
      },
      {
        title: 'Urgent',
        description:
          'Immediate support needed, although situation is not critical',
        color: '#FFC700'
      },
      {
        title: 'Longterm',
        description: 'Support is needed over a longer period of time',
        color: '#00FF9D'
      }
    ];
  }

  state = {
    image: '',
    users_id: this.props.currentUserProfile.id,
    camp_name: '',
    camp_desc: '',
    camp_cta: '',
    urgency: null,
    loading: false
  };

  setUrgency = urgencyLevel => {
    if (this.state.urgency === urgencyLevel) {
      this.setState({
        urgency: null
      });
    } else {
      this.setState({
        urgency: urgencyLevel
      });
    }
  };

  publish = async () => {
    this.setState({
      ...this.state,
      loading: true
    });
    if (
      !this.state.image ||
      !this.state.camp_name ||
      !this.state.camp_desc ||
      !this.state.camp_cta
    ) {
      const errorMessage =
        'Form incomplete. Please include:' +
        (this.state.image ? '' : '\n    - Campaign Image') +
        (this.state.camp_name ? '' : '\n    - Campaign Name') +
        (this.state.camp_desc ? '' : '\n    - Campaign Details') +
        (this.state.camp_cta ? '' : '\n    - Donation Link');
      this.setState({
        loading: false
      });
      return Alert.alert('Error', errorMessage);
    } else {
      const camp = {
        users_id: this.props.currentUserProfile.id,
        camp_name: this.state.camp_name,
        camp_desc: this.state.camp_desc,
        camp_cta: this.state.camp_cta,
        urgency: this.state.urgency,
        camp_img: this.state.image
      };
      this.props
        .postCampaign(camp)
        .then(async res => {
          AmpEvent('Campaign Created');
          await this.setState({
            loading: false
          });
          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          this.setState({
            loading: false
          });
          console.log(err);
        });
    }
  };

  clearState = () => {
    this.setState({
      loading: false,
      users_id: this.props.currentUserProfile.id,
      camp_img: '',
      camp_name: '',
      camp_desc: '',
      camp_cta: '',
      urgency: null
    });
  };

  render() {
    if (this.state.loading === true) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color='#00FF9D' />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <Lightening fill='#00FF9D' />
            </View>
            <TextInput
              ref={input => {
                this.campNameInput = input;
              }}
              returnKeyType='next'
              placeholder='Name Campaign'
              style={styles.inputContain}
              onChangeText={text => this.setState({ camp_name: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.campImgUrlInput.focus();
              }}
              blurOnSubmit={Platform.OS === 'android'}
              value={this.state.camp_name}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <UploadMedia
                title='Upload campaign image'
                media={this.state.image}
                onChangeMedia={media => this.setState({ image: media })}
              />
            </View>
            <TextInput
              ref={input => {
                this.campDetailsInput = input;
              }}
              returnKeyType='next'
              placeholder='Add campaign details and list of monetary needs.'
              style={styles.inputContain2}
              onChangeText={text => this.setState({ camp_desc: text })}
              multiline={true}
              value={this.state.camp_desc}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionsText}>Donation Link</Text>
          <TextInput
            ref={input => {
              this.donationLinkInput = input;
            }}
            returnKeyType='next'
            placeholder='https://www.carribbeanseaturtle.com/donate'
            keyboardType='default'
            placeholder='Please include full URL'
            autoCapitalize='none'
            style={styles.inputContain}
            onChangeText={text => this.setState({ camp_cta: text })}
            value={this.state.camp_cta}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionsText}>Urgency Level</Text>
          <Text style={styles.bodyText}>
            Select one. This can be changed at a future date.
          </Text>
          <View style={styles.urgencyMenu}>
            {this.URGENCY_LEVELS.map((urgency, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.setUrgency(urgency.title)}
              >
                <View style={styles.urgencyOption}>
                  <View style={styles.urgencyText}>
                    <Text
                      style={{
                        ...styles.urgencyLevelTitle,
                        color: urgency.color
                      }}
                    >
                      {urgency.title}
                    </Text>
                    <Text style={styles.urgencyDescription}>
                      {urgency.description}
                    </Text>
                  </View>
                  <View style={styles.urgencyCheckmarkContainer}>
                    {this.state.urgency === urgency.title ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={this.publish}>
            <View style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publish Live</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  allCampaigns: state.allCampaigns,
  token: state.token
});

export default connect(mapStateToProps, {
  postCampaign,
  getCampaigns
})(CreateCampScreen);
