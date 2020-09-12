import {Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';

const Alert = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.alertIconContainer}>
        <Text style={styles.alertIcon}>!</Text>
      </TouchableHighlight>
      <Modal
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{props.alertText}</Text>
            <View style={styles.closeButtonContainer}>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

Alert.defaultProps = {
  alertText: '',
};

Alert.propTypes = {
  alertText: PropTypes.string,
};

const styles = StyleSheet.create({
  alertIconContainer: {
    borderWidth: 2,
    borderColor: colors.lightGrey,
    borderRadius: 20,
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  alertIcon: {
    fontSize: 30,
    color: colors.blue,
    fontFamily: fonts.bold,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 230,
    padding: 15,
  },
  closeButtonContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 20,
    padding: 5,
    width: 70,
  },
  closeButtonText: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: 15,
  },
});

export default Alert;
