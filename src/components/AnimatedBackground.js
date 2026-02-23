import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
  const { theme, isDark } = useTheme();
  const { height, width } = Dimensions.get('window');
  
  // Criar múltiplas animações para elementos flutuantes
  const animations = useRef(
    [...Array(8)].map(() => ({
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0.3),
    }))
  ).current;

  useEffect(() => {
    // Animar cada elemento flutuante
    animations.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(anim.translateY, {
              toValue: -30,
              duration: 3000 + index * 500,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0.6,
              duration: 1500 + index * 250,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 3000 + index * 500,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0.3,
              duration: 1500 + index * 250,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    });
  }, []);

  const floatingElements = [
    { top: '10%', left: '10%' },
    { top: '25%', left: '80%' },
    { top: '40%', left: '15%' },
    { top: '55%', left: '75%' },
    { top: '70%', left: '20%' },
    { top: '15%', left: '60%' },
    { top: '85%', left: '40%' },
    { top: '30%', left: '50%' },
  ];

  const gradientColors = isDark 
    ? ['#0a0a0f', '#1a1a2e', '#0a0a0f']
    : ['#f0f4f8', '#e2e8f0', '#f0f4f8'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Gradiente radial simulado */}
      <View style={styles.radialOverlay}>
        <LinearGradient
          colors={isDark 
            ? ['rgba(74, 158, 255, 0.05)', 'transparent']
            : ['rgba(74, 158, 255, 0.08)', 'transparent']
          }
          style={styles.radialGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>

      {/* Elementos flutuantes */}
      {Platform.OS !== 'web' && animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.floatingElement,
            {
              top: floatingElements[index].top,
              left: floatingElements[index].left,
              opacity: anim.opacity,
              transform: [{ translateY: anim.translateY }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  radialOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  radialGradient: {
    flex: 1,
    opacity: 0.4,
  },
  floatingElement: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4a9eff',
  },
});

export default AnimatedBackground;
