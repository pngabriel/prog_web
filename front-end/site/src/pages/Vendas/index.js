import React, { useState, useEffect } from "react";
import styles from "./Vendas.module.css";
import Header from "../../components/Header";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("data");
  const [modalAberto, setModalAberto] = useState(false);
  const [novaVenda, setNovaVenda] = useState({
    cliente: "",
    valor: "",
    produtos: [],
    status: "pendente",
    data: new Date().toISOString().split('T')[0]
  });
  const [animacaoPulse, setAnimacaoPulse] = useState(false);

  // Dados de exemplo para simulação
  useEffect(() => {
    const dadosSimulados = [
      {
        id: 1,
        cliente: "Empresa ABC",
        valor: 1250.00,
        produtos: ["Produto A", "Produto B"],
        status: "concluída",
        data: "2025-04-15"
      },
      {
        id: 2,
        cliente: "Loja XYZ",
        valor: 3780.50,
        produtos: ["Produto C", "Produto D", "Produto E"],
        status: "pendente",
        data: "2025-04-18"
      },
      {
        id: 3,
        cliente: "Distribuidora 123",
        valor: 5200.00,
        produtos: ["Produto F"],
        status: "em processamento",
        data: "2025-04-20"
      },
      {
        id: 4,
        cliente: "Mercado Central",
        valor: 950.75,
        produtos: ["Produto A", "Produto G"],
        status: "concluída",
        data: "2025-04-10"
      }
    ];
    setVendas(dadosSimulados);
    
    // Efeito de carregamento com animação
    const timer = setTimeout(() => {
      setAnimacaoPulse(true);
      setTimeout(() => setAnimacaoPulse(false), 2000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filtrar vendas
  const vendasFiltradas = vendas.filter(venda => 
    venda.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    venda.status.toLowerCase().includes(filtro.toLowerCase()) ||
    venda.produtos.some(produto => produto.toLowerCase().includes(filtro.toLowerCase()))
  );

  // Ordenar vendas
  const vendasOrdenadas = [...vendasFiltradas].sort((a, b) => {
    if (ordenacao === "data") {
      return new Date(b.data) - new Date(a.data);
    } else if (ordenacao === "valor") {
      return b.valor - a.valor;
    } else if (ordenacao === "cliente") {
      return a.cliente.localeCompare(b.cliente);
    }
    return 0;
  });

  // Formatar valor como moeda brasileira
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Manipular abertura do modal
  const abrirModal = () => {
    setModalAberto(true);
  };

  // Manipular fechamento do modal
  const fecharModal = () => {
    setModalAberto(false);
    setNovaVenda({
      cliente: "",
      valor: "",
      produtos: [],
      status: "pendente",
      data: new Date().toISOString().split('T')[0]
    });
  };

  // Manipular mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaVenda({
      ...novaVenda,
      [name]: value
    });
  };

  // Manipular adição de produtos
  const handleProdutoChange = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      
      // Verificar se o produto já existe
      if (novaVenda.produtos.includes(e.target.value.trim())) {
        alert("Este produto já foi adicionado!");
        return;
      }
      
      setNovaVenda({
        ...novaVenda,
        produtos: [...novaVenda.produtos, e.target.value.trim()]
      });
      e.target.value = '';
    }
  };

  // Remover produto
  const removerProduto = (index) => {
    const novosProdutos = [...novaVenda.produtos];
    novosProdutos.splice(index, 1);
    setNovaVenda({
      ...novaVenda,
      produtos: novosProdutos
    });
  };

  // Salvar nova venda
  const salvarVenda = (e) => {
    e.preventDefault();
    
    // Validar entradas
    if (!novaVenda.cliente || !novaVenda.valor || novaVenda.produtos.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    const valorNumerico = parseFloat(novaVenda.valor.replace(',', '.'));
    
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }
    
    const novaVendaCompleta = {
      id: vendas.length + 1,
      ...novaVenda,
      valor: valorNumerico
    };
    
    setVendas([novaVendaCompleta, ...vendas]);
    setAnimacaoPulse(true);
    setTimeout(() => setAnimacaoPulse(false), 2000);
    fecharModal();
  };

  // Status com cores
  const corStatus = {
    'pendente': styles.statusPendente,
    'em processamento': styles.statusProcessamento,
    'concluída': styles.statusConcluida,
    'cancelada': styles.statusCancelada
  };

  return (
    <div className={styles.vendasContainer}>
      <Header />
      
      <div className={styles.mainContent}>
        <div className={styles.toolbarVendas}>
          <h1>Gestão de Vendas</h1>
          
          <div className={styles.filtros}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Buscar por cliente, produto ou status..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <i className={styles.searchIcon}>🔍</i>
            </div>
            
            <select 
              value={ordenacao} 
              onChange={(e) => setOrdenacao(e.target.value)}
              className={styles.ordenacaoSelect}
            >
              <option value="data">Data (mais recente)</option>
              <option value="valor">Valor (maior)</option>
              <option value="cliente">Nome do Cliente</option>
            </select>
            
            <button 
              className={`${styles.botaoNovaVenda} ${animacaoPulse ? styles.animacaoPulse : ''}`} 
              onClick={abrirModal}
            >
              Nova Venda
            </button>
          </div>
        </div>
        
        <div className={`${styles.resumoVendas} ${animacaoPulse ? styles.animacaoPulse : ''}`}>
          <div className={styles.cardResumo}>
            <h3>Total de Vendas</h3>
            <p>{vendas.length}</p>
          </div>
          <div className={styles.cardResumo}>
            <h3>Total de Vendas</h3>
            <p>{vendas.length}</p>
          </div>
          <div className={styles.cardResumo}>
            <h3>Valor Total</h3>
            <p>{formatarMoeda(vendas.reduce((total, venda) => total + venda.valor, 0))}</p>
          </div>
          <div className={styles.cardResumo}>
            <h3>Vendas Pendentes</h3>
            <p>{vendas.filter(venda => venda.status === "pendente").length}</p>
          </div>
        </div>
        
        <div className={styles.vendasLista}>
          <div className={styles.vendasHeader}>
            <span className={styles.vendasHeaderItem}>Cliente</span>
            <span className={styles.vendasHeaderItem}>Data</span>
            <span className={styles.vendasHeaderItem}>Valor</span>
            <span className={styles.vendasHeaderItem}>Produtos</span>
            <span className={styles.vendasHeaderItem}>Status</span>
            <span className={styles.vendasHeaderItem}>Ações</span>
          </div>
          
          {vendasOrdenadas.length > 0 ? (
            vendasOrdenadas.map(venda => (
              <div key={venda.id} className={styles.vendaItem}>
                <span className={styles.vendaCliente} data-label="Cliente:">{venda.cliente}</span>
                <span className={styles.vendaData} data-label="Data:">{new Date(venda.data).toLocaleDateString('pt-BR')}</span>
                <span className={styles.vendaValor} data-label="Valor:">{formatarMoeda(venda.valor)}</span>
                <span className={styles.vendaProdutos} data-label="Produtos:">{venda.produtos.join(", ")}</span>
                <span data-label="Status:">
                  <span className={`${styles.vendaStatus} ${corStatus[venda.status]}`}>
                    {venda.status}
                  </span>
                </span>
                <span className={styles.vendaAcoes} data-label="Ações:">
                  <button className={styles.botaoDetalhes}>Detalhes</button>
                  <button className={styles.botaoEditar}>Editar</button>
                </span>
              </div>
            ))
          ) : (
            <div className={styles.semResultados}>Nenhuma venda encontrada</div>
          )}
        </div>
      </div>
      
      {/* Modal de nova venda */}
      {modalAberto && (
        <div className={styles.modalOverlay} onClick={(e) => {
          if (e.target === e.currentTarget) fecharModal();
        }}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Nova Venda</h2>
              <button className={styles.fecharModal} onClick={fecharModal}>×</button>
            </div>
            
            <form className={styles.formVenda} onSubmit={salvarVenda}>
              <div className={styles.formGroup}>
                <label htmlFor="cliente">Cliente</label>
                <input 
                  type="text" 
                  id="cliente" 
                  name="cliente" 
                  placeholder="Nome do cliente ou empresa" 
                  value={novaVenda.cliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="valor">Valor (R$)</label>
                <input 
                  type="text"
                  id="valor" 
                  name="valor" 
                  placeholder="0,00" 
                  value={novaVenda.valor}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="produtos">Produtos (pressione Enter para adicionar)</label>
                <input 
                  type="text" 
                  id="produtos" 
                  placeholder="Digite o nome do produto" 
                  onKeyDown={handleProdutoChange}
                />
                
                <div className={styles.produtosAdicionados}>
                  {novaVenda.produtos.map((produto, index) => (
                    <div key={index} className={styles.produtoTag}>
                      {produto}
                      <button 
                        type="button" 
                        className={styles.removerProduto}
                        onClick={() => removerProduto(index)}
                      >×</button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select 
                  id="status" 
                  name="status" 
                  value={novaVenda.status}
                  onChange={handleInputChange}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em processamento">Em processamento</option>
                  <option value="concluída">Concluída</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="data">Data</label>
                <input 
                  type="date" 
                  id="data" 
                  name="data" 
                  value={novaVenda.data}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formButtons}>
                <button 
                  type="button" 
                  className={styles.botaoCancelar}
                  onClick={fecharModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className={styles.botaoSalvar}
                >
                  Salvar Venda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className={styles.navegacaoInferior}>
        <a href="#" className={styles.navItem}>Dashboard</a>
        <a href="#" className={styles.navItem}>Clientes</a>
        <a href="#" className={styles.navItem}>Produtos</a>
        <a href="#" className={styles.navItem}>Relatórios</a>
      </div>
    </div>
  );
}