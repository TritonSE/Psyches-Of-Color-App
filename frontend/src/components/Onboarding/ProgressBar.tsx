import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressBarProps {
  progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressPercent = (progress * 100).toFixed(0);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.fill,
          { width: `${progressPercent}%` } as ViewStyle,
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 300,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  fill: {
    height: '100%',
    backgroundColor: '#D35144',
  },
});
