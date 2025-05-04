<template>
  <div class="print-layout" ref="printRef">
    <div class="header">
      <div>
        <img src="../assets/logo-colorido.png" alt="Logo" class="logo" crossorigin="anonymous" />
      </div>

      <div class="header-right">
        <h2 class="title">ORÇAMENTO</h2>
        <p class="subtitle">plotting.com.br</p>
      </div>
    </div>

    <div class="info-section">
      <div class="info-container">
        <div class="info-left">
          <p>Orçamento para:</p>
          <p class="bold">{{ budget.client.name }}</p>
          <p class="bold">{{ budget.client.company }}</p>
        </div>

        <div class="info-right">
          <p>Proposta: #{{ formatService.id(budget.id) }}</p>
          <p>Plotting Soluções Visuais LTDA</p>
          <p>30.912.485/0001-50</p>
          <p>{{ formatService.date(budget.createdAt) }}</p>
        </div>
      </div>
    </div>

    <div class="table-header">
      <table class="table-container">
        <thead>
          <tr>
            <th>Descrição do serviço</th>
            <th>Preço</th>
            <th>Qtde</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="material in budget.materials" :key="material.id">
            <td>{{ material.name }}</td>
            <td>{{ formatService.currency(material.price) }}</td>
            <td>{{ material.quantity }} {{ material.unit }}cm</td>
            <td>{{ formatService.currency(material.total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div class="footer-left">
        <p class="footer-text">Agradecemos o contato.</p>
      </div>

      <div class="footer-right">
        <p>Valor do orçamento • {{ formatService.currency(budget.total) }}</p>
        <p>Descontos • R$ 0,00</p>
        <p class="footer-total">Valor total • {{ formatService.currency(budget.total) }}</p>
      </div>
    </div>

    <div class="signature">
      <div class="signature-line">
        <p>Tercio Cipriano Varão</p>
        <p>097.041.173-01</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PrintLayoutProps, PrintLayoutExpose } from '../interfaces/print'
import { formatService } from '../services/format'

defineProps<PrintLayoutProps>()

const printRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (printRef.value) {
    printRef.value.style.width = '210mm'
    printRef.value.style.margin = '0 auto'
  }
})

defineExpose<PrintLayoutExpose>({
  printRef: () => printRef.value
})
</script>

<style scoped>
.print-layout {
  background: white;
  color: black;
  padding: 0;
  width: 210mm;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  margin-bottom: 20px;
}

.logo {
  height: 64px;
  width: auto;
}

.header-right {
  text-align: right;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  color: #90291c;
}

.subtitle {
  font-size: 14px;
  margin: 0;
  color: #e32021;
}

.info-section {
  background-color: #F07E66;
  padding: 20px 40px;
  width: 100%;
}

.info-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.info-left,
.info-right {
  flex: 1;
}

.info-left p {
  color: white;
  margin: 4px 0;
}

.info-left .bold {
  font-size: 20px;
  font-weight: bold;
}

.info-right {
  text-align: right;
  color: white;
}

.info-right p {
  margin: 4px 0;
}

.bold {
  font-weight: bold;
}

.table-header {
  width: 100%;
}

.table-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  padding: 12px 20px;
  text-align: center;
  color: white;
}

.table-container th {
  font-weight: bold;
  background-color: #FF2A23;
}

.table-container tbody {
  background-color: #8D2A24;
}

.table-container tbody tr {
  border-bottom: 1px solid #ffffff29;
}

.table-container tbody tr:last-child {
  border-bottom: none;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  margin-top: 64px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.footer-right {
  text-align: right;
}

.footer p {
  margin: 8px 0;
}

.footer-text {
  color: #991b1b;
  font-size: 18px;
}

.footer-total {
  color: #991b1b;
  font-size: 18px;
  font-weight: bold;
}

.signature {
  display: flex;
  justify-content: center;
  margin-top: 64px;
  padding: 0 40px 40px;
}

.signature-line {
  width: 300px;
  text-align: center;
  border-top: 1px solid #ccc;
  padding-top: 8px;
}

.signature-line p {
  margin: 4px 0;
}

@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
