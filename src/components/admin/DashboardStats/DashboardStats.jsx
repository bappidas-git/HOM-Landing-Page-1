/**
 * DashboardStats Component
 * Professional stats cards with animations, trends, and loading states
 */

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Skeleton,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { DASHBOARD_STATS_CONFIG } from '@/lib/constants';

// Icon mapping for dynamic rendering
const iconMap = {
  People: PeopleIcon,
  PersonAdd: PersonAddIcon,
  Phone: PhoneIcon,
  CalendarMonth: CalendarIcon,
  CheckCircle: CheckCircleIcon,
  TrendingUp: TrendingUpIcon,
};

/**
 * Animated counter hook for number animations
 */
const useAnimatedCounter = (endValue, duration = 1000, enabled = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || typeof endValue !== 'number') {
      setCount(endValue || 0);
      return;
    }

    let startTime;
    let animationFrame;
    const startValue = 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, enabled]);

  return count;
};

/**
 * Individual Stats Card Component
 */
const StatsCard = ({ config, value, trend, loading, index, onRefresh }) => {
  const theme = useTheme();
  const IconComponent = iconMap[config.icon] || PeopleIcon;
  const animatedValue = useAnimatedCounter(value, 1200, !loading);

  // Calculate trend direction and styling
  const trendValue = trend?.value || 0;
  const trendDirection = trendValue >= 0 ? 'up' : 'down';
  const TrendIcon = trendDirection === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trendDirection === 'up' ? '#4caf50' : '#f44336';

  // Format value for display
  const formatValue = (val, suffix) => {
    if (typeof val !== 'number') return val || '0';
    if (suffix === '%') {
      return val.toFixed(1);
    }
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    return val.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease-in-out',
          border: '1px solid',
          borderColor: alpha(config.color, 0.1),
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: `0 12px 28px ${alpha(config.color, 0.2)}`,
            borderColor: alpha(config.color, 0.3),
          },
        }}
      >
        {/* Colored accent bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${config.color}, ${alpha(config.color, 0.6)})`,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />

        <CardContent sx={{ p: 3, pt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            {/* Left side - Value and label */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  mb: 1,
                  fontSize: '0.875rem',
                  letterSpacing: '0.025em',
                }}
              >
                {config.label}
              </Typography>

              {loading ? (
                <Skeleton variant="text" width={100} height={48} sx={{ my: 0.5 }} />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: config.color,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {formatValue(animatedValue, config.suffix)}
                  </Typography>
                  {config.suffix && (
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: alpha(config.color, 0.7),
                      }}
                    >
                      {config.suffix}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Trend indicator */}
              {!loading && trend && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mt: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.25,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      backgroundColor: alpha(trendColor, 0.1),
                    }}
                  >
                    <TrendIcon sx={{ fontSize: 14, color: trendColor }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: trendColor,
                      }}
                    >
                      {Math.abs(trendValue)}%
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                    }}
                  >
                    vs last week
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Right side - Icon */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                background: `linear-gradient(135deg, ${alpha(config.color, 0.15)} 0%, ${alpha(config.color, 0.05)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconComponent
                sx={{
                  fontSize: 32,
                  color: config.color,
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Main DashboardStats Component
 */
const DashboardStats = ({
  stats = {},
  loading = false,
  onRefresh,
  showTrends = true,
  columns = { xs: 12, sm: 6, md: 4, lg: 2 },
}) => {
  // Generate mock trends for demonstration
  const generateTrend = (key) => {
    if (!showTrends) return null;
    const trends = {
      totalLeads: { value: 12.5 },
      newLeads: { value: 23.1 },
      contactedLeads: { value: 8.4 },
      siteVisits: { value: -5.2 },
      convertedLeads: { value: 15.7 },
      conversionRate: { value: 2.3 },
    };
    return trends[key] || { value: Math.floor(Math.random() * 40) - 10 };
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {DASHBOARD_STATS_CONFIG.map((config, index) => (
          <Grid item {...columns} key={config.id}>
            <StatsCard
              config={config}
              value={stats[config.key]}
              trend={generateTrend(config.key)}
              loading={loading}
              index={index}
              onRefresh={onRefresh}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/**
 * Compact Stats Row Component (for smaller displays)
 */
export const CompactStatsRow = ({ stats = {}, loading = false }) => {
  const displayStats = [
    { key: 'totalLeads', label: 'Total', color: '#1a1a2e', icon: PeopleIcon },
    { key: 'newLeads', label: 'New', color: '#2196f3', icon: PersonAddIcon },
    { key: 'convertedLeads', label: 'Converted', color: '#4caf50', icon: CheckCircleIcon },
    { key: 'conversionRate', label: 'Rate', color: '#8B9A46', icon: TrendingUpIcon, suffix: '%' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': { height: 4 },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: 2
        },
      }}
    >
      {displayStats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Box
            key={stat.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(stat.color, 0.08),
              minWidth: 'fit-content',
            }}
          >
            <IconComponent sx={{ color: stat.color, fontSize: 20 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {stat.label}
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={40} height={24} />
              ) : (
                <Typography variant="body1" sx={{ fontWeight: 700, color: stat.color }}>
                  {stats[stat.key] || 0}{stat.suffix || ''}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * Large Stats Card Component (for feature highlights)
 */
export const LargeStatsCard = ({
  title,
  value,
  subtitle,
  icon: IconComponent,
  color = '#8B9A46',
  trend,
  loading = false,
  action,
}) => {
  const animatedValue = useAnimatedCounter(value, 1500, !loading);

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 160,
          height: 160,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.9 }}>
            {title}
          </Typography>
          {IconComponent && (
            <Box sx={{ p: 1.5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
              <IconComponent sx={{ fontSize: 28 }} />
            </Box>
          )}
        </Box>

        {loading ? (
          <Skeleton variant="text" width={120} height={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        ) : (
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
            {typeof value === 'number' ? animatedValue.toLocaleString() : value}
          </Typography>
        )}

        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
          {subtitle}
        </Typography>

        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend.value >= 0 ? (
              <TrendingUpIcon sx={{ fontSize: 18 }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 18 }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {Math.abs(trend.value)}% {trend.value >= 0 ? 'increase' : 'decrease'}
            </Typography>
          </Box>
        )}

        {action && (
          <Box sx={{ mt: 3 }}>
            {action}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default DashboardStats;
