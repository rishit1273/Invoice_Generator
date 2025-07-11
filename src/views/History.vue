<template>
  <div class="history-page">
    <h2>Saved Invoices History</h2>

    <div v-if="invoices.length === 0" class="no-invoices">
      <p>No invoices found. Create one first!</p>
    </div>

    <div v-else>
      <div v-for="(invoice, index) in invoices" :key="index" class="invoice-card">
        <h3>Invoice #{{ index + 1 }}</h3>
        <p><strong>Sender:</strong> {{ invoice.sender }}</p>
        <p><strong>Receiver:</strong> {{ invoice.receiver }}</p>
        <p><strong>Items:</strong> {{ invoice.items.length }}</p>
        <p><strong>Total Before Tax:</strong> ₹{{ invoice.totalBeforeTax }}</p>
        <p><strong>Tax (%):</strong> {{ invoice.tax }}</p>
        <p><strong>Grand Total:</strong> ₹{{ invoice.grandTotal || invoice.total }}</p>

        <router-link :to="`/edit/${index}`">
          <button class="edit-btn">Edit Invoice</button>
          
        </router-link>
          <button class="delete-btn" v-on:click="deleteInvoice(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceHistory',
  data() {
    return {
      invoices: []
    };
  },methods: {
    deleteInvoice(index) {
      if (confirm('Are you sure you want to delete this invoice?')) {
        this.invoices.splice(index, 1);
        localStorage.setItem('invoices', JSON.stringify(this.invoices))
        alert('Invoice deleted successfully!')
        this.$router.push('/history');
      }
    }
  },
  mounted() {
    this.invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    document.title = 'Invoice History';
  }
};
</script>

<style scoped>
html{
  scroll-behavior: smooth;
}
.history-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
}

.invoice-card {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  gap:10px;
  justify-content:space-evenly;
  align-items: center;
}

.invoice-card h3 {
  margin-bottom: 10px;
  color: #4db6ac;
}

.invoice-card p {
  margin: 5px 0;
}

.edit-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.edit-btn:hover {
  background-color: #2e7d32;
}
.no-invoices {
  text-align: center;
  color: #888;
}
.delete-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #e74c3c; 
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
  transform: translateY(-1px);
}

.delete-btn:active {
  transform: scale(0.97);
}

@media (max-width: 500px) {
  .invoice-card {
    flex-direction: column;
    align-items: center;
  }
}
</style>
