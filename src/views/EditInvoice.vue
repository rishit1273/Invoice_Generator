<template>
  <div class="invoice-form">
    <h2>Edit Invoice</h2>

    <div class="section sender">
      <label>Name(Sender)</label>
      <input type="text" v-model="sender" placeholder="Your Business Name" />
    </div>

    <div class="section reciever">
      <label>Name(Receiver)</label>
      <input type="text" v-model="receiver" placeholder="Client Name" />
    </div>

    <div class="section items">
      <h3>Invoice Items</h3>
      <div class="label-row">
        <label>Item</label>
        <label>Price</label>
        <label>Quantity</label>
      </div>
      <div class="item-row" v-for="(item, index) in items" :key="index">
        <input type="text" v-model="item.name" placeholder="Item Name" />
        <input type="number" v-model.number="item.price" placeholder="Price" />
        <input type="number" v-model.number="item.quantity" placeholder="Quantity" />
        <button @click="removeItem(index)">Remove</button>
      </div>
      <button @click="addItem">Add Item</button>
    </div>

    <div class="section tax">
      <label>Tax %</label>
      <input type="number" v-model.number="tax" placeholder="Tax Percentage" />
    </div>

    <div class="section total">
      <h3>Total (Before Tax): ₹{{ TotalBeforeTax }}</h3>
      <h3>Grand Total: ₹{{ GrandTotal }}</h3>
    </div>

    <div class="Save">
      <button class="save-btn" @click="UpdateInvoice">Save Invoice</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditInvoice',
  data() {
    return {
      sender: '',
      receiver: '',
      items: [{ name: '', price: 0, quantity: 1 }],
      tax: 0,
      invoiceId: null
    };
  },
  computed: {
    TotalBeforeTax() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    GrandTotal() {
      return this.TotalBeforeTax + (this.TotalBeforeTax * this.tax / 100);
    }
  },
  methods: {
    addItem() {
      this.items.push({ name: '', price: 0, quantity: 1 });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    UpdateInvoice() {
      const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
      if (this.invoiceId !== null && invoices[this.invoiceId]) {
        invoices[this.invoiceId] = {
          sender: this.sender,
          receiver: this.receiver,
          items: this.items,
          tax: this.tax,
          totalBeforeTax: this.TotalBeforeTax,
          grandTotal: this.GrandTotal
        };
        localStorage.setItem('invoices', JSON.stringify(invoices));
        alert('Invoice updated successfully!');
        this.$router.push('/history');
      } else {
        alert('No invoice ID found for update.');
      }
    },
    loadInvoice() {
      const id = this.$route.params.id;
      const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
      if (id && invoices[id]) {
        this.invoiceId = id;
        const invoice = invoices[id];
        this.sender = invoice.sender;
        this.receiver = invoice.reciver || invoice.receiver;
        this.items = invoice.items;
        this.tax = invoice.tax;
      } else {
        alert('Invoice not found.');
        this.$router.push('/history');
      }
    }
  },
  mounted() {
    this.loadInvoice();
  }
};
</script>

<style scoped>

html{
  scroll-behavior: smooth;
}
.invoice-form {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #e3f2fd, #f9fbe7);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
  flex-wrap: nowrap;
}


h2 {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #00796b;
}


.section {
  margin-bottom: 24px;
}

.section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}


input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #4db6ac;
  outline: none;
  box-shadow: 0 0 0 3px rgba(77, 182, 172, 0.2);
}


.label-row,
.item-row {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.label-row {
  font-weight: bold;
  font-size: 15px;
}

.item-row input {
  flex: 1;
  width: calc(33% - 16px);
}


button {
  background-color: #4db6ac;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #00796b;
  transform: translateY(-1px);
}

button:active {
  transform: scale(0.98);
}


.Save {
  text-align: center;
}

.save-btn {
  background-color: #42b983;
  padding: 12px 28px;
  font-size: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(66, 185, 131, 0.3);
  margin-top: 24px;
}

.save-btn:hover {
  background-color: #2e7d61;
  box-shadow: 0 6px 18px rgba(46, 125, 97, 0.4);
}


.section.total {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
}
@media (max-width:500px) {
  .item-row {
    flex-wrap: wrap;
  }

  .item-row input {
    flex: 100%;
    margin-bottom: 8px;
  }

  .item-row button {
    width: 100%;
  }

  .label-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
@media (max-width: 500px) {
  .invoice-form {
    padding: 16px;
  }

  h2 {
    font-size: 28px;
  }

  .section label {
    font-size: 14px;
  }

  input {
    font-size: 14px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
  .item-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

</style>
