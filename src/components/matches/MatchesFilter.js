import {Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import RadioButton from 'radio-buttons-react-native';
import React from 'react';
import TripleDot from '@app/components/common/TripleDot';

const ALL_MATCHES = 0;
const RANKED = 420;
const CLASH = 700;

const getIndex = (gameType) => {
  switch (gameType) {
    case ALL_MATCHES:
      return 1;
    case RANKED:
      return 2;
    case CLASH:
      return 3;
  }
};

const MatchesFilter = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentGameType, setCurrentGameType] = React.useState(
    props.selectedGameType,
  );

  return (
    <View>
      <View style={styles.tripleDotContainer}>
        <TripleDot
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RadioButton
              data={props.options}
              selectedBtn={(option) => setCurrentGameType(option.value)}
              box={true}
              initial={getIndex(props.selectedGameType)}
              textStyle={styles.radioButtonText}
              activeColor={colors.blue}
            />
            <View style={styles.closeButtonContainer}>
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => {
                  props.setSelectedGameTypeHandler(currentGameType);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.closeButtonText}>Filter</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

MatchesFilter.defaultProps = {
  options: [
    {
      label: 'All Matches',
      value: ALL_MATCHES,
    },
    {
      label: 'Ranked',
      value: RANKED,
    },
    {
      label: 'Clash',
      value: CLASH,
    },
  ],
  setSelectedGameTypeHandler: () => {},
};

MatchesFilter.propTypes = {
  options: PropTypes.array,
  setSelectedGameTypeHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  tripleDotContainer: {
    alignItems: 'flex-end',
    marginRight: 5,
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
  radioButtonText: {
    color: colors.darkGrey,
    fontFamily: fonts.regular,
    marginLeft: 5,
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

export default MatchesFilter;
