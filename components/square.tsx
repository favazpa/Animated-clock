import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {N, SQUARE_SIZE} from '../constants';
import {Text} from 'react-native';

interface SquareProps {
  index: number;
  progress: Animated.SharedValue<number>;
}

const Square: React.FC<SquareProps> = ({index, progress}) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }

    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }

    return withTiming(-index * SQUARE_SIZE);
  });

  const border = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: SQUARE_SIZE,
          aspectRatio: 1,
          backgroundColor: '#FA5F55',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          elevation: 5,
        },
        rStyle,
      ]}>
      <Text style={{fontSize: 6, color: 'white', fontWeight: 'bold'}}>
        {(12 - index) * 5}
      </Text>
    </Animated.View>
  );
};

export default Square;
