<script setup lang="ts">
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col bg-white">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div
        class="max-w-[1720px] mx-auto px-6 flex justify-between items-center h-16"
      >
        <div class="flex items-center gap-3">
          <div class="text-black">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 class="text-xl font-bold text-black">Analytics</h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex gap-1">
          <router-link
            to="/sales"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="currentColor"
              />
            </svg>
            Sales
          </router-link>
          <router-link
            to="/orders"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                fill="currentColor"
              />
            </svg>
            Orders
          </router-link>
          <router-link
            to="/stocks"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"
                fill="currentColor"
              />
            </svg>
            Stocks
          </router-link>
          <router-link
            to="/incomes"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            Incomes
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
          @click="toggleMobileMenu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        class="md:hidden bg-white border-t border-gray-200 px-6 py-4 transform transition-transform duration-300"
        :class="isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'"
      >
        <router-link
          to="/sales"
          class="flex items-center gap-3 p-4 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50 mb-2"
          @click="isMobileMenuOpen = false"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"
            />
          </svg>
          Sales
        </router-link>
        <router-link
          to="/orders"
          class="flex items-center gap-3 p-4 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50 mb-2"
          @click="isMobileMenuOpen = false"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
              fill="currentColor"
            />
          </svg>
          Orders
        </router-link>
        <router-link
          to="/stocks"
          class="flex items-center gap-3 p-4 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50 mb-2"
          @click="isMobileMenuOpen = false"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"
              fill="currentColor"
            />
          </svg>
          Stocks
        </router-link>
        <router-link
          to="/incomes"
          class="flex items-center gap-3 p-4 text-gray-600 font-medium rounded-lg transition-all duration-200 hover:text-black hover:bg-gray-50 mb-2"
          @click="isMobileMenuOpen = false"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor"
            />
          </svg>
          Incomes
        </router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: white;
  color: #1f2937;
  line-height: 1.6;
}
</style>
