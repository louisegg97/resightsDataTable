<template>
<form class="search-input">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" >Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-blue-500 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-blue-600 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" v-model="searchValue" required>
        
    </div>
    <p class= "text-blue-500 text-xs py-2">{{ filteredUsers.length }} users found</p>
</form>
  
<label>
    <input type="checkbox" v-model="visibleColumns" value="ID">
    ID
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Title">
    Title
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="First name">
   First name
  </label>
    <label>
    <input type="checkbox" v-model="visibleColumns" value="Last name">
   Last name
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Email" >
    Email
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Gender">
    Gender
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="IP_Address">
    IP Address
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Year">
    Year
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Sales">
    Sales
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Country">
    Country
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Currency">
    Currency
  </label>
  <label>
    <input type="checkbox" v-model="visibleColumns" value="Color">
    Color
  </label>

<div class="flex flex-col">
  <div class="overflow-x-auto sm:mx-0.1 lg:mx-0.1">
    <div class="py-2 inline-block min-w-full sm:px-0.1 lg:px-0.1 text-sky-900">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-200 border-b">
          <tr>
            <th v-for="column in visibleColumns" :key="column">{{ column }}</th>
          </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" v-for="user in paginatedUsers" :key="user.id" >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" v-for="column in visibleColumns" :key="column">
              {{ column == 'Title' ? user.user.title : column == 'First name' ? user.user.first_name : column == 'Last name' ? user.user.last_name : user[column.toLowerCase().replace(' ', '_')] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      <div class="inline-flex">
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l text-sky-900" :disabled="currentPage <= 1" @click="currentPage--">Previous</button>
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r text-sky-900" :disabled="currentPage >= totalPages" @click="currentPage++">Next</button>
    </div>
     <div>
      <span class="text-blue-500 text-xs py-2">Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
</template>
<script>
import '@/assets/css/tailwind.css'
import userData from "@/api/sales.js";
    export default {
    data() {
    return {
    searchValue: "",
    userData: userData.results,
    visibleColumns: [
    "ID",
    "Title",
    "First name",
    "Last name",
    "Email",
    "Gender",
    "IP_Address",
    "Year",
    "Sales",
    "Country",
    "Currency",
    "Color",
    ],
    currentPage: 1,
    pageSize: 7,
    };
},
    computed: {
    filteredUsers() {
    if (this.searchValue.trim().length === 0) {
    return this.userData;
    }
    const searchRegex = new RegExp(this.searchValue.trim(), "i");
    return this.userData.filter(
    (user) =>
    searchRegex.test(user.user.title) ||
    searchRegex.test(user.user.first_name) ||
    searchRegex.test(user.user.last_name) ||
    searchRegex.test(user.email) ||
    searchRegex.test(user.gender) ||
    searchRegex.test(user.ip_address) ||
    searchRegex.test(user.country) ||
    searchRegex.test(user.currency) ||
    searchRegex.test(user.color)
    );
    },
    totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredUsers.slice(startIndex, endIndex);
    },
},
};
</script>