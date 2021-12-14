import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { StackActions } from '@react-navigation/native';
import { images } from '../../assets/images';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const UpdateValueModal = props => {
  const [text, onChangeText] = React.useState('Text');

  return (
    <Modal transparent visible={props.visible}>
      <View
        style={styles.container}>
        <View style={styles.contentContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              marginHorizontal: 10,
              marginVertical: 8,
              fontSize: 20,
            }}>
            {props.Name}
          </Text>
          {!props.ProfilePictureModal && (
            <TextInput
              style={styles.input}
              onChangeText={props.onChangeText}
              value={props.value}
              keyboardType={props.keyboardType}
            />
          )}
          {!props.ProfilePictureModal && (
            <TouchableOpacity
              style={styles.button}
              onPress={props.onPressSubmit}>
              <Text style={styles.buttontext}>Submit</Text>
            </TouchableOpacity>
          )}
          {props.ProfilePictureModal && (
            <TouchableOpacity
              style={styles.button}
              onPress={props.onPressCamera}>
              <Text style={styles.buttontext}>Take a selfie!</Text>
            </TouchableOpacity>
          )}
          {props.ProfilePictureModal && (
            <TouchableOpacity
              style={styles.button}
              onPress={props.onPressLibrary}>
              <Text style={styles.buttontext}>Pick from Library!</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={props.onPressModalClose} style={styles.closeButton}>
            <Entypo name={"cross"} color={"black"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateValueModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 250,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    zIndex: 999
    // flexDirection: 'row',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 40,
    padding: 5,
  },
  button: {
    marginTop: 40,
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FE921A',
  },
  buttontext: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white',
    //   justifyContent:'center'
  },
  closeButton: {
    position: "absolute",
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderRadius: 15,
    left: -8,
    top: -8,
    justifyContent: "center",
    alignItems: "center"
  }
});
