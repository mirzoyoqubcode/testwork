<template>
  <div class="p-6 max-w-[1920px] mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-black mb-2">Orders</h1>
      <p class="text-gray-600">
        View and analyze order data with comprehensive filtering
      </p>
    </div>

    <!-- Filters -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-6 bg-white border border-gray-200 rounded-lg"
    >
      <div class="flex flex-col gap-2">
        <label for="dateFrom" class="font-medium text-gray-900 text-sm"
          >Date From</label
        >
        <input
          type="date"
          id="dateFrom"
          v-model="filters.dateFrom"
          @change="loadData"
          class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white text-black"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="dateTo" class="font-medium text-gray-900 text-sm"
          >Date To</label
        >
        <input
          type="date"
          id="dateTo"
          v-model="filters.dateTo"
          @change="loadData"
          class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white text-black"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="warehouse" class="font-medium text-gray-900 text-sm"
          >Warehouse</label
        >
        <select
          id="warehouse"
          v-model="filters.warehouse"
          @change="loadData"
          class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white text-black"
        >
          <option value="">All Warehouses</option>
          <option
            v-for="warehouse in warehouseOptions"
            :key="warehouse"
            :value="warehouse"
          >
            {{ warehouse }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12 text-gray-600">
      Loading orders data...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <!-- Data Display -->
    <div v-else class="space-y-6">
      <!-- Chart -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-black mb-4">Orders by Date</h2>
        <DataChart
          :data="chartData"
          chart-type="line"
          x-field="date"
          y-field="total_amount"
          title="Orders by Date"
          :background-color="'rgba(0, 0, 0, 0.1)'"
          :border-color="'rgba(0, 0, 0, 0.8)'"
        />
      </div>

      <!-- Table -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-black mb-4">Orders Details</h2>
        <DataTable :data="ordersData" :columns="tableColumns" />
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col items-center gap-4 p-6 bg-white border border-gray-200 rounded-lg"
      >
        <div class="text-sm text-gray-600 text-center">
          Showing {{ ordersData.length }} of {{ totalRecords }} records
        </div>

        <button
          @click="loadMore"
          :disabled="loading || currentPage >= totalPages"
          class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          {{
            loading
              ? "Loading..."
              : currentPage >= totalPages
              ? "All Data Loaded"
              : "Load More"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { apiService, type OrderItem } from "../services/api";
import DataChart from "../components/DataChart.vue";
import DataTable from "../components/DataTable.vue";

const ordersData = ref<OrderItem[]>([]);
const loading = ref(false);
const error = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const totalRecords = ref(0);

const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);

const filters = reactive({
  dateFrom: sevenDaysAgo.toISOString().split("T")[0],
  dateTo: today.toISOString().split("T")[0],
  warehouse: "",
  limit: 50,
});

const tableColumns = [
  { key: "g_number", label: "Order Number", type: "string" as const },
  { key: "nm_id", label: "Product ID", type: "number" as const },
  {
    key: "supplier_article",
    label: "Supplier Article",
    type: "string" as const,
  },
  { key: "brand", label: "Brand", type: "string" as const },
  { key: "total_price", label: "Total Price", type: "currency" as const },
  { key: "discount_percent", label: "Discount %", type: "number" as const },
  { key: "warehouse_name", label: "Warehouse", type: "string" as const },
  { key: "oblast", label: "Region", type: "string" as const },
  { key: "date", label: "Date", type: "date" as const },
  { key: "is_cancel", label: "Cancelled", type: "boolean" as const },
];

const warehouseOptions = computed(() => {
  const warehouses = new Set(
    ordersData.value.map((item) => item.warehouse_name)
  );
  return Array.from(warehouses).sort();
});

const chartData = computed(() => {
  let filteredData = ordersData.value;

  if (filters.warehouse) {
    filteredData = filteredData.filter(
      (item) => item.warehouse_name === filters.warehouse
    );
  }

  return filteredData.slice(0, 20).map((item) => ({
    ...item,
    total_amount: parseFloat(item.total_price),
    order_number: item.g_number,
  }));
});

const loadData = async () => {
  loading.value = true;
  error.value = "";
  currentPage.value = 1;

  try {
    const params = {
      ...filters,
      page: currentPage.value,
      limit: Number(filters.limit),
    };

    const response = await apiService.getOrders(params);
    ordersData.value = response.data;
    currentPage.value = response.current_page;
    totalPages.value = response.last_page;
    totalRecords.value = response.total;
  } catch (err) {
    error.value = "Failed to load orders data. Please try again.";
    console.error("Error loading orders:", err);
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  loading.value = true;
  error.value = "";

  try {
    const nextPage = currentPage.value + 1;

    const params = {
      ...filters,
      page: nextPage,
      limit: Number(filters.limit),
    };

    const response = await apiService.getOrders(params);
    ordersData.value = [...ordersData.value, ...response.data];
    currentPage.value = response.current_page;
    totalPages.value = response.last_page;
    totalRecords.value = response.total;
  } catch (err) {
    error.value = "Failed to load more data. Please try again.";
    console.error("Error loading more orders:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>
