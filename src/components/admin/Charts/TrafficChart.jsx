/**
 * TrafficChart Component
 * Multi-line chart for website traffic and conversions
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
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Main TrafficChart Component
 */
const TrafficChart = ({
  visitsData = [],
  leadsData = [],
  conversionsData = [],
  loading = false,
  title = 'Traffic & Conversions',
  subtitle = 'Website performance',
  height = 300,
}) => {
  const theme = useTheme();

  // Format date labels
  const formatLabel = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    // Use leads data for labels if available, otherwise visits
    const primaryData = leadsData.length > 0 ? leadsData : visitsData;
    const labels = primaryData.map((item) => formatLabel(item.date));

    const datasets = [];

    if (visitsData.length > 0) {
      datasets.push({
        label: 'Visits',
        data: visitsData.map((item) => item.count || 0),
        borderColor: '#2196f3',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#2196f3',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      });
    }

    if (leadsData.length > 0) {
      datasets.push({
        label: 'Leads',
        data: leadsData.map((item) => item.count || 0),
        borderColor: '#8B9A46',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, alpha('#8B9A46', 0.3));
          gradient.addColorStop(1, alpha('#8B9A46', 0.02));
          return gradient;
        },
        fill: true,
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#8B9A46',
        pointBorderWidth: 3,
        pointHoverRadius: 7,
      });
    }

    if (conversionsData.length > 0) {
      datasets.push({
        label: 'Conversions',
        data: conversionsData.map((item) => item.count || 0),
        borderColor: '#4caf50',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4caf50',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      });
    }

    return { labels, datasets };
  }, [visitsData, leadsData, conversionsData, height]);

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
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 6,
          useBorderRadius: true,
          padding: 16,
          font: {
            size: 12,
            weight: 500,
          },
          color: theme.palette.text.secondary,
        },
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
            size: 11,
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
            size: 11,
            weight: 500,
          },
          padding: 12,
        },
      },
    },
  }), [theme]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const leadValues = leadsData.map(d => d.count || 0);
    const totalLeads = leadValues.reduce((a, b) => a + b, 0);
    const avgLeads = leadValues.length > 0 ? (totalLeads / leadValues.length).toFixed(1) : 0;
    
    const conversionValues = conversionsData.map(d => d.count || 0);
    const totalConversions = conversionValues.reduce((a, b) => a + b, 0);
    
    const conversionRate = totalLeads > 0 
      ? ((totalConversions / totalLeads) * 100).toFixed(1) 
      : 0;

    return { totalLeads, avgLeads, totalConversions, conversionRate };
  }, [leadsData, conversionsData]);

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
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 2 }}>
        {/* Summary Stats */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            mb: 3,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Total Leads', value: stats.totalLeads, color: '#8B9A46' },
            { label: 'Avg/Day', value: stats.avgLeads, color: '#1a1a2e' },
            { label: 'Conversions', value: stats.totalConversions, color: '#4caf50' },
            { label: 'Conv. Rate', value: stats.conversionRate + '%', color: '#2196f3' },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {stat.label}
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={50} height={28} />
              ) : (
                <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Chart */}
        <Box sx={{ height, position: 'relative' }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: 2 }}
            />
          ) : chartData.datasets.length > 0 ? (
            <Line data={chartData} options={options} />
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

export default TrafficChart;
