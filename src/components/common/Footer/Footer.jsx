/**
 * Footer Component
 * Site footer with navigation, contact info, and legal links
 */

import { Box, Container, Grid, Typography, IconButton, Link as MuiLink, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';
import { useUIContext } from '@/context/UIContext';
import { FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS } from '@/lib/constants/navigationItems';
import styles from './Footer.module.css';

/**
 * Footer component
 */
const Footer = () => {
  const { scrollToSection, isMobile, isTablet } = useUIContext();

  // Social media links
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/nambiarbuilders', label: 'Facebook' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/nambiarbuilders', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/company/nambiarbuilders', label: 'LinkedIn' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com/nambiarbuilders', label: 'YouTube' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/nambiarbuilders', label: 'Twitter' },
  ];

  // Handle navigation link click
  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    }
  };

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box component="footer" className={styles.footer}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div variants={itemVariants}>
                <Box className={styles.aboutSection}>
                  <Box className={styles.logoWrapper}>
                    <Typography variant="h5" className={styles.logoMain}>
                      NAMBIAR
                    </Typography>
                    <Typography variant="caption" className={styles.logoSub}>
                      BUILDERS
                    </Typography>
                  </Box>
                  <Typography variant="body2" className={styles.aboutText}>
                    One of Bengaluru&apos;s most trusted premium builders with a legacy of
                    delivering quality homes. Building trust, delivering excellence.
                  </Typography>

                  {/* Social Links */}
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
                </Box>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  Quick Links
                </Typography>
                <Box component="nav" className={styles.linkList}>
                  {FOOTER_QUICK_LINKS.map((link, index) => (
                    <MuiLink
                      key={index}
                      component="button"
                      onClick={() => handleNavClick(link.href)}
                      className={styles.footerLink}
                      underline="none"
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  Contact Us
                </Typography>
                <Box className={styles.contactList}>
                  <Box className={styles.contactItem}>
                    <LocationOnIcon className={styles.contactIcon} />
                    <Typography variant="body2" className={styles.contactText}>
                      Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125
                    </Typography>
                  </Box>
                  <Box className={styles.contactItem}>
                    <PhoneIcon className={styles.contactIcon} />
                    <MuiLink
                      href="tel:+917026034444"
                      className={styles.contactLink}
                      underline="none"
                    >
                      702 603 4444
                    </MuiLink>
                  </Box>
                  <Box className={styles.contactItem}>
                    <EmailIcon className={styles.contactIcon} />
                    <MuiLink
                      href="mailto:sales@nambiardistrict25.com"
                      className={styles.contactLink}
                      underline="none"
                    >
                      sales@nambiardistrict25.com
                    </MuiLink>
                  </Box>
                  <Box className={styles.contactItem}>
                    <WhatsAppIcon className={styles.contactIcon} />
                    <MuiLink
                      href="https://wa.me/917026034444"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                      underline="none"
                    >
                      WhatsApp Us
                    </MuiLink>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Legal Links */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  Legal
                </Typography>
                <Box component="nav" className={styles.linkList}>
                  {FOOTER_LEGAL_LINKS.map((link, index) => (
                    <MuiLink
                      key={index}
                      href={link.href}
                      className={styles.footerLink}
                      underline="none"
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider className={styles.divider} />

          {/* Bottom Bar */}
          <Box className={styles.bottomBar}>
            <Typography variant="body2" className={styles.copyright}>
              © {new Date().getFullYear()} Nambiar Builders. All rights reserved.
            </Typography>
            <Typography variant="caption" className={styles.reraInfo}>
              RERA: PRM/KA/RERA/1251/308/PR/200825/008011
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Bottom padding for mobile navigation */}
      {(isMobile || isTablet) && <Box className={styles.mobileBottomPadding} />}
    </Box>
  );
};

export default Footer;
