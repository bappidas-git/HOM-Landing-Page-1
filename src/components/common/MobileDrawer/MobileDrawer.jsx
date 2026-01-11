/**
 * MobileDrawer Component
 * Full-screen drawer for mobile navigation
 */

import { Box, Drawer, IconButton, Typography, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import PoolIcon from '@mui/icons-material/Pool';
import GridViewIcon from '@mui/icons-material/GridView';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BusinessIcon from '@mui/icons-material/Business';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useUIContext } from '@/context/UIContext';
import { MOBILE_DRAWER_NAV_ITEMS } from '@/lib/constants/navigationItems';
import styles from './MobileDrawer.module.css';

// Icon mapping
const iconMap = {
  Home: HomeIcon,
  Info: InfoIcon,
  Star: StarIcon,
  Pool: PoolIcon,
  GridView: GridViewIcon,
  PhotoLibrary: PhotoLibraryIcon,
  LocationOn: LocationOnIcon,
  CurrencyRupee: CurrencyRupeeIcon,
  Business: BusinessIcon,
  QuestionAnswer: QuestionAnswerIcon,
  ContactPhone: ContactPhoneIcon,
};

/**
 * MobileDrawer component
 */
const MobileDrawer = () => {
  const {
    isMobileDrawerOpen,
    closeMobileDrawer,
    scrollToSection,
    activeSection,
  } = useUIContext();

  // Handle navigation click
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    closeMobileDrawer();
  };

  // Social media links
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/nambiarbuilders', label: 'Facebook' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/nambiarbuilders', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/company/nambiarbuilders', label: 'LinkedIn' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com/nambiarbuilders', label: 'YouTube' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Drawer
      anchor="bottom"
      open={isMobileDrawerOpen}
      onClose={closeMobileDrawer}
      className={styles.drawer}
      PaperProps={{
        className: styles.drawerPaper,
      }}
    >
      <Box className={styles.container}>
        {/* Header */}
        <Box className={styles.header}>
          <Box className={styles.logoWrapper}>
            <Typography variant="h6" className={styles.logoMain}>
              NAMBIAR
            </Typography>
            <Typography variant="caption" className={styles.logoSub}>
              District 25
            </Typography>
          </Box>

          <IconButton
            onClick={closeMobileDrawer}
            className={styles.closeButton}
            aria-label="Close menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider className={styles.divider} />

        {/* Navigation Items */}
        <AnimatePresence mode="wait">
          {isMobileDrawerOpen && (
            <motion.nav
              className={styles.navigation}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {MOBILE_DRAWER_NAV_ITEMS.map((item) => {
                const IconComponent = iconMap[item.icon];
                const isActive = activeSection === item.sectionId;

                return (
                  <motion.button
                    key={item.id}
                    className={clsx(styles.navItem, {
                      [styles.active]: isActive,
                    })}
                    onClick={() => handleNavClick(item.sectionId)}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                  >
                    {IconComponent && (
                      <IconComponent className={styles.navIcon} />
                    )}
                    <span className={styles.navLabel}>{item.label}</span>
                    {isActive && <span className={styles.activeIndicator} />}
                  </motion.button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>

        <Divider className={styles.divider} />

        {/* Quick Contact Buttons */}
        <Box className={styles.quickContact}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<PhoneIcon />}
              href="tel:+917026034444"
              className={styles.callButton}
            >
              Call Now
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Button
              variant="outlined"
              fullWidth
              startIcon={<WhatsAppIcon />}
              href="https://wa.me/917026034444"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              WhatsApp
            </Button>
          </motion.div>
        </Box>

        {/* Social Links */}
        <motion.div
          className={styles.socialSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Box className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={styles.socialButton}
                size="small"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </motion.div>

        {/* RERA Info */}
        <motion.div
          className={styles.reraSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <Typography variant="caption" className={styles.reraText}>
            RERA: PRM/KA/RERA/1251/308/PR/200825/008011
          </Typography>
        </motion.div>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
