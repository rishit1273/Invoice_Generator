<template>
  <div class="invoice-form">
    <h2>Create New Invoice</h2>

    <div class="section sender">
      <label>Name (Sender)</label>
      <input v-model="sender" type="text" placeholder="Your Business Name" />
    </div>

    <div class="section receiver">
      <label>Name (Receiver)</label>
      <input v-model="receiver" type="text" placeholder="Client Name" />
    </div>

    <div class="section items">
      <h3>Invoice Items</h3>
      <div class="item-row label-row">
    <span class="item-label">Item Name</span>
    <span class="item-label">Quantity</span>
    <span class="item-label">Price</span>
  </div>
      <div class="item-row" v-for="(item, index) in items" :key="index">
        <input v-model="item.name" type="text" placeholder="Item Name" />
        <input v-model.number="item.quantity" type="number" placeholder="Quantity" />
        <input v-model.number="item.price" type="number" placeholder="Price" />
        <button @click="RemoveItem(index)">-</button>
      </div>
      <button @click="Additem">Add Item</button>
    </div>

    <div class="section tax">
      <label>Tax (%)</label>
      <input v-model="tax" type="number" placeholder="e.g., 18" />
    </div>

    <div class="section total">
      <h3>Total Before Tax: ₹{{ TotalBeforeTax }}</h3>
      <h3>Grand Total: ₹{{ GrandTotal }}</h3>
    </div>

    <div class="Save">
      <button class="save-btn" v-on:click="SaveInvoice">Save Invoice</button>
    </div>
  

  </div>
</template>

<script>
export default {
  name: 'CreateInvoice',
  data() {
    return {
      sender: '',
      receiver: '',
      items: [{ name: '', quantity: 1, price: 0 }],
      tax: 0
    };
  },
  computed: {
    TotalBeforeTax() {
      return this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    },
    GrandTotal() {
      return this.TotalBeforeTax + (this.TotalBeforeTax * this.tax / 100);
    }
  },
  methods: {
    Additem() {
      this.items.push({ name: '', quantity: 1, price: 0 });
    },
    RemoveItem(index) {
      this.items.splice(index, 1);
    },
    SaveInvoice() {
 
  if (!this.sender || !this.receiver) {
    alert('Please fill in both sender and receiver names.');
    return;
  }


  for (const item of this.items) {
    if (!item.name || item.quantity <= 0 || item.price <= 0) {
      alert('Please fill in all item fields with valid values.');
      return;
    }
  }

 
  const invoice = {
    sender: this.sender,
    receiver: this.receiver,
    items: this.items,
    tax: this.tax,
    totalBeforeTax: this.TotalBeforeTax,
    grandTotal: this.GrandTotal
  };

  const existing = JSON.parse(localStorage.getItem('invoices')) || [];
  existing.push(invoice);
  localStorage.setItem('invoices', JSON.stringify(existing));
  alert('Invoice saved successfully!');
  this.$router.push('/history');
}

  }
};
</script>

<style scoped>
html{
  scroll-behavior: smooth;
}
.invoice-form {
 max-width: 600px;
  margin: 40px auto;
  padding: 32px;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #F2F2F2, #bdc3c7); ;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
}

h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 24px;
  color: black;
}

h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #00796b;
}

.section {
  margin-bottom: 24px;
}

.section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #4db6ac;
  outline: none;
}

.item-row,
.label-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.label-row {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content:space-evenly;
  font-weight: bold;
  font-size: 16px;
  gap: 25px;
}

.item-row input {
  width: 140px;
}

button {
  
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #4db6ac;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #00796b;
}

.save-btn {
  display: block;
  margin: 16px auto;
  width: fit-content;
}

.section.total {
  text-align: center;
  font-size: 18px;
}

.section.tax input {
  width: 100px;
  margin-top: 8px;
}
@media (max-width: 768px) and (min-width:425px) {
  .label-row,
  .item-row {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    text-align: center;
  }

  .label-row span,
  .item-row input {
    flex: 1;
    min-width: 30px;
  }

  .item-row input {
    padding: 8px;
    font-size: 14px;
  }

  .section.tax input,
  .save-btn,
  button {
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
  }

  .invoice-form {
    padding: 12px;
    margin: 12px;
  }
  .sender,.receiver{
    width: 75%;
  }
  .tax{
    width: 75%;
  }
}

</style>
