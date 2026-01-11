/**
 * Unit Plans Section Component
 * Tower-wise unit distribution with interactive key plan
 */

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { unitPlansContent, getTowerById } from '@/data/content/unitPlans';
import styles from './UnitPlans.module.css';

const UnitPlans = () => {
  const [selectedTower, setSelectedTower] = useState(unitPlansContent.towers[0].id);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const { openPopup } = useUIContext();

  const currentTower = getTowerById(selectedTower);

  const handleCTAClick = () => {
    openPopup('enquiry');
  };

  const handleTowerChange = (event, newValue) => {
    setSelectedTower(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'launching':
        return '#8B9A46';
      case 'available':
        return '#4caf50';
      case 'limited':
        return '#ff9800';
      case 'sold':
        return '#f44336';
      default:
        return '#8B9A46';
    }
  };

  return (
    <SectionWrapper
      id={unitPlansContent.sectionId}
      background="paper"
      paddingY="large"
    >
      <SectionTitle
        title={unitPlansContent.title}
        subtitle={unitPlansContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Box className={styles.summaryStats}>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>domain</Icon>
            <Typography variant="h5" className={styles.statValue}>
              {unitPlansContent.summary.totalTowers}
            </Typography>
            <Typography variant="caption">Towers</Typography>
          </Box>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>home</Icon>
            <Typography variant="h5" className={styles.statValue}>
              {unitPlansContent.summary.totalUnits}
            </Typography>
            <Typography variant="caption">Total Units</Typography>
          </Box>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>layers</Icon>
            <Typography variant="h5" className={styles.statValue}>
              {unitPlansContent.summary.floorsPerTower}
            </Typography>
            <Typography variant="caption">Floors/Tower</Typography>
          </Box>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>elevator</Icon>
            <Typography variant="h5" className={styles.statValue}>
              {unitPlansContent.summary.elevatorsPerTower}
            </Typography>
            <Typography variant="caption">Elevators/Tower</Typography>
          </Box>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>local_parking</Icon>
            <Typography variant="h5" className={styles.statValue}>
              {unitPlansContent.summary.parkingRatio}
            </Typography>
            <Typography variant="caption">Parking Ratio</Typography>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        {/* Tower Selection Tabs */}
        <Grid item xs={12}>
          <Box className={styles.towerTabs}>
            <Tabs
              value={selectedTower}
              onChange={handleTowerChange}
              variant="scrollable"
              scrollButtons="auto"
              className={styles.tabs}
            >
              {unitPlansContent.towers.map((tower) => (
                <Tab
                  key={tower.id}
                  value={tower.id}
                  label={
                    <Box className={styles.tabLabel}>
                      <Typography variant="subtitle2">{tower.name}</Typography>
                      <Chip
                        label={tower.unitType}
                        size="small"
                        className={styles.unitTypeChip}
                      />
                    </Box>
                  }
                  className={styles.tab}
                />
              ))}
            </Tabs>
          </Box>
        </Grid>

        {/* Tower Details */}
        <Grid item xs={12} md={7}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTower}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.towerCard}>
                <CardContent>
                  {/* Tower Header */}
                  <Box className={styles.towerHeader}>
                    <Box>
                      <Typography variant="h4" className={styles.towerName}>
                        {currentTower.name}
                      </Typography>
                      <Chip
                        label={currentTower.status}
                        size="small"
                        sx={{ backgroundColor: getStatusColor(currentTower.status), color: '#fff' }}
                        className={styles.statusChip}
                      />
                    </Box>
                    <Box className={styles.towerMeta}>
                      <Typography variant="h6" className={styles.unitType}>
                        {currentTower.unitType}
                      </Typography>
                      <Typography variant="body2" className={styles.sba}>
                        SBA: {currentTower.sba}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Tower Info */}
                  <Grid container spacing={2} className={styles.towerInfo}>
                    <Grid item xs={4}>
                      <Box className={styles.infoItem}>
                        <Icon>layers</Icon>
                        <Typography variant="body2">
                          {currentTower.floors} Floors
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className={styles.infoItem}>
                        <Icon>door_front</Icon>
                        <Typography variant="body2">
                          {currentTower.unitsPerFloor} Units/Floor
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className={styles.infoItem}>
                        <Icon>home</Icon>
                        <Typography variant="body2">
                          {currentTower.totalUnits} Total Units
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Highlights */}
                  <Box className={styles.highlights}>
                    <Typography variant="subtitle2" className={styles.highlightsTitle}>
                      Highlights
                    </Typography>
                    <Box className={styles.highlightChips}>
                      {currentTower.highlights.map((highlight, index) => (
                        <Chip
                          key={index}
                          icon={<Icon>check_circle</Icon>}
                          label={highlight}
                          variant="outlined"
                          className={styles.highlightChip}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Units Table */}
                  <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Position</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Facing</TableCell>
                          <TableCell>View</TableCell>
                          <TableCell align="center">Units</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentTower.units.map((unit) => (
                          <TableRow
                            key={unit.position}
                            hover
                            onMouseEnter={() => setHoveredUnit(unit.position)}
                            onMouseLeave={() => setHoveredUnit(null)}
                            className={hoveredUnit === unit.position ? styles.hoveredRow : ''}
                          >
                            <TableCell>
                              <Chip
                                label={unit.position}
                                size="small"
                                color="secondary"
                              />
                            </TableCell>
                            <TableCell>{unit.type || currentTower.unitType}</TableCell>
                            <TableCell>{unit.facing}</TableCell>
                            <TableCell>{unit.view}</TableCell>
                            <TableCell align="center">{unit.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Grid>

        {/* Key Plan */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className={styles.keyPlanCard}>
              <CardContent>
                <Typography variant="h6" className={styles.keyPlanTitle}>
                  Key Plan - Unit Positions
                </Typography>

                {/* Interactive Key Plan */}
                <Box className={styles.keyPlanVisual}>
                  <Box className={styles.keyPlanGrid}>
                    {['U1', 'U2', 'U3', 'U4'].map((position) => {
                      const unitInfo = unitPlansContent.unitPositions[position];
                      return (
                        <Tooltip
                          key={position}
                          title={
                            <Box>
                              <Typography variant="subtitle2">
                                {unitInfo.label}
                              </Typography>
                              <Typography variant="caption">
                                {unitInfo.description}
                              </Typography>
                              <ul style={{ margin: '4px 0', paddingLeft: '16px' }}>
                                {unitInfo.advantages.map((adv, idx) => (
                                  <li key={idx}>
                                    <Typography variant="caption">{adv}</Typography>
                                  </li>
                                ))}
                              </ul>
                            </Box>
                          }
                          arrow
                          placement="top"
                        >
                          <Box
                            className={`${styles.keyPlanUnit} ${
                              hoveredUnit === position ? styles.highlighted : ''
                            }`}
                            onMouseEnter={() => setHoveredUnit(position)}
                            onMouseLeave={() => setHoveredUnit(null)}
                          >
                            <Typography variant="h6">{position}</Typography>
                            <Typography variant="caption">
                              {unitInfo.description.split(' ')[0]}
                            </Typography>
                          </Box>
                        </Tooltip>
                      );
                    })}
                  </Box>
                  <Box className={styles.compassRose}>
                    <Icon>explore</Icon>
                    <Typography variant="caption">N</Typography>
                  </Box>
                </Box>

                {/* Unit Position Legend */}
                <Box className={styles.legend}>
                  <Typography variant="subtitle2" className={styles.legendTitle}>
                    Facing Advantages
                  </Typography>
                  {Object.entries(unitPlansContent.unitPositions).map(([key, value]) => (
                    <Box key={key} className={styles.legendItem}>
                      <Chip label={key} size="small" color="secondary" />
                      <Typography variant="body2">{value.description}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* CTA */}
      <Box className={styles.ctaWrapper}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Icon>{unitPlansContent.cta.icon}</Icon>}
          onClick={handleCTAClick}
          className={styles.ctaButton}
        >
          {unitPlansContent.cta.text}
        </Button>
      </Box>
    </SectionWrapper>
  );
};

export default UnitPlans;
