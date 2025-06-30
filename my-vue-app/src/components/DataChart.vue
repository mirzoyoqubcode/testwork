<template>
  <div
    class="relative h-96 w-full max-w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6 mb-8"
  >
    <canvas ref="chartCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";

interface Props {
  data: any[];
  chartType: "line" | "bar" | "pie" | "doughnut";
  xField: string;
  yField: string;
  title?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  chartType: "bar",
  backgroundColor: "white",
  borderColor: "white",
});

const chartCanvas = ref<HTMLCanvasElement>();
let chart: Chart | null = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext("2d");
  if (!ctx) return;

  const labels = props.data.map((item) => item[props.xField]);
  const values = props.data.map((item) => item[props.yField]);

  const config: ChartConfiguration = {
    type: props.chartType,
    data: {
      labels,
      datasets: [
        {
          label: props.title || "Data",
          data: values,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderWidth: 1,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          labels: {
            color: "#1f2937",
            font: {
              family: "Inter, sans-serif",
            },
          },
        },
        title: {
          display: !!props.title,
          text: props.title,
          color: "#1f2937",
          font: {
            family: "Inter, sans-serif",
            size: 16,
            weight: 600,
          },
        },
      },
      scales:
        props.chartType !== "pie" && props.chartType !== "doughnut"
          ? {
              x: {
                ticks: {
                  color: "#6b7280",
                  font: {
                    family: "Inter, sans-serif",
                  },
                },
                grid: {
                  color: "#e5e7eb",
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "#6b7280",
                  font: {
                    family: "Inter, sans-serif",
                  },
                },
                grid: {
                  color: "#e5e7eb",
                },
              },
            }
          : undefined,
    },
  };

  chart = new Chart(ctx, config);
};

const destroyChart = () => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
};

onMounted(() => {
  createChart();
});

onUnmounted(() => {
  destroyChart();
});

watch(
  () => props.data,
  () => {
    destroyChart();
    createChart();
  },
  { deep: true }
);
</script>
