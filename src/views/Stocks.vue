<template>
  <div class="p-6 max-w-[1920px] mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-black mb-2">Stocks</h1>
      <p class="text-gray-600">
        View and analyze inventory stock data with comprehensive filtering
      </p>
    </div>

    <!-- Filters -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-6 bg-white border border-gray-200 rounded-lg"
    >
      <div class="flex flex-col gap-2">
        <label for="dateFrom" class="font-medium text-gray-900 text-sm"
          >Date</label
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
        <label for="warehouse" class="font-medium bg-white text-sm"
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

      <div class="flex flex-col gap-2">
        <label for="brand" class="font-medium text-gray-900 text-sm"
          >Brand</label
        >
        <select
          id="brand"
          v-model="filters.brand"
          @change="loadData"
          class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white text-black"
        >
          <option value="">All Brands</option>
          <option v-for="brand in brandOptions" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12 text-gray-600">
      Loading stocks data...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <!-- Data Display -->
    <div v-else class="space-y-6">
      <!-- Chart -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-black mb-4">
          Stock Quantities by Product
        </h2>
        <DataChart
          :data="chartData"
          chart-type="doughnut"
          x-field="product_name"
          y-field="quantity"
          title="Stock Quantities by Product"
          :background-color="'rgba(0, 0, 0, 0.1)'"
          :border-color="'rgba(0, 0, 0, 0.8)'"
        />
      </div>

      <!-- Table -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-black mb-4">Stocks Details</h2>
        <DataTable :data="stocksData" :columns="tableColumns" />
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col items-center gap-4 p-6 bg-white border border-gray-200 rounded-lg"
      >
        <div class="text-sm text-gray-600 text-center">
          Showing {{ stocksData.length }} of {{ totalRecords }} records
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
import { apiService, type StockItem } from "../services/api";
import DataChart from "../components/DataChart.vue";
import DataTable from "../components/DataTable.vue";

const stocksData = ref<StockItem[]>([]);
const loading = ref(false);
const error = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const totalRecords = ref(0);

const filters = reactive({
  dateFrom: new Date().toISOString().split("T")[0], // Today's date
  warehouse: "",
  brand: "",
  limit: 50,
});

const tableColumns = [
  { key: "nm_id", label: "Product ID", type: "number" as const },
  {
    key: "supplier_article",
    label: "Supplier Article",
    type: "string" as const,
  },
  { key: "brand", label: "Brand", type: "string" as const },
  { key: "quantity", label: "Quantity", type: "number" as const },
  { key: "quantity_full", label: "Full Quantity", type: "number" as const },
  { key: "warehouse_name", label: "Warehouse", type: "string" as const },
  { key: "price", label: "Price", type: "string" as const },
  { key: "date", label: "Date", type: "date" as const },
];

const warehouseOptions = computed(() => {
  const warehouses = new Set(
    stocksData.value.map((item) => item.warehouse_name)
  );
  return Array.from(warehouses).sort();
});

const brandOptions = computed(() => {
  const brands = new Set(stocksData.value.map((item) => item.brand));
  return Array.from(brands).sort();
});

const chartData = computed(() => {
  let filteredData = stocksData.value;

  if (filters.warehouse) {
    filteredData = filteredData.filter(
      (item) => item.warehouse_name === filters.warehouse
    );
  }

  if (filters.brand) {
    filteredData = filteredData.filter((item) => item.brand === filters.brand);
  }

  return filteredData.slice(0, 15).map((item) => ({
    ...item,
    product_name: `${item.brand} - ${item.supplier_article}`,
    quantity: item.quantity,
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

    const response = await apiService.getStocks(params);
    stocksData.value = response.data;
    currentPage.value = response.current_page;
    totalPages.value = response.last_page;
    totalRecords.value = response.total;
  } catch (err) {
    error.value = "Failed to load stocks data. Please try again.";
    console.error("Error loading stocks:", err);
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

    const response = await apiService.getStocks(params);
    stocksData.value = [...stocksData.value, ...response.data];
    currentPage.value = response.current_page;
    totalPages.value = response.last_page;
    totalRecords.value = response.total;
  } catch (err) {
    error.value = "Failed to load more data. Please try again.";
    console.error("Error loading more stocks:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>
