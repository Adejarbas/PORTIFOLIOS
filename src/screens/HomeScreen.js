import React, { useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Platform,
  useWindowDimensions,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const HomeScreen = () => {
  const { theme, isDark } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const isWebLarge = Platform.OS === 'web' && screenWidth > 768;
  const profileImage = require('../../assets/images/profile.png');
  const financeiroImage = require('../../assets/images/dashboard-preview.png');
  
  // Imagens dos Projetos (URIs seguras para evitar erro de arquivo ausente)
  const biogenUri = "https://raw.githubusercontent.com/Adejarbas/BioDashFront/main/public/logo-biogen.png";

  const scrollViewRef = useRef(null);
  const sectionRefs = useRef({
    home: null,
    about: null,
    skills: null,
    projects: null,
  });

  const styles = createStyles(theme, isWebLarge);

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const scrollToSection = (section) => {
    if (sectionRefs.current[section]) {
      sectionRefs.current[section].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 80, animated: true });
        },
        () => {}
      );
    }
  };

  const SpecialtyItem = ({ icon, label }) => (
    <View style={styles.specialtyItem}>
      <Text style={styles.specialtyIcon}>{icon}</Text>
      <Text style={styles.specialtyText}>{label}</Text>
    </View>
  );

  const ProjectCard = ({ title, description, colors, url, imageUri, source }) => {
    const scale = useRef(new Animated.Value(1)).current;
    
    const onHover = (isHovering) => {
      Animated.spring(scale, {
        toValue: isHovering ? 1.05 : 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40
      }).start();
    };

    const imageSource = source ? source : { uri: imageUri };

    return (
      <Animated.View 
        style={[
          styles.projectCard, 
          isWebLarge && { width: '45%', minWidth: 320, maxWidth: 500 },
          { transform: [{ scale }] }
        ]}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => onHover(true),
          onMouseLeave: () => onHover(false)
        } : {})}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.projectImage}
        >
          {source || imageUri ? (
            <Image 
              source={imageSource} 
              style={styles.projectThumbnail} 
              resizeMode="contain"
            />
          ) : (
            <View style={styles.mockup}>
                <View style={styles.mockupHeader}>
                    <View style={[styles.dot, {backgroundColor: '#ff5f57'}]} />
                    <View style={[styles.dot, {backgroundColor: '#ffbd2e'}]} />
                    <View style={[styles.dot, {backgroundColor: '#28ca42'}]} />
                </View>
                <View style={styles.mockupContent}>
                    <View style={[styles.mockupBar, {width: '70%', backgroundColor: theme.colors.accentBright}]} />
                    <View style={[styles.mockupBar, {width: '40%'}]} />
                    <View style={[styles.mockupBar, {width: '60%'}]} />
                </View>
            </View>
          )}
        </LinearGradient>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{title}</Text>
          <Text style={styles.projectDesc}>{description}</Text>
          <TouchableOpacity onPress={() => openLink(url)}>
            <Text style={styles.projectLink}>Ver no GitHub →</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Header scrollToSection={scrollToSection} />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View 
          style={[styles.hero, isWebLarge && styles.heroRow]}
          ref={(ref) => (sectionRefs.current.home = ref)}
        >
          {/* Mobile: foto no topo */}
          {!isWebLarge && (
            <Image 
              source={profileImage}
              style={styles.profilePhoto}
            />
          )}

          <View style={[styles.heroTextContainer, isWebLarge && { alignItems: 'flex-start' }]}>
            <Text style={[styles.name, isWebLarge && { fontSize: 56, textAlign: 'left' }]}>Daniel Adejarbas</Text>
            <Text style={[styles.subtitle, isWebLarge && { fontSize: 24, textAlign: 'left' }]}>Full Stack Developer</Text>
            <Text style={[styles.heroDesc, isWebLarge && { textAlign: 'left' }]}>
              Apaixonado por tecnologia, inovação e soluções criativas. Desenvolvedor em formação no curso de Desenvolvimento de Software Multiplataforma.
            </Text>

            {/* Especialidades */}
            <View style={styles.specialtiesContainer}>
              <SpecialtyItem icon="💻" label="Full Stack" />
              <SpecialtyItem icon="⚙️" label="APIs REST" />
              <SpecialtyItem icon="🗄️" label="Banco de Dados" />
            </View>

            <View style={[styles.socialLinks, isWebLarge && { justifyContent: 'flex-start' }]}>
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => openLink('https://www.linkedin.com/in/daniel-adejarbas/')}
              >
                <Text style={styles.socialText}>LinkedIn</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => openLink('https://github.com/adejarbas')}
              >
                <Text style={styles.socialText}>GitHub</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Web: foto à direita */}
          {isWebLarge && (
            <Image 
              source={profileImage}
              style={[styles.profilePhoto, { width: 350, height: 350, borderRadius: 175 }]}
            />
          )}
        </View>

        {/* About Section */}
        <View 
          style={styles.section}
          ref={(ref) => (sectionRefs.current.about = ref)}
        >
          <View style={styles.titleContainer}>
              <View style={styles.titleBar} />
              <Text style={styles.sectionTitle}>Sobre Mim</Text>
          </View>
          <Text style={styles.aboutText}>
            Desenvolvedor apaixonado por tecnologia, com foco em criar aplicações elegantes, 
            eficientes e centradas no usuário. Experiência em desenvolvimento web e mobile, 
            sempre buscando aprender novas tecnologias e melhores práticas de desenvolvimento.
          </Text>
        </View>

        {/* Skills Section */}
        <View 
          style={styles.section}
          ref={(ref) => (sectionRefs.current.skills = ref)}
        >
          <View style={styles.titleContainer}>
              <View style={styles.titleBar} />
              <Text style={styles.sectionTitle}>Skills</Text>
          </View>
          <View style={styles.skillsGrid}>
            {[
              { name: 'HTML', icon: '🌐' },
              { name: 'CSS', icon: '🎨' },
              { name: 'JavaScript', icon: '⚡' },
              { name: 'React', icon: '⚛️' },
              { name: 'React Native', icon: '📱' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'PHP', icon: '🐘' },
              { name: 'Python', icon: '🐍' },
              { name: 'Git', icon: '🔀' },
              { name: 'MySQL', icon: '🐬' },
              { name: 'PostgreSQL', icon: '🐘' },
              { name: 'SQL', icon: '🗃️' },
              { name: 'Firebase', icon: '🔥' },
            ].map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillIcon}>{skill.icon}</Text>
                <Text style={styles.skillText}>{skill.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Projects Section */}
        <View 
          style={styles.section}
          ref={(ref) => (sectionRefs.current.projects = ref)}
        >
          <View style={styles.titleContainer}>
              <View style={styles.titleBar} />
              <Text style={styles.sectionTitle}>Projetos em Destaque</Text>
          </View>
          
          <View style={[isWebLarge && styles.projectsGridWeb]}>
            <ProjectCard 
              title="BioDash (Frontend)"
              description="Dashboard de monitoramento para biodigestores com métricas de energia e resíduos em tempo real."
              colors={['#00c6fb', '#005bea']}
              url="https://github.com/Adejarbas/BioDashFront"
              imageUri={biogenUri}
            />

            <ProjectCard 
              title="Finanças Pro Gold"
              description="Plataforma SaaS para gestão financeira pessoal e empresarial, com controle de investimentos."
              colors={['#f6d365', '#fda085']}
              url="https://github.com/Adejarbas/Financeiro-Web"
              source={financeiroImage}
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footer}>© 2026 Daniel Adejarbas.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme, isWebLarge) => StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.bgPrimary,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgPrimary,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
  },
  contentContainer: {
    padding: theme.spacing.l,
    paddingTop: Platform.OS === 'web' ? 120 : 80,
    ...Platform.select({
      web: {
        paddingHorizontal: theme.spacing.xl,
      }
    })
  },
  hero: {
    alignItems: 'center',
    marginBottom: 80,
    gap: 40,
    minHeight: Platform.OS === 'web' ? '70vh' : 'auto',
    justifyContent: 'center',
  },
  heroRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 40,
    fontWeight: '700',
    color: theme.colors.textAccent,
    fontFamily: 'FiraCode_600SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroDesc: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 500,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
    justifyContent: 'center',
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 25,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      }
    })
  },
  specialtyIcon: {
    fontSize: 18,
  },
  specialtyText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    fontWeight: '500',
  },
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.bgCard,
    borderWidth: 5,
    borderColor: theme.colors.accentBright,
    alignSelf: 'center',
    marginBottom: 40,
    ...Platform.select({
      ios: { shadowColor: theme.colors.accentBright, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.4, shadowRadius: 25 },
      android: { elevation: 15 },
      web: { boxShadow: `0 20px 60px ${theme.colors.accentBright}66` }
    })
  },
  section: {
    marginBottom: 80,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  titleBar: {
    width: 4,
    height: 28,
    backgroundColor: theme.colors.accentBright,
    marginRight: 16,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.textAccent,
    fontFamily: 'FiraCode_600SemiBold',
  },
  aboutText: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    lineHeight: 32,
    fontFamily: 'Inter_400Regular',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.bgCard,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      }
    })
  },
  skillIcon: {
    fontSize: 18,
  },
  skillText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    fontWeight: '500',
  },
  projectsGridWeb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
  },
  projectCard: {
    backgroundColor: theme.colors.bgSecondary,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...Platform.select({
        web: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          ':hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 20px 40px ${theme.colors.accentBright}33`,
            borderColor: theme.colors.accentBright,
          }
        }
    })
  },
  projectImage: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  projectThumbnail: {
    width: '100%',
    height: '100%',
  },
  mockup: {
    width: 140,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 8,
    padding: 8,
    ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 },
        android: { elevation: 10 },
        web: { boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
    })
  },
  mockupHeader: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  mockupContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 6,
  },
  mockupBar: {
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginBottom: 5,
  },
  projectInfo: {
    padding: 24,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textAccent,
    fontFamily: 'FiraCode_600SemiBold',
    marginBottom: 10,
  },
  projectDesc: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 26,
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  projectLink: {
    color: theme.colors.accentBright,
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  socialButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.bgCard,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      }
    })
  },
  socialText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: 60,
  },
  footer: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});

export default HomeScreen;
