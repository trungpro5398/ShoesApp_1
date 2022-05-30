import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
const Spinnerscreen = () => {
  const isLoading = useSelector(state => state.spinner.isLoading);
  return isLoading ? (
    <View style={styles.container}>
      <Progress.CircleSnail color={['blue', 'green', 'black']} size={80} />
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -30}, {translateY: -50}],
  },
});

export default Spinnerscreen;
