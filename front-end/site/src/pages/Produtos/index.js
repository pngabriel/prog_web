import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { FiEdit, FiTrash2, FiEye, FiSearch, FiPlus } from "react-icons/fi";
import styles from './Produtos.module.css';
import productService from '../../services/product';

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    
    // buscar produtos
    useEffect(() => {
        fetchProdutos();
    }, []);
    
    const fetchProdutos = async () => {
        try {
            const dados = await productService.getProdutos();
            setProdutos(dados);
        } catch (error) {
            console.log("Erro ao buscar produtos:", error);
            mostrarNotificacao("Erro ao carregar produtos. Tente novamente.", "error");
        }
    };
    
    // Estado para filtros
    const [busca, setBusca] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("");
    const [statusFiltro, setStatusFiltro] = useState("");
    
    // Estado para o modal
    const [modalVisivel, setModalVisivel] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState(null);
    
    // Estado para formulário de produto
    const [nomeProduto, setNomeProduto] = useState("");
    const [categoriaProduto, setCategoriaProduto] = useState("");
    const [precoProduto, setPrecoProduto] = useState("");
    const [estoqueProduto, setEstoqueProduto] = useState("");
    const [statusProduto, setStatusProduto] = useState("Ativo");
    const [descricaoProduto, setDescricaoProduto] = useState("");
    
    // Estado para mensagens de notificação
    const [notificacao, setNotificacao] = useState({ visivel: false, mensagem: "", tipo: "" });
    
    // Obter todas as categorias únicas
    const categorias = [...new Set(produtos.map(p => p.category))];
    
    // Obter todos os status únicos
    const statusOpcoes = [...new Set(produtos.map(p => p.status))];
    
    // Filtrar produtos
    const produtosFiltrados = produtos.filter(produto => {
        if (produto) {
            // Filtro de busca
            const matchBusca = produto.name.toLowerCase().includes(busca.toLowerCase()) || 
                                produto.category.toLowerCase().includes(busca.toLowerCase());
    
            // Filtro de categoria
            const matchCategoria = categoriaFiltro === "" || produto.category === categoriaFiltro;
    
            // Filtro de status
            const matchStatus = statusFiltro === "" || produto.status === statusFiltro;
    
            return matchBusca && matchCategoria && matchStatus;
        }
        return false;
    });
    
    // Abrir modal para edição ou criação
    const handleEditarProduto = (produto) => {
        setProdutoEditando(produto);
        if (produto) {
            setNomeProduto(produto.name);
            setCategoriaProduto(produto.category);
            setPrecoProduto(produto.salePrice.toString());
            setEstoqueProduto(produto.stock.toString());
            setStatusProduto(productService.convertFromProductStatus(produto.status));
            setDescricaoProduto(produto.stock.toString());
        } else {
            setNomeProduto("");
            setCategoriaProduto("");
            setPrecoProduto("");
            setEstoqueProduto("");
            setStatusProduto("Ativo");
            setDescricaoProduto("");
        }
        setModalVisivel(true);
    };
    
    // Fechar modal
    const fecharModal = () => {
        setModalVisivel(false);
    };
    
    // Remover produto
    const handleRemoverProduto = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await productService.excluirProduto(id);
                setProdutos(produtos.filter(p => p.id !== id));
                mostrarNotificacao("Produto removido com sucesso!", "success");
            } catch (error) {
                console.error("Erro ao remover produto:", error);
                mostrarNotificacao("Erro ao remover produto. Tente novamente.", "error");
            }
        }
    };
    
    // Salvar produto (novo ou editado)
    const handleSalvarProduto = async (e) => {
        e.preventDefault();
    
        if (!nomeProduto || !categoriaProduto || !precoProduto || !estoqueProduto) {
            mostrarNotificacao("Por favor, preencha todos os campos obrigatórios", "error");
            return;
        }
    
        try {
            const precoNum = parseFloat(precoProduto);
            const estoqueNum = parseInt(estoqueProduto);
    
            if (isNaN(precoNum) || isNaN(estoqueNum)) {
                throw new Error("Valores inválidos");
            }
    
            const novoProduto = {
                id: produtoEditando?.id,
                name: nomeProduto,
                category: categoriaProduto,
                salePrice: precoNum,
                stock: estoqueNum,
                status: statusProduto,
                description: descricaoProduto,
            };
    
            const produtoSalvo = await productService.salvarProduto(novoProduto);
    
            if (produtoEditando) {
                setProdutos(produtos.map(p => p.id === produtoEditando.id ? produtoSalvo : p));
            } else {
                setProdutos([...produtos, produtoSalvo]);
            }
    
            mostrarNotificacao(
                produtoEditando ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!",
                "success"
            );
    
            setProdutoEditando(null);
            setModalVisivel(false);
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            mostrarNotificacao("Erro ao salvar o produto. Verifique os valores inseridos.", "error");
        }
    };
    
    // Função para mostrar notificações
    const mostrarNotificacao = (mensagem, tipo) => {
        setNotificacao({ visivel: true, mensagem, tipo });
        setTimeout(() => {
            setNotificacao({ visivel: false, mensagem: "", tipo: "" });
        }, 3000);
    };
    
    return (
        <div className={styles.produtosContainer}>
            <Header />
        
            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <h1>Controle de Produtos</h1>
                    <button className={styles.btnAdicionar} onClick={() => handleEditarProduto(null)}>
                        <FiPlus /> Novo Produto
                    </button>
                </div>
                
                {/* Filtros */}
                <div className={styles.filtrosContainer}>
                    <div className={styles.buscaContainer}>
                        <FiSearch className={styles.searchIcon} />
                        <input 
                            type="text" 
                            placeholder="Buscar produtos..." 
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className={styles.inputBusca}
                        />
                    </div>
                    
                    <div className={styles.selectContainer}>
                        <select 
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                            className={styles.selectFiltro}
                        >
                            <option value="">Todas as categorias</option>
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className={styles.selectContainer}>
                        <select 
                            value={statusFiltro}
                            onChange={(e) => setStatusFiltro(e.target.value)}
                            className={styles.selectFiltro}
                        >
                            <option value="">Todos os status</option>
                            {statusOpcoes.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Lista de Produtos */}
                <div className={styles.produtosGrid}>
                    {produtosFiltrados.length > 0 ? (
                        produtosFiltrados.map(produto => (
                            <div key={produto.id} className={styles.produtoCard}>
                                <div className={styles.produtoInfo}>
                                    <h3>{produto.name}</h3>
                                    <div className={styles.categoriaContainer}>
                                        <span className={styles.categoriaTag}>{produto.category}</span>
                                        <span className={`${styles.statusTag} ${styles[produto.status.replace(/\s+/g, '')]}`}>
                                            {produto.status}
                                        </span>
                                    </div>
                                    <div className={styles.produtoDetalhes}>
                                        <p className={styles.salePrice}>R$ {produto.salePrice.toFixed(2)}</p>
                                        <p className={`${styles.estoque} ${produto.stock <= 5 ? styles.estoqueAlerta : ''}`}>
                                            Estoque: {produto.stock} unidades
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.produtoAcoes}>
                                    <button 
                                        className={`${styles.btnAcao} ${styles.btnEditar}`}
                                        onClick={() => handleEditarProduto(produto)}
                                    >
                                        <FiEdit />
                                    </button>
                                    <button 
                                        className={`${styles.btnAcao} ${styles.btnRemover}`}
                                        onClick={() => handleRemoverProduto(produto.id)}
                                    >
                                        <FiTrash2 />
                                    </button>
                                    <button 
                                        className={`${styles.btnAcao} ${styles.btnVisualizar}`}
                                        onClick={() => window.location.href = `/produtos/${produto.id}`}
                                    >
                                        <FiEye />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.semProdutos}>
                            <p>Nenhum produto encontrado</p>
                        </div>
                    )}
                </div>
                {/* <div className={styles.produtosGrid}>
                        {produtosFiltrados.length > 0 ? (
                            produtosFiltrados.map(produto => (
                            <div key={produto.id} className={styles.produtoCard}>
                                <div className={styles.produtoInfo}>
                                    <h3>{produto.nome}</h3>
                                    <div className={styles.categoriaContainer}>
                                        <span className={styles.categoriaTag}>{produto.categoria}</span>
                                        <span className={`${styles.statusTag} ${styles[produto.status.replace(/\s+/g, '')]}`}>
                                            {produto.status}
                                        </span>
                                    </div>
                                    <div className={styles.produtoDetalhes}>
                                        <p className={styles.preco}>R$ {produto.preco.toFixed(2)}</p>
                                        <p className={`${styles.estoque} ${produto.estoque <= 5 ? styles.estoqueAlerta : ''}`}>
                                            Estoque: {produto.estoque} unidades
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.produtoAcoes}>
                                    <button 
                                    className={`${styles.btnAcao} ${styles.btnEditar}`}
                                    onClick={() => handleEditarProduto(produto)}
                                    >
                                    <FiEdit />
                                </button>
                                <button 
                                className={`${styles.btnAcao} ${styles.btnRemover}`}
                                onClick={() => handleRemoverProduto(produto.id)}
                                >
                                <FiTrash2 />
                            </button>
                            <button 
                            className={`${styles.btnAcao} ${styles.btnVisualizar}`}
                            onClick={() => window.location.href = `/produtos/${produto.id}`}
                            >
                            <FiEye />
                        </button>
                    </div>
                </div>
                ))
                ) : (
                <div className={styles.semProdutos}>
                    <p>Nenhum produto encontrado</p>
                </div>
                )}
                </div> */}
            </main>
        
            {/* Modal de Edição/Criação */}
            {modalVisivel && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h2>{produtoEditando ? 'Editar Produto' : 'Novo Produto'}</h2>
                            <button className={styles.btnFechar} onClick={fecharModal}>×</button>
                        </div>
                        <div className={styles.modalContent}>
                            <form onSubmit={handleSalvarProduto}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="nome">Nome do Produto</label>
                                    <input 
                                        type="text" 
                                        id="nome" 
                                        value={nomeProduto}
                                        onChange={(e) => setNomeProduto(e.target.value)}
                                        placeholder="Digite o nome do produto"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="descricao">Descrição do Produto</label>
                                    <input 
                                        type="text" 
                                        id="descricao" 
                                        value={descricaoProduto}
                                        onChange={(e) => setDescricaoProduto(e.target.value)}
                                        placeholder="Digite a descrição do produto"
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="categoria">Categoria</label>
                                    <input 
                                        type="text" 
                                        id="categoria" 
                                        value={categoriaProduto}
                                        onChange={(e) => setCategoriaProduto(e.target.value)}
                                        placeholder="Digite a categoria"
                                        list="categorias-list"
                                    />
                                    <datalist id="categorias-list">
                                        {categorias.map(cat => (
                                            <option key={cat} value={cat} />
                                        ))}
                                    </datalist>
                                </div>
                                
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="preco">Preço (R$)</label>
                                        <input 
                                            type="text" 
                                            id="preco" 
                                            value={precoProduto}
                                            onChange={(e) => setPrecoProduto(e.target.value)}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    
                                    <div className={styles.formGroup}>
                                        <label htmlFor="estoque">Estoque</label>
                                        <input 
                                            type="text" 
                                            id="estoque" 
                                            value={estoqueProduto}
                                            onChange={(e) => setEstoqueProduto(e.target.value)}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="status">Status</label>
                                    <select 
                                        id="status" 
                                        value={statusProduto}
                                        onChange={(e) => setStatusProduto(e.target.value)}
                                    >
                                        <option value="Ativo">Ativo</option>
                                        <option value="Baixo Estoque">Baixo Estoque</option>
                                        <option value="Esgotado">Esgotado</option>
                                        <option value="Inativo">Inativo</option>
                                    </select>
                                </div>
                                
                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.btnCancelar} onClick={fecharModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className={styles.btnSalvar}>
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
                
            {/* Notificação */}
            {notificacao.visivel && (
                <div className={`${styles.notificacao} ${styles[notificacao.tipo]}`}>
                    {notificacao.mensagem}
                </div>
            )}
        </div>
    );
}