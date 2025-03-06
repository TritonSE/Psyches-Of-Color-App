// components/ActivityOptions.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Define the props type for the component
interface ActivityOptionsProps {
  // This can take any additional props you'd like, such as style
}

const ActivityOptions: React.FC<ActivityOptionsProps> = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('@/assets/yellowButton.png')}
        style={[styles.buttonImage, { marginLeft: -99 }]}
      />
      <Image
        source={require('@/assets/redButton.png')}
        style={[styles.buttonImage, { marginRight: -99 }]}
      />
      <Image
        source={require('@/assets/grayButton.png')}
        style={[styles.buttonImage, { marginLeft: -100 }]}
      />
      <Image
        source={require('@/assets/grayButton.png')}
        style={[styles.buttonImage, { marginRight: -99 }]}
      />
    </View>
  );
};

// Styles for the ActivityOptions component
const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
    marginBottom: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 98,
    height: 98,
    marginVertical: 10,
  },
});

export default ActivityOptions;
