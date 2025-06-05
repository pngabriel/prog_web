import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiPlusCircle, FiFilter, FiDownload, FiUpload, FiChevronLeft, FiChevronRight, FiAlertCircle } from "react-icons/fi";
import Header from '../../components/Header';
import productService from '../../services/product';
import styles from "./Estoque.module.css";

export default function Estoque() {
  // Estados para gerenciar os dados e funcionalidades
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: 0,
    salePrice: 0,
    status: 'Ativo',
    fornecedor: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    category: 'todas',
    disponibilidade: 'todos',
    ordenacao: 'nome-asc'
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Obter dados ao carregar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);
      
  const fetchProdutos = async () => {
    setLoadingData(true);
    try {
      const dados = await productService.getProdutos();
      setProdutos(dados);
      setFilteredProdutos(dados);
      setErrorMessage(null);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setErrorMessage("Não foi possível carregar os produtos. Verifique sua conexão ou tente novamente mais tarde.");
    } finally {
      setLoadingData(false);
    }
  };

  // Filtragem e busca de produtos
  useEffect(() => {
    if (!produtos.length) return;
    
    let result = [...produtos];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      result = result.filter(produto => 
        produto.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.fornecedor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar filtro de categoria
    if (filterOptions.category !== 'todas') {
      result = result.filter(produto => produto.category === filterOptions.category);
    }
    
    // Aplicar filtro de disponibilidade
    if (filterOptions.disponibilidade !== 'todos') {
      result = result.filter(produto => produto.status === filterOptions.disponibilidade);
    }
    
    // Aplicar ordenação
    if (filterOptions.ordenacao === 'nome-asc') {
      result.sort((a, b) => a.name?.localeCompare(b.name || ''));
    } else if (filterOptions.ordenacao === 'nome-desc') {
      result.sort((a, b) => b.name?.localeCompare(a.name || ''));
    } else if (filterOptions.ordenacao === 'preco-asc') {
      result.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0));
    } else if (filterOptions.ordenacao === 'preco-desc') {
      result.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0));
    } else if (filterOptions.ordenacao === 'qtd-asc') {
      result.sort((a, b) => (a.stock || 0) - (b.stock || 0));
    } else if (filterOptions.ordenacao === 'qtd-desc') {
      result.sort((a, b) => (b.stock || 0) - (a.stock || 0));
    }
    
    setFilteredProdutos(result);
  }, [searchTerm, produtos, filterOptions]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value
    });
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      category: '',
      stock: 0,
      salePrice: 0,
      status: 'Ativo',
      fornecedor: ''
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (produto) => {
    setCurrentProduto(produto);
    setFormData({
      id: produto.id,
      name: produto.name || '',
      category: produto.category || '',
      stock: produto.stock || 0,
      salePrice: produto.salePrice || 0,
      status: produto.status || 'Ativo',
      fornecedor: produto.fornecedor || ''
    });
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentProduto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'stock' || name === 'salePrice' ? parseFloat(value) : value
    });
  };

  const handleSaveProduct = async () => {
    try {
      await productService.salvarProduto(formData);
      closeModals();
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar o produto. Tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productService.excluirProduto(id);
        fetchProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir o produto. Tente novamente.");
      }
    }
  };

  // Função para obter a classe de status baseada no status do produto
  const getStatusClass = (status) => {
    switch (status) {
      case 'Ativo':
        return styles.status_in_stock;
      case 'Baixo Estoque':
        return styles.status_low_stock;
      case 'Esgotado':
        return styles.status_unavailable;
      case 'Inativo':
        return styles.status_unavailable;
      default:
        return styles.status_default;
    }
  };

  // Componente do Modal de Adição/Edição
  const ProductModal = ({ isEdit }) => (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>
        <h2 className={styles.modal_title}>
          {isEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}
        </h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Nome do Produto</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.form_input} 
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Categoria</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={styles.form_input}
              required
            />
          </div>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label className={styles.form_label}>Quantidade</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={styles.form_input} 
                min="0"
                required
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label}>Preço Unitário</label>
              <input 
                type="number" 
                step="0.01"
                name="salePrice" 
                value={formData.salePrice}
                onChange={handleInputChange}
                className={styles.form_input} 
                min="0"
                required
              />
            </div>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Fornecedor</label>
            <input 
              type="text" 
              name="fornecedor"
              value={formData.fornecedor}
              onChange={handleInputChange}
              className={styles.form_input} 
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.form_select}
            >
              <option value="Ativo">Ativo</option>
              <option value="Baixo Estoque">Baixo Estoque</option>
              <option value="Esgotado">Esgotado</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className={styles.modal_actions}>
            <button 
              type="button" 
              onClick={closeModals}
              className={styles.button_cancel}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              onClick={handleSaveProduct}
              className={styles.button_save}
            >
              {isEdit ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <Header/>
      
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          <div className={styles.card}>
            {/* Cabeçalho e controles */}
            <div className={styles.header}>
              <h1 className={styles.title}>Gerenciamento de Estoque</h1>
              
              <div className={styles.controls}>
                {/* Barra de pesquisa */}
                <div className={styles.search_container}>
                  <div className={styles.search_icon}>
                    <FiSearch size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.search_input}
                  />
                </div>
                
                {/* Botões de ação */}
                <div className={styles.action_buttons}>
                  <button 
                    onClick={toggleFilterMenu}
                    className={styles.button_filter}
                  >
                    <FiFilter size={18} className={styles.icon} /> Filtros
                  </button>
                  <button 
                    onClick={openAddModal}
                    className={styles.button_add}
                  >
                    <FiPlusCircle size={18} className={styles.icon} /> Novo Produto
                  </button>
                </div>
              </div>
            </div>
            
            {/* Menu de Filtros */}
            {isFilterMenuOpen && (
              <div className={styles.filter_menu}>
                <h3 className={styles.filter_title}>Filtros e Ordenação</h3>
                <div className={styles.filter_grid}>
                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>Categoria</label>
                    <select 
                      name="category" 
                      value={filterOptions.category}
                      onChange={handleFilterChange}
                      className={styles.filter_select}
                    >
                      <option value="todas">Todas as categorias</option>
                      {/* Extrair categorias únicas dos produtos */}
                      {[...new Set(produtos.map(p => p.category))].filter(Boolean).map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>Disponibilidade</label>
                    <select 
                      name="disponibilidade" 
                      value={filterOptions.disponibilidade}
                      onChange={handleFilterChange}
                      className={styles.filter_select}
                    >
                      <option value="todos">Todos os status</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Baixo Estoque">Baixo Estoque</option>
                      <option value="Esgotado">Esgotado</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                  <div className={styles.filter_group}>
                    <label className={styles.filter_label}>Ordenar por</label>
                    <select 
                      name="ordenacao" 
                      value={filterOptions.ordenacao}
                      onChange={handleFilterChange}
                      className={styles.filter_select}
                    >
                      <option value="nome-asc">Nome (A-Z)</option>
                      <option value="nome-desc">Nome (Z-A)</option>
                      <option value="preco-asc">Preço (Menor-Maior)</option>
                      <option value="preco-desc">Preço (Maior-Menor)</option>
                      <option value="qtd-asc">Quantidade (Menor-Maior)</option>
                      <option value="qtd-desc">Quantidade (Maior-Menor)</option>
                    </select>
                  </div>
                </div>
                <div className={styles.export_actions}>
                  <button className={styles.button_export}>
                    <FiDownload size={16} className={styles.icon} /> Exportar
                  </button>
                  <button className={styles.button_import}>
                    <FiUpload size={16} className={styles.icon} /> Importar
                  </button>
                </div>
              </div>
            )}
            
            {/* Estado de carregamento */}
            {loadingData && (
              <div className={styles.loading_state}>
                <div className={styles.loading_spinner}></div>
                <p>Carregando produtos...</p>
              </div>
            )}

            {/* Mensagem de erro */}
            {errorMessage && !loadingData && (
              <div className={styles.error_message}>
                <FiAlertCircle size={24} />
                <p>{errorMessage}</p>
                <button onClick={fetchProdutos} className={styles.button_retry}>
                  Tentar novamente
                </button>
              </div>
            )}
            
            {/* Tabela de Produtos */}
            {!loadingData && !errorMessage && (
              <div className={styles.table_container}>
                <table className={styles.table}>
                  <thead className={styles.table_head}>
                    <tr>
                      <th className={styles.table_header}>Produto</th>
                      <th className={styles.table_header}>Categoria</th>
                      <th className={styles.table_header}>Quantidade</th>
                      <th className={styles.table_header}>Preço Unit.</th>
                      <th className={styles.table_header}>Status</th>
                      <th className={styles.table_header}>Fornecedor</th>
                      <th className={`${styles.table_header} ${styles.actions_header}`}>Ações</th>
                    </tr>
                  </thead>
                  <tbody className={styles.table_body}>
                    {filteredProdutos.length > 0 ? (
                      filteredProdutos.map((produto) => (
                        <tr key={produto.id} className={styles.table_row}>
                          <td className={styles.table_cell}>
                            <div className={styles.product_name}>{produto.name}</div>
                          </td>
                          <td className={styles.table_cell}>
                            <div className={styles.category}>{produto.category}</div>
                          </td>
                          <td className={styles.table_cell}>
                            <div className={styles.quantity}>{produto.stock}</div>
                          </td>
                          <td className={styles.table_cell}>
                            <div className={styles.price}>
                              {produto.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                          </td>
                          <td className={styles.table_cell}>
                            <span className={`${styles.status_badge} ${getStatusClass(produto.status)}`}>
                              {produto.status}
                            </span>
                          </td>
                          <td className={styles.table_cell}>
                            <div className={styles.supplier}>{produto.fornecedor}</div>
                          </td>
                          <td className={`${styles.table_cell} ${styles.actions_cell}`}>
                            <div className={styles.row_actions}>
                              <button 
                                onClick={() => openEditModal(produto)}
                                className={styles.action_edit}
                                title="Editar"
                              >
                                <FiEdit size={20} />
                              </button>
                              <button 
                                onClick={() => handleDelete(produto.id)}
                                className={styles.action_delete}
                                title="Excluir"
                              >
                                <FiTrash2 size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className={styles.empty_message}>
                          {searchTerm ? 
                            "Nenhum produto encontrado com os filtros aplicados" : 
                            "Nenhum produto cadastrado ainda"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Paginação */}
            {!loadingData && !errorMessage && filteredProdutos.length > 0 && (
              <div className={styles.pagination_container}>
                <div className={styles.pagination_mobile}>
                  <a href="#" className={styles.pagination_mobile_prev}>Anterior</a>
                  <a href="#" className={styles.pagination_mobile_next}>Próximo</a>
                </div>
                <div className={styles.pagination_desktop}>
                  <div className={styles.pagination_info}>
                    <p>
                      Mostrando <span className={styles.bold}>1</span> a <span className={styles.bold}>{filteredProdutos.length}</span> de <span className={styles.bold}>{filteredProdutos.length}</span> resultados
                    </p>
                  </div>
                  <div className={styles.pagination}>
                    <a href="#" className={styles.pagination_prev}>
                      <span className={styles.sr_only}>Anterior</span>
                      <FiChevronLeft size={18} aria-hidden="true" />
                    </a>
                    <a href="#" className={styles.pagination_active}>1</a>
                    <a href="#" className={styles.pagination_next}>
                      <span className={styles.sr_only}>Próximo</span>
                      <FiChevronRight size={18} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modais */}
      {isAddModalOpen && <ProductModal isEdit={false} />}
      {isEditModalOpen && <ProductModal isEdit={true} />}
    </div>
  );
}