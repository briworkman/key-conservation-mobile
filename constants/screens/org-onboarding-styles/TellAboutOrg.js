import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 0,
    padding: '2.5%',
    top: '2.5%',
    flexDirection: 'row'
  },
  keyboardView: {
    marginVertical: '3%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowView: {
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  progressBar: {
    width: '75%',
    alignSelf: 'center',
    padding: '7%',
    top: '5%',
    right: '20%'
  },
  progressBarText: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(1.8),
    paddingTop: 4
  },
  tellUsImage: {
    alignSelf: 'center'
  },
  obBody: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%'
  },
  obText: {
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.1),
    lineHeight: 25,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '5%'
  },
  obSubtitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.5),
    lineHeight: 29,
    margin: '5%'
  },
  aroundInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginBottom: '2%',
    marginTop: '2%',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  placeholderText: {
    zIndex: 3,
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.1),
    color: '#000',
    paddingLeft: '3%',
    top: '2.9%'
  },
  aroundIcon: {
    position: 'absolute',
    left: '89%',
    top: '50%',
    paddingLeft: '2%'
  },
  obTextInput: {
    alignContent: 'center',
    backgroundColor: '#F5F5F5',
    height: 42,
    width: Dimensions.get('screen').width * 0.6,
    marginRight: Dimensions.get('screen').width * 0.1,
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.1),
    color: '#000',
    top: '2.9%'
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '6%'
  },
  buttons: {
    alignItems: 'flex-end',
    padding: 0
  }
});
