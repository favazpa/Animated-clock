import {Dimensions, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Square from './components/square';
import {N} from './constants';
const {width, hieght} = Dimensions.get('window');
export default function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 50000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <View style={styles.border}>
        {new Array(N).fill(0).map((_, index) => {
          console.log('dhaa', _);
          return <Square key={index} progress={progress} index={index} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBCEB1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    width: width - 30,
    height: width - 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width - 30,
    elevation: 3,
  },
});
