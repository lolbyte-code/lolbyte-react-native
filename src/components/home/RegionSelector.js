import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';

const RegionSelector = (props) => {
  const [region, setRegion] = React.useState(props.defaultCountry);
  return (
    <DropDownPicker
      items={props.items}
      defaultValue={region}
      containerStyle={styles.container}
      style={styles.style}
      itemStyle={styles.item}
      dropDownStyle={styles.dropdown}
      onChangeItem={(item) => {
        setRegion(item.value);
        props.onChangeItemHandler(item.value);
      }}
    />
  );
};

RegionSelector.defaultProps = {
  defaultCountry: 'na',
  items: [
    {
      label: 'NA',
      value: 'na',
    },
    {
      label: 'EUW',
      value: 'euw',
    },
    {
      label: 'EUN',
      value: 'eun',
    },
    {
      label: 'KR',
      value: 'kr',
    },
    {
      label: 'LAN',
      value: 'lan',
    },
    {
      label: 'LAS',
      value: 'las',
    },
    {
      label: 'BR',
      value: 'br',
    },
    {
      label: 'OCE',
      value: 'oce',
    },
    {
      label: 'TR',
      value: 'tr',
    },
    {
      label: 'RU',
      value: 'ru',
    },
    {
      label: 'JP',
      value: 'jp',
    },
  ],
};

RegionSelector.propTypes = {
  defaultCountry: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

const styles = StyleSheet.create({
  container: {
    height: 44,
  },
  style: {
    width: 73,
  },
  item: {
    justifyContent: 'flex-start',
  },
  dropdown: {
    width: 73,
  },
});

export default RegionSelector;
