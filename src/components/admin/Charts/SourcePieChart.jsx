/**
 * SourcePieChart Component
 * Doughnut/Pie chart for lead source distribution
 */

import { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Skeleton,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Circle as CircleIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Color palette for sources
const SOURCE_COLORS = {
  hero_form: '#8B9A46',
  popup_form: '#1a1a2e',
  cta_form: '#c9a227',
};

const SOURCE_LABELS = {
  hero_form: 'Hero Form',
  popup_form: 'Popup Form',
  cta_form: 'CTA Form',
};

/**
 * Main SourcePieChart Component
 */
const SourcePieChart = ({
  data = {},
  loading = false,
  title = 'Leads by Source',
  height = 280,
  showLegend = true,
}) => {
  const theme = useTheme();

  // Prepare chart data
  const chartData = useMemo(() => {
    const labels = Object.keys(data).map((key) => SOURCE_LABELS[key] || key);
    const values = Object.values(data);
    const colors = Object.keys(data).map((key) => SOURCE_COLORS[key] || '#9e9e9e');

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 4,
          hoverBorderWidth: 4,
          hoverOffset: 8,
        },
      ],
    };
  }, [data]);

  // Chart options
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a2e',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
          },
        },
      },
    },
  }), []);

  // Calculate total and percentages for legend
  const total = useMemo(() => 
    Object.values(data).reduce((a, b) => a + b, 0),
  [data]);

  const legendItems = useMemo(() => 
    Object.entries(data).map(([key, value]) => ({
      key,
      label: SOURCE_LABELS[key] || key,
      value,
      percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
      color: SOURCE_COLORS[key] || '#9e9e9e',
    })),
  [data, total]);

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
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        }
        sx={{ pb: 0 }}
      />

      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Chart */}
          <Box sx={{ position: 'relative', width: '100%', height, mb: 2 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Skeleton variant="circular" width={200} height={200} />
              </Box>
            ) : total > 0 ? (
              <>
                <Doughnut data={chartData} options={options} />
                {/* Center label */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
                    {total}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Leads
                  </Typography>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}
              >
                <Typography>No data available</Typography>
              </Box>
            )}
          </Box>

          {/* Legend */}
          {showLegend && !loading && total > 0 && (
            <List sx={{ width: '100%', pt: 0 }}>
              {legendItems.map((item) => (
                <ListItem
                  key={item.key}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    mb: 0.5,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: alpha(item.color, 0.08),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CircleIcon sx={{ color: item.color, fontSize: 14 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.label}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: item.color }}>
                            {item.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              backgroundColor: alpha(item.color, 0.1),
                              color: item.color,
                              fontWeight: 600,
                            }}
                          >
                            {item.percentage}%
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SourcePieChart;
