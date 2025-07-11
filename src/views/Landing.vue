<template>
  <div class="landing-page">
   
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/Create" class="nav-link">Invoices</router-link>
      <router-link to="/history" class="nav-link">History</router-link>

    </nav>

    
    <div class="header">
      <img src="Invoice_Generator.png" alt="Invoice App Logo" class="logo" />
      <h1>Welcome to the Invoice Generator</h1>
    </div>

    
    <div class="intro-text">
      <p>This is a simple invoice generator application built with Vue.js.
      It allows you to create, edit, and manage invoices easily.
      An invoice, in its most basic form, is a bill or commercial document issued by a seller to a buyer, detailing the products or services provided, the quantities, the agreed-upon prices, and the total amount due. It serves as a formal request for payment and a record of the transaction. Invoices are crucial for businesses to track sales, manage finances, and maintain accurate records. </p>
    </div>


    <img src="Hero.png" alt="Hero(Gautam-Adani)-Image" class="hero-image" />

  <button  v-on:click="Invoice_Generator">Invoice Generator</button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
 mounted(){
    document.title = 'Invoice Generator - Landing'
  },
  methods: {
    Invoice_Generator() {
      this.$router.push('/Create');
    }
  },
}
</script>

<style scoped>

.landing-page {
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
}


.navbar {
  display: flex;
  justify-content: center;
  background-color: #2c3e50;
  padding: 1rem;
  gap: 2rem;
   transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #00ffc8;
  transform: translateY(-2px);
}


.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
  text-align: center;
  
  justify-content: center;
}

.logo {
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  color: #333;
}


.intro-text {
  max-width: 600px;
  margin: 2rem auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  text-align: center;
}


.hero-image {
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  display: block;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin: 1.5rem auto;
  display: block;
  text-align: center;
}
button:hover {
  background-color: #38a169;
  color:black;
}
.landing-page {
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  animation: zoomIn 1s ease-in-out forwards;
}


.logo {
  width: 100px;
  height: auto;
}


h1 {
  font-size: 2rem;
  color: black;
  font-weight: 700;
  animation: textPopUp 1s ease-out 0.5s both;
}
@keyframes zoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes textPopUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@media (max-width:500px) {
  .header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .logo {
    width: 120px;
    height: auto;
  }

  h1 {
    font-size: 1.5rem;
  }

  .intro-text {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .hero-image {
    max-width: 90%;
  }

  .navbar {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  button {
    width: 90%;
    font-size: 1rem;
  }
}

</style>
