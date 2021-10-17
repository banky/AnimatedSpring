import React, {useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [panning, setPanning] = useState(false);
  const emoji = panning ? '😤' : '😄';

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setPanning(true),
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        setPanning(false);
        Animated.spring(pan, {
          toValue: new Animated.ValueXY(),
          useNativeDriver: true,
          friction: 4,
          tension: 50,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
        {...panResponder.panHandlers}>
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 100,
  },
});

export default App;
