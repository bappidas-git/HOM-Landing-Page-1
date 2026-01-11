/**
 * StatusBarChart Component
 * Horizontal bar chart for lead status distribution
 */

import { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Skeleton,
  LinearProgress,
  alpha,
} from '@mui/material';
import { LEAD_STATUS_OPTIONS } from '@/lib/constants';

/**
 * Main StatusBarChart Component
 */
const StatusBarChart = ({
  data = {},
  loading = false,
  title = 'Leads by Status',
  showValues = true,
}) => {
  // Calculate total and prepare items with percentages
  const { total, items } = useMemo(() => {
    const totalCount = Object.values(data).reduce((a, b) => a + b, 0);
    
    const statusItems = LEAD_STATUS_OPTIONS.map((status) => {
      const value = data[status.value] || 0;
      const percentage = totalCount > 0 ? (value / totalCount) * 100 : 0;
      return {
        ...status,
        count: value,
        percentage,
      };
    }).filter(item => item.count > 0); // Only show statuses with leads

    return { total: totalCount, items: statusItems };
  }, [data]);

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {!loading && (
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Total: {total}
              </Typography>
            )}
          </Box>
        }
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ pt: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i}>
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 1, mt: 1 }} />
              </Box>
            ))}
          </Box>
        ) : items.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {items.map((item) => (
              <Box key={item.value}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                      {item.label}
                    </Typography>
                  </Box>
                  {showValues && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: item.color }}>
                        {item.count}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({item.percentage.toFixed(1)}%)
                      </Typography>
                    </Box>
                  )}
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: alpha(item.color, 0.15),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: item.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              py: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography>No data available</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusBarChart;
