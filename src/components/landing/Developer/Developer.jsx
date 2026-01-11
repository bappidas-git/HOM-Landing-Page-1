/**
 * Developer Section Component
 * About Nambiar Builders with awards and projects
 */

import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { developerContent } from '@/data/content/developer';
import styles from './Developer.module.css';

const Developer = () => {
  const { openPopup } = useUIContext();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <SectionWrapper
      id={developerContent.sectionId}
      background="paper"
      paddingY="large"
    >
      <SectionTitle
        title={developerContent.title}
        subtitle={developerContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Developer Info */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box className={styles.logoSection}>
                <Box className={styles.logoPlaceholder}>
                  <Icon className={styles.buildingIcon}>apartment</Icon>
                  <Typography variant="h5" className={styles.developerName}>
                    {developerContent.developer.name}
                  </Typography>
                  <Typography variant="body2" className={styles.tagline}>
                    {developerContent.developer.tagline}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box className={styles.developerInfo}>
                {developerContent.developer.description.map((paragraph, index) => (
                  <Typography key={index} variant="body1" className={styles.description}>
                    {paragraph}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={itemVariants}>
          <Box className={styles.statsSection}>
            <Grid container spacing={3}>
              {developerContent.stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box className={styles.statCard}>
                    <Box className={styles.statIcon}>
                      <Icon>{stat.icon}</Icon>
                    </Box>
                    <Typography variant="h3" className={styles.statValue}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" className={styles.statLabel}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Awards */}
        <motion.div variants={itemVariants}>
          <Box className={styles.awardsSection}>
            <Typography variant="h6" className={styles.sectionSubtitle}>
              Awards & Recognition
            </Typography>
            <Grid container spacing={3}>
              {developerContent.awards.map((award) => (
                <Grid item xs={6} sm={3} key={award.id}>
                  <Box className={styles.awardCard}>
                    <Box className={styles.awardIcon}>
                      <Icon>{award.icon}</Icon>
                    </Box>
                    <Typography variant="subtitle2" className={styles.awardTitle}>
                      {award.title}
                    </Typography>
                    <Typography variant="caption" className={styles.awardOrg}>
                      {award.organization}
                    </Typography>
                    <Typography variant="caption" className={styles.awardYear}>
                      {award.year}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Core Values */}
        <motion.div variants={itemVariants}>
          <Box className={styles.valuesSection}>
            <Typography variant="h6" className={styles.sectionSubtitle}>
              Our Core Values
            </Typography>
            <Grid container spacing={3}>
              {developerContent.values.map((value, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box className={styles.valueCard}>
                    <Box className={styles.valueIcon}>
                      <Icon>{value.icon}</Icon>
                    </Box>
                    <Typography variant="subtitle1" className={styles.valueTitle}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" className={styles.valueDescription}>
                      {value.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Other Projects */}
        <motion.div variants={itemVariants}>
          <Box className={styles.projectsSection}>
            <Typography variant="h6" className={styles.sectionSubtitle}>
              Other Projects by Nambiar Builders
            </Typography>
            <Grid container spacing={3}>
              {developerContent.otherProjects.map((project) => (
                <Grid item xs={12} sm={4} key={project.id}>
                  <Card className={styles.projectCard}>
                    <Box
                      className={styles.projectImage}
                      sx={{ backgroundImage: `url(${project.image})` }}
                    >
                      <Box className={styles.projectOverlay}>
                        <Icon className={styles.projectIcon}>apartment</Icon>
                      </Box>
                    </Box>
                    <CardContent className={styles.projectContent}>
                      <Typography variant="subtitle1" className={styles.projectName}>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" className={styles.projectLocation}>
                        <Icon className={styles.locationIcon}>location_on</Icon>
                        {project.location}
                      </Typography>
                      <Box className={styles.projectMeta}>
                        <Typography variant="caption" className={styles.projectType}>
                          {project.type}
                        </Typography>
                        <Typography
                          variant="caption"
                          className={`${styles.projectStatus} ${
                            project.status === 'Ready to Move' ? styles.ready : styles.construction
                          }`}
                        >
                          {project.status}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants}>
          <Box className={styles.certificationsSection}>
            {developerContent.certifications.map((cert, index) => (
              <Box key={index} className={styles.certBadge}>
                <Icon className={styles.certIcon}>{cert.icon}</Icon>
                <Box>
                  <Typography variant="subtitle2">{cert.name}</Typography>
                  <Typography variant="caption">{cert.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* CTA */}
        <Box className={styles.ctaWrapper}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Icon>info</Icon>}
            onClick={() => openPopup('brochure')}
            className={styles.ctaButton}
          >
            Download Company Profile
          </Button>
        </Box>
      </motion.div>
    </SectionWrapper>
  );
};

export default Developer;
