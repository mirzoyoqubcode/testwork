<template>
  <div
    class="w-full bg-white border border-gray-200 rounded-lg overflow-hidden"
  >
    <div class="w-full overflow-x-auto relative">
      <table class="w-full border-collapse bg-transparent">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="bg-gray-50 border-b border-gray-200 sticky top-0 z-10"
            >
              <div
                class="flex items-center justify-between px-4 py-3 font-semibold text-gray-900 text-sm uppercase tracking-wider"
              >
                <span class="flex-1">{{ column.label }}</span>
                <div
                  class="text-gray-400 opacity-50 transition-opacity duration-200 hover:opacity-100"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 10l5 5 5-5z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="index"
            class="transition-all duration-200 border-b border-gray-100 hover:bg-gray-50 last:border-b-0"
          >
            <td v-for="column in columns" :key="column.key" class="p-0">
              <div class="px-4 py-3 flex items-center">
                <span
                  class="text-sm font-medium leading-relaxed"
                  :class="getValueClass(column.type)"
                >
                  {{ formatValue(item[column.key], column.type) }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="data.length === 0"
        class="flex flex-col items-center justify-center py-16 px-6 text-center"
      >
        <div class="text-gray-400 mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          No data available
        </h3>
        <p class="text-sm text-gray-500 max-w-full leading-relaxed">
          There are no records to display at the moment.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string;
  label: string;
  type?: "string" | "number" | "date" | "currency" | "boolean";
}

interface Props {
  data: any[];
  columns: Column[];
}

defineProps<Props>();

const formatValue = (value: any, type?: string) => {
  if (value === null || value === undefined) return "-";

  switch (type) {
    case "date":
      return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "currency":
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numValue);
    case "number":
      return new Intl.NumberFormat().format(value);
    case "boolean":
      return value ? "Yes" : "No";
    default:
      return value;
  }
};

const getValueClass = (type?: string) => {
  switch (type) {
    case "currency":
      return "text-black font-semibold font-mono";
    case "number":
      return "text-black font-semibold font-mono";
    case "date":
      return "text-gray-600 text-xs";
    case "boolean":
      return "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider";
    default:
      return "text-gray-900";
  }
};
</script>
