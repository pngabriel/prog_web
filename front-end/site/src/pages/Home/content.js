import React from "react";
import Header from "../../components/Header";
import {
  LineChart, BarChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function Home() {
  const salesData = [
    { name: "Jan", vendas: 4000, lucro: 2400 },
    { name: "Fev", vendas: 3000, lucro: 1398 },
    { name: "Mar", vendas: 2000, lucro: 9800 },
    { name: "Abr", vendas: 2780, lucro: 3908 },
    { name: "Mai", vendas: 1890, lucro: 4800 },
    { name: "Jun", vendas: 2390, lucro: 3800 },
  ];

  const stockData = [
    { name: "Eletrônicos", quantidade: 120, valorEstoque: 35000 },
    { name: "Móveis", quantidade: 85, valorEstoque: 42000 },
    { name: "Roupas", quantidade: 230, valorEstoque: 18500 },
    { name: "Alimentos", quantidade: 310, valorEstoque: 9600 },
    { name: "Cosméticos", quantidade: 150, valorEstoque: 12400 },
  ];

  const pendingOrders = [
    { id: "#123", cliente: "João Silva", valor: "R$ 1.250,00", status: "Em separação" },
    { id: "#124", cliente: "Maria Oliveira", valor: "R$ 3.420,00", status: "Aguardando pagamento" },
    { id: "#125", cliente: "Carlos Mendes", valor: "R$ 870,50", status: "Em transporte" },
    { id: "#126", cliente: "Ana Sousa", valor: "R$ 1.780,00", status: "Em separação" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="p-6 md:p-8 lg:p-10 space-y-10">
        <h1 className="text-3xl font-bold">Painel de Controle</h1>

        {/* Gráficos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Vendas & Lucro</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="lucro" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Estoque por Categoria</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="valorEstoque" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Pedidos Recentes */}
        <section className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-4">Pedido</th>
                  <th className="pr-4">Cliente</th>
                  <th className="pr-4">Valor</th>
                  <th className="pr-4">Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 pr-4">{order.id}</td>
                    <td className="pr-4">{order.cliente}</td>
                    <td className="pr-4">{order.valor}</td>
                    <td className="pr-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === "Em separação" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Aguardando pagamento" ? "bg-red-100 text-red-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="text-blue-600 hover:underline text-sm">Ver detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Alertas */}
        <section className="space-y-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <h4 className="font-semibold">Estoque Crítico</h4>
            <p className="text-sm">Monitores LED, Notebooks Dell, Cadeiras Ergonômicas</p>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <h4 className="font-semibold">Contas a pagar próximas do vencimento</h4>
            <p className="text-sm">Total: R$ 12.450,00 para os próximos 7 dias</p>
          </div>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <h4 className="font-semibold">Meta de vendas: 85% atingida</h4>
            <p className="text-sm">Faltam R$ 18.500,00 para atingir a meta mensal</p>
          </div>
        </section>
      </main>
    </div>
  );
}
