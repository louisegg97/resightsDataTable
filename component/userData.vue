<template >
  <div>
    <h1 >User Data</h1>
    <input type="text" 
    placeholder="Search" 
    class="search-input" 
    v-model="searchValue" />
      <p>{{ filteredUsers.length }} users found</p>
    <div>
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
    </div>

    <table >
      <thead >
        <tr>
          <th v-for="column in visibleColumns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id" class="border-b">
          <td v-for="column in visibleColumns" :key="column" class="px-4 py-2">
          {{ column == 'Title' ? user.user.title : column == 'First name' ? user.user.first_name : column == 'Last name' ? user.user.last_name : user[column.toLowerCase().replace(' ', '_')] }}
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button :disabled="currentPage <= 1" @click="currentPage--">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage >= totalPages" @click="currentPage++">Next</button>
    </div>
  </div>
</template>


<script>
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
    pageSize: 15,
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
