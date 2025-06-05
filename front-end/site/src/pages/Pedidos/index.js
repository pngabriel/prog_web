import { useState, useEffect } from "react";
import styles from "./Pedidos.module.css";
import Header from "../../components/Header";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Empresa ABC", data: "20/04/2025", valor: 1250.50, status: "Pendente" },
    { id: 2, cliente: "Comércio XYZ", data: "18/04/2025", valor: 3450.00, status: "Aprovado" },
    { id: 3, cliente: "Distribuidora 123", data: "15/04/2025", valor: 890.75, status: "Entregue" },
    { id: 4, cliente: "Indústria Meta", data: "12/04/2025", valor: 5670.20, status: "Cancelado" },
    { id: 5, cliente: "Serviços Tech", data: "10/04/2025", valor: 2340.00, status: "Aprovado" },
  ]);

  const [filtroStatus, setFiltroStatus] = useState("");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [modoVisualizacao, setModoVisualizacao] = useState("tabela"); // tabela ou cards
  const [ordenacao, setOrdenacao] = useState({ campo: "id", direcao: "asc" });
  const [animarLinha, setAnimarLinha] = useState(null);

  const handleDelete = (id) => {
    setPedidoSelecionado(pedidos.find(pedido => pedido.id === id));
    setModalAberto(true);
  };

  const confirmarDelete = () => {
    setPedidos(pedidos.filter(pedido => pedido.id !== pedidoSelecionado.id));
    setModalAberto(false);
    setPedidoSelecionado(null);
    mostrarNotificacao("Pedido excluído com sucesso!");
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPedidoSelecionado(null);
  };

  const [notificacao, setNotificacao] = useState({ visivel: false, mensagem: "" });

  const mostrarNotificacao = (mensagem) => {
    setNotificacao({ visivel: true, mensagem });
    setTimeout(() => {
      setNotificacao({ visivel: false, mensagem: "" });
    }, 3000);
  };

  const ordenarPedidos = (campo) => {
    const novaDirecao = ordenacao.campo === campo && ordenacao.direcao === "asc" ? "desc" : "asc";
    setOrdenacao({ campo, direcao: novaDirecao });
  };

  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    if (ordenacao.campo === "valor") {
      return ordenacao.direcao === "asc" ? a.valor - b.valor : b.valor - a.valor;
    }
    
    const valorA = a[ordenacao.campo].toString().toLowerCase();
    const valorB = b[ordenacao.campo].toString().toLowerCase();
    
    if (ordenacao.direcao === "asc") {
      return valorA.localeCompare(valorB);
    } else {
      return valorB.localeCompare(valorA);
    }
  });

  const pedidosFiltrados = pedidosOrdenados.filter(pedido => {
    return (
      pedido.cliente.toLowerCase().includes(busca.toLowerCase()) &&
      (filtroStatus === "" || pedido.status === filtroStatus)
    );
  });

  // Animação ao excluir um pedido
  useEffect(() => {
    if (animarLinha) {
      const timer = setTimeout(() => {
        setAnimarLinha(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animarLinha]);

  // Função para determinar a classe CSS baseada no status
  const getStatusClass = (status) => {
    switch (status) {
      case "Pendente":
        return styles.statusPendente;
      case "Aprovado":
        return styles.statusAprovado;
      case "Entregue":
        return styles.statusEntregue;
      case "Cancelado":
        return styles.statusCancelado;
      default:
        return "";
    }
  };

  // Função para obter o ícone do status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pendente":
        return "⏳";
      case "Aprovado":
        return "✅";
      case "Entregue":
        return "🚚";
      case "Cancelado":
        return "❌";
      default:
        return "";
    }
  };

  const alternarModoVisualizacao = () => {
    setModoVisualizacao(modoVisualizacao === "tabela" ? "cards" : "tabela");
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.content}>
        <div className={styles.pageHeader}>
          <h1>Gerenciamento de Pedidos</h1>
          <div className={styles.actionButtons}>
            <button 
              className={styles.viewModeButton}
              onClick={alternarModoVisualizacao}
            >
              {modoVisualizacao === "tabela" ? "Ver em Cards" : "Ver em Tabela"}
            </button>
            <button className={styles.addButton}>
              <span className={styles.buttonIcon}>+</span> Novo Pedido
            </button>
          </div>
        </div>

        <div className={styles.dashboard}>
          <div className={styles.dashboardCard}>
            <h3>Total de Pedidos</h3>
            <div className={styles.cardCount}>{pedidos.length}</div>
          </div>
          <div className={styles.dashboardCard}>
            <h3>Pendentes</h3>
            <div className={styles.cardCount + " " + styles.pendingCount}>
              {pedidos.filter(p => p.status === "Pendente").length}
            </div>
          </div>
          <div className={styles.dashboardCard}>
            <h3>Aprovados</h3>
            <div className={styles.cardCount + " " + styles.approvedCount}>
              {pedidos.filter(p => p.status === "Aprovado").length}
            </div>
          </div>
          <div className={styles.dashboardCard}>
            <h3>Cancelados</h3>
            <div className={styles.cardCount + " " + styles.canceledCount}>
              {pedidos.filter(p => p.status === "Cancelado").length}
            </div>
          </div>
        </div>

        <div className={styles.filtros}>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Buscar por cliente..." 
              value={busca} 
              onChange={(e) => setBusca(e.target.value)} 
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              🔍 Buscar
            </button>
          </div>

          <div className={styles.filterBox}>
            <label>Status:</label>
            <select 
              value={filtroStatus} 
              onChange={(e) => setFiltroStatus(e.target.value)}
              className={styles.selectFilter}
            >
              <option value="">Todos</option>
              <option value="Pendente">Pendente</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {pedidosFiltrados.length > 0 ? (
          modoVisualizacao === "tabela" ? (
            <div className={styles.tableContainer}>
              <table className={styles.pedidosTable}>
                <thead>
                  <tr>
                    <th onClick={() => ordenarPedidos("id")} className={styles.thSortable}>
                      ID {ordenacao.campo === "id" && (ordenacao.direcao === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => ordenarPedidos("cliente")} className={styles.thSortable}>
                      Cliente {ordenacao.campo === "cliente" && (ordenacao.direcao === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => ordenarPedidos("data")} className={styles.thSortable}>
                      Data {ordenacao.campo === "data" && (ordenacao.direcao === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => ordenarPedidos("valor")} className={styles.thSortable}>
                      Valor {ordenacao.campo === "valor" && (ordenacao.direcao === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => ordenarPedidos("status")} className={styles.thSortable}>
                      Status {ordenacao.campo === "status" && (ordenacao.direcao === "asc" ? "↑" : "↓")}
                    </th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr 
                      key={pedido.id} 
                      className={animarLinha === pedido.id ? styles.fadeOut : ""}
                      onMouseEnter={() => setAnimarLinha(pedido.id)}
                      onMouseLeave={() => setAnimarLinha(null)}
                    >
                      <td>#{pedido.id}</td>
                      <td>{pedido.cliente}</td>
                      <td>{pedido.data}</td>
                      <td>R$ {pedido.valor.toFixed(2)}</td>
                      <td>
                        <span className={`${styles.status} ${getStatusClass(pedido.status)}`}>
                          {getStatusIcon(pedido.status)} {pedido.status}
                        </span>
                      </td>
                      <td className={styles.acoes}>
                        <button className={styles.viewButton}>
                          👁️ Ver
                        </button>
                        <button className={styles.editButton}>
                          ✏️ Editar
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDelete(pedido.id)}
                        >
                          🗑️ Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.cardsContainer}>
              {pedidosFiltrados.map((pedido) => (
                <div 
                  key={pedido.id} 
                  className={`${styles.pedidoCard} ${animarLinha === pedido.id ? styles.cardHover : ""}`}
                  onMouseEnter={() => setAnimarLinha(pedido.id)}
                  onMouseLeave={() => setAnimarLinha(null)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardId}>#{pedido.id}</div>
                    <span className={`${styles.statusBadge} ${getStatusClass(pedido.status)}`}>
                      {getStatusIcon(pedido.status)} {pedido.status}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{pedido.cliente}</h3>
                    <div className={styles.cardInfo}>
                      <p><strong>Data:</strong> {pedido.data}</p>
                      <p><strong>Valor:</strong> R$ {pedido.valor.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.viewButton}>👁️ Ver</button>
                    <button className={styles.editButton}>✏️ Editar</button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(pedido.id)}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <p>Nenhum pedido encontrado.</p>
            <button className={styles.addButtonEmpty}>Adicionar novo pedido</button>
          </div>
        )}
      </div>

      {/* Modal de Confirmação */}
      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o pedido #{pedidoSelecionado.id} do cliente {pedidoSelecionado.cliente}?</p>
            <div className={styles.modalButtons}>
              <button className={styles.cancelButton} onClick={fecharModal}>Cancelar</button>
              <button className={styles.confirmButton} onClick={confirmarDelete}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Notificação */}
      {notificacao.visivel && (
        <div className={styles.notificacao}>
          {notificacao.mensagem}
        </div>
      )}
    </div>
  );
}