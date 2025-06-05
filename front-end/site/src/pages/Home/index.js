import React from "react";
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, TrendingUp, Package, Users, AlertCircle, DollarSign, ShoppingCart } from 'lucide-react';
import Chart from "react-apexcharts";
import Header from "../../components/Header";
import styles from "./Home.module.css";

export default function Home() {
  const salesData = [
    { name: "Jan", vendas: 35000, lucro: 8750 },
    { name: "Fev", vendas: 48000, lucro: 12000 },
    { name: "Mar", vendas: 32000, lucro: 8000 },
    { name: "Abr", vendas: 55000, lucro: 13750 },
    { name: "Mai", vendas: 78000, lucro: 19500 },
    { name: "Jun", vendas: 92000, lucro: 23000 },
    { name: "Jul", vendas: 124750, lucro: 31187 },
  ];

  const stockData = [
    { name: "Eletrônicos", quantidade: 120, valorEstoque: 35000 },
    { name: "Móveis", quantidade: 85, valorEstoque: 42000 },
    { name: "Roupas", quantidade: 230, valorEstoque: 18500 },
    { name: "Alimentos", quantidade: 310, valorEstoque: 9600 },
    { name: "Cosméticos", quantidade: 150, valorEstoque: 12400 },
  ];

  const pendingOrders = [
    { id: "#123", cliente: "João Silva", valor: "R$ 1.250,00", status: "Em separação", data: "03/04/2025" },
    { id: "#124", cliente: "Maria Oliveira", valor: "R$ 3.420,00", status: "Aguardando pagamento", data: "02/04/2025" },
    { id: "#125", cliente: "Carlos Mendes", valor: "R$ 870,50", status: "Em transporte", data: "01/04/2025" },
    { id: "#126", cliente: "Ana Sousa", valor: "R$ 1.780,00", status: "Em separação", data: "01/04/2025" },
  ];

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "'Poppins', sans-serif",
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      labels: { style: { colors: "#64748b", fontSize: "12px" } },
    },
    yaxis: {
      labels: { 
        style: { colors: "#64748b", fontSize: "12px" },
        formatter: (value) => `R$ ${value.toLocaleString('pt-BR')}` 
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    colors: ["#4B7BF5"],
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `R$ ${value.toLocaleString('pt-BR')}`
      }
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 5,
    }
  };

  const chartSeries = [
    {
      name: "Vendas",
      data: [40000, 30000, 20000, 27800, 18900, 23900],
    },
  ];

  return (
    <div className={styles.dashboard_wrapper}>
      <Header />
      
      <main className={styles.dashboard_content}>
        <div className={styles.dashboard_header}>
          <h1 className={styles.dashboard_title}>Painel de Controle</h1>
          <button className={styles.date_selector}>
            <Calendar size={16} />
            <span>Últimos 30 dias</span>
          </button>
        </div>
        
        {/* Cards de métricas */}
        <div className={styles.metrics_grid}>
          <div className={styles.metric_card}>
            <div className={styles.metric_card_content}>
              <div className={styles.metric_info}>
                <h3 className={styles.metric_label}>Vendas do Mês</h3>
                <p className={styles.metric_value}>R$ 124.750,00</p>
                <div className={`${styles.metric_trend} ${styles.positive}`}>
                  <TrendingUp size={14} />
                  <span>+12% em relação ao mês anterior</span>
                </div>
              </div>
              <div className={`${styles.metric_icon} ${styles.blue}`}>
                <DollarSign size={24} />
              </div>
            </div>
            <div className={styles.metric_chart}>
              <Chart options={chartOptions} series={chartSeries} type="area" height={80} />
            </div>
          </div>
          
          <div className={styles.metric_card}>
            <div className={styles.metric_card_content}>
              <div className={styles.metric_info}>
                <h3 className={styles.metric_label}>Pedidos Pendentes</h3>
                <p className={styles.metric_value}>43</p>
                <div className={`${styles.metric_trend} ${styles.warning}`}>
                  <AlertCircle size={14} />
                  <span>5 aguardando aprovação</span>
                </div>
              </div>
              <div className={`${styles.metric_icon} ${styles.orange}`}>
                <ShoppingCart size={24} />
              </div>
            </div>
          </div>
          
          <div className={styles.metric_card}>
            <div className={styles.metric_card_content}>
              <div className={styles.metric_info}>
                <h3 className={styles.metric_label}>Produtos em Estoque</h3>
                <p className={styles.metric_value}>895</p>
                <div className={`${styles.metric_trend} ${styles.negative}`}>
                  <AlertCircle size={14} />
                  <span>12 abaixo do mínimo</span>
                </div>
              </div>
              <div className={`${styles.metric_icon} ${styles.purple}`}>
                <Package size={24} />
              </div>
            </div>
          </div>
          
          <div className={styles.metric_card}>
            <div className={styles.metric_card_content}>
              <div className={styles.metric_info}>
                <h3 className={styles.metric_label}>Clientes Ativos</h3>
                <p className={styles.metric_value}>238</p>
                <div className={`${styles.metric_trend} ${styles.positive}`}>
                  <TrendingUp size={14} />
                  <span>+15 novos este mês</span>
                </div>
              </div>
              <div className={`${styles.metric_icon} ${styles.teal}`}>
                <Users size={24} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Gráficos */}
        <div className={styles.charts_grid}>
          <div className={styles.chart_card}>
            <div className={styles.chart_header}>
              <h2 className={styles.chart_title}>Vendas & Lucro (Últimos 6 meses)</h2>
            </div>
            <div className={styles.chart_body}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(value) => `R$ ${(value / 1000)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, undefined]}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    name="Vendas" 
                    stroke="#4B7BF5" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lucro" 
                    name="Lucro" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className={styles.chart_card}>
            <div className={styles.chart_header}>
              <h2 className={styles.chart_title}>Estoque por Categoria</h2>
            </div>
            <div className={styles.chart_body}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={stockData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(value) => `R$ ${(value / 1000)}k`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'valorEstoque' ? `R$ ${value.toLocaleString('pt-BR')}` : value,
                      name === 'valorEstoque' ? 'Valor em Estoque' : 'Quantidade'
                    ]}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend 
                    formatter={(value) => value === 'quantidade' ? 'Quantidade' : 'Valor em Estoque'}
                    wrapperStyle={{ paddingTop: 10 }}
                  />
                  <Bar 
                    dataKey="quantidade" 
                    yAxisId="left" 
                    fill="#4B7BF5" 
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="valorEstoque" 
                    yAxisId="right" 
                    fill="#F97316" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Tabela de pedidos */}
        <div className={styles.orders_card}>
          <div className={styles.orders_header}>
            <h2 className={styles.orders_title}>Pedidos Recentes</h2>
            <button className={styles.view_all}>Ver todos</button>
          </div>
          <div className={styles.orders_body}>
            <div className={styles.orders_table_container}>
              <table className={styles.orders_table}>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.map((order) => (
                    <tr key={order.id}>
                      <td className={styles.order_id}>{order.id}</td>
                      <td>{order.cliente}</td>
                      <td>{order.data}</td>
                      <td>{order.valor}</td>
                      <td>
                        <span className={`${styles.status_pill} ${
                          order.status === "Em separação" ? styles.processing :
                          order.status === "Aguardando pagamento" ? styles.pending :
                          styles.shipping
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.view_details}>Ver detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Alertas do sistema */}
        <div className={styles.alerts_card}>
          <div className={styles.alerts_header}>
            <h2 className={styles.alerts_title}>Alertas do Sistema</h2>
          </div>
          <div className={styles.alerts_body}>
            <div className={`${styles.alert} ${styles.danger}`}>
              <div className={styles.alert_icon_wrapper}>
                <AlertCircle size={20} />
              </div>
              <div className={styles.alert_content}>
                <h4 className={styles.alert_heading}>Produtos com estoque crítico (3)</h4>
                <p className={styles.alert_text}>Monitores LED, Notebooks Dell, Cadeiras Ergonômicas</p>
              </div>
            </div>
            
            <div className={`${styles.alert} ${styles.warning}`}>
              <div className={styles.alert_icon_wrapper}>
                <AlertCircle size={20} />
              </div>
              <div className={styles.alert_content}>
                <h4 className={styles.alert_heading}>Contas a pagar próximas do vencimento (5)</h4>
                <p className={styles.alert_text}>Total: R$ 12.450,00 para os próximos 7 dias</p>
              </div>
            </div>
            
            <div className={`${styles.alert} ${styles.success}`}>
              <div className={styles.alert_icon_wrapper}>
                <TrendingUp size={20} />
              </div>
              <div className={styles.alert_content}>
                <h4 className={styles.alert_heading}>Meta de vendas do mês: 85% atingida</h4>
                <p className={styles.alert_text}>Faltam R$ 18.500,00 para atingir a meta mensal</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}