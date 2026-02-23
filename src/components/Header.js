import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  useWindowDimensions
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Header = ({ scrollToSection }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;

  const styles = createStyles(theme);

  const menuItems = [
    { label: 'Início', section: 'home' },
    { label: 'Sobre', section: 'about' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projetos', section: 'projects' },
  ];

  return (
    <View style={[styles.header, isWeb && styles.headerWeb]}>
      <View style={styles.container}>
        <Text style={styles.logo}>{'<daniel />'}</Text>

        {!isMobile ? (
          <View style={styles.navRight}>
            <View style={styles.navLinks}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.section}
                  onPress={() => scrollToSection && scrollToSection(item.section)}
                  style={styles.navItem}
                >
                  <Text style={styles.navText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.themeToggle}
              onPress={toggleTheme}
            >
              <Text style={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.mobileControls}>
            <TouchableOpacity
              style={styles.themeToggle}
              onPress={toggleTheme}
            >
              <Text style={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuOpen(!menuOpen)}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.section}
              style={styles.mobileMenuItem}
              onPress={() => {
                scrollToSection && scrollToSection(item.section);
                setMenuOpen(false);
              }}
            >
              <Text style={styles.mobileMenuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  header: {
    backgroundColor: theme.colors.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 20,
    paddingHorizontal: 12,
    ...Platform.select({
      web: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: `${theme.colors.bgPrimary}f5`,
        backdropFilter: 'blur(10px)',
        paddingVertical: 16,
        paddingHorizontal: 20,
      }
    })
  },
  headerWeb: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
    ...Platform.select({
      web: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
        paddingHorizontal: 0,
      }
    })
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textAccent,
    fontFamily: 'FiraCode_600SemiBold',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  navItem: {
    paddingVertical: 4,
  },
  navText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    fontWeight: '500',
    ...Platform.select({
      web: {
        transition: 'color 0.3s',
      }
    })
  },
  themeToggle: {
    width: 40,
    height: 28,
    borderRadius: 25,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: 16,
  },
  mobileControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: theme.colors.textAccent,
  },
  mobileMenu: {
    backgroundColor: theme.colors.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 12,
  },
  mobileMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  mobileMenuText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default Header;
