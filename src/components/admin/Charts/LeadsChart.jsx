/**
 * LeadsChart Component
 * Professional line/area chart for leads trends with multiple view options
 */

import { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Timeline as LineIcon,
  BarChart as BarIcon,
  ShowChart as AreaIcon,
  Download as DownloadIcon,
  Fullscreen as FullscreenIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

/**
 * Main LeadsChart Component
 */
const LeadsChart = ({
  data = [],
  loading = false,
  title = 'Leads Trend',
  subtitle = 'Last 7 days',
  height = 320,
  onRefresh,
  showControls = true,
}) => {
  const theme = useTheme();
  const [chartType, setChartType] = useState('area');
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Handle chart type change
  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  // Format date labels
  const formatLabel = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    const labels = data.map((item) => formatLabel(item.date));
    const values = data.map((item) => item.count || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Leads',
          data: values,
          borderColor: '#8B9A46',
          backgroundColor: chartType === 'area'
            ? (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, height);
                gradient.addColorStop(0, alpha('#8B9A46', 0.4));
                gradient.addColorStop(1, alpha('#8B9A46', 0.02));
                return gradient;
              }
            : alpha('#8B9A46', 0.8),
          borderWidth: 3,
          fill: chartType === 'area',
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#8B9A46',
          pointBorderWidth: 3,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#8B9A46',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,
        },
      ],
    };
  }, [data, chartType, height]);

  // Chart options
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a2e',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: alpha('#8B9A46', 0.5),
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        displayColors: false,
        callbacks: {
          title: (items) => {
            return items[0]?.label || '';
          },
          label: (context) => {
            return context.parsed.y + ' leads';
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 12,
            weight: 500,
          },
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: alpha(theme.palette.divider, 0.5),
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 12,
            weight: 500,
          },
          padding: 12,
          stepSize: Math.ceil(Math.max(...(data.map(d => d.count) || [10])) / 5) || 5,
        },
      },
    },
    elements: {
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
      },
    },
  }), [data, theme]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const values = data.map(d => d.count || 0);
    const total = values.reduce((a, b) => a + b, 0);
    const avg = values.length > 0 ? (total / values.length).toFixed(1) : 0;
    const max = Math.max(...values, 0);
    const min = Math.min(...values, 0);
    return { total, avg, max, min };
  }, [data]);

  const ChartComponent = chartType === 'bar' ? Bar : Line;

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
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        }
        action={
          showControls && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={handleChartTypeChange}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: alpha('#8B9A46', 0.15),
                      color: '#8B9A46',
                      '&:hover': {
                        backgroundColor: alpha('#8B9A46', 0.25),
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="area">
                  <Tooltip title="Area Chart">
                    <AreaIcon fontSize="small" />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="line">
                  <Tooltip title="Line Chart">
                    <LineIcon fontSize="small" />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="bar">
                  <Tooltip title="Bar Chart">
                    <BarIcon fontSize="small" />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
              <IconButton
                size="small"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <MoreIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem onClick={() => { onRefresh?.(); setMenuAnchor(null); }}>
                  <RefreshIcon fontSize="small" sx={{ mr: 1 }} /> Refresh
                </MenuItem>
                <MenuItem onClick={() => setMenuAnchor(null)}>
                  <DownloadIcon fontSize="small" sx={{ mr: 1 }} /> Download
                </MenuItem>
                <MenuItem onClick={() => setMenuAnchor(null)}>
                  <FullscreenIcon fontSize="small" sx={{ mr: 1 }} /> Fullscreen
                </MenuItem>
              </Menu>
            </Box>
          )
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 2 }}>
        {/* Summary Stats */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mb: 3,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {[
            { label: 'Total', value: stats.total },
            { label: 'Average', value: stats.avg },
            { label: 'Peak', value: stats.max },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {stat.label}
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={40} height={28} />
              ) : (
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                  {stat.value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Chart */}
        <Box sx={{ height, position: 'relative' }}>
          {loading ? (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: 2 }}
              />
            </Box>
          ) : data.length > 0 ? (
            <ChartComponent data={chartData} options={options} />
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
      </CardContent>
    </Card>
  );
};

export default LeadsChart;
