import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Clientes.module.css';
import Header from '../../components/Header';
import CustomDataTables from '../../components/CustomDataTables';
import { 
    FaUserPlus, FaSearch, FaEdit, FaTrash, FaEye, 
    FaFileExport, FaTimes, FaExclamationTriangle 
} from 'react-icons/fa';
import clientService from '../../services/client';

// Componente do Modal de Visualização
const ClientViewModal = ({ isOpen, onClose, cliente }) => {
    if (!isOpen || !cliente) return null;

    const handleEdit = () => {
        onClose();
        setTimeout(() => {
            window.handleEditCliente(cliente);
        }, 300);
    };

    return (
        <div className={styles.modal_overlay} onClick={onClose}>
            <div className={`${styles.modal_container} ${styles.view_modal}`} onClick={e => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <h2>Detalhes do Cliente</h2>
                    <button className={styles.close_button} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.modal_body}>
                    <div className={styles.client_details}>
                        <div className={styles.detail_section}>
                            <h3>Informações Principais</h3>
                            <div className={styles.detail_grid}>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Nome</div>
                                    <div className={styles.detail_value}>{cliente.name}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Status</div>
                                    <div className={styles.detail_value}>
                                        <span className={`${styles.status} ${cliente.status === 'Ativo' ? styles.ativo : styles.inativo}`}>
                                            {cliente.status}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Nome Fantasia</div>
                                    <div className={styles.detail_value}>{cliente.nomeFantasia || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Razão Social</div>
                                    <div className={styles.detail_value}>{cliente.razaoSocial || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>CNPJ</div>
                                    <div className={styles.detail_value}>{cliente.cnpj}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Tipo de Cliente</div>
                                    <div className={styles.detail_value}>{cliente.tipo || '-'}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.detail_section}>
                            <h3>Contato</h3>
                            <div className={styles.detail_grid}>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>E-mail</div>
                                    <div className={styles.detail_value}>{cliente.email}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Telefone</div>
                                    <div className={styles.detail_value}>{cliente.telefone}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Nome do Contato</div>
                                    <div className={styles.detail_value}>{cliente.contato || '-'}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.detail_section}>
                            <h3>Endereço e Outras Informações</h3>
                            <div className={styles.detail_grid}>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>CEP</div>
                                    <div className={styles.detail_value}>{cliente.cep || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Endereço</div>
                                    <div className={styles.detail_value}>{cliente.endereco}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Bairro</div>
                                    <div className={styles.detail_value}>{cliente.bairro || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Cidade</div>
                                    <div className={styles.detail_value}>{cliente.cidade || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Estado</div>
                                    <div className={styles.detail_value}>{cliente.estado || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Loja</div>
                                    <div className={styles.detail_value}>{cliente.loja || '-'}</div>
                                </div>
                                <div className={styles.detail_item}>
                                    <div className={styles.detail_label}>Finalidade</div>
                                    <div className={styles.detail_value}>{cliente.finalidade || '-'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.modal_footer}>
                    <button className={styles.cancel_button} onClick={onClose}>
                        Fechar
                    </button>
                    <button 
                        className={styles.save_button}
                        onClick={handleEdit}
                    >
                        Editar Cliente
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente do Modal de Cadastro/Edição
const ClientModal = ({ isOpen, onClose, cliente, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        nomefantasia: '',
        loja: '',
        razao: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        cnpj: '',
        tipo: '',
        contato: '',
        email: '',
        telefone: '',
        ddd: '',
        ativo: 'sim',
        codigo: '',
        finalidade: '',
        pais: '',
        codmunicipio: '',
        abertura: '',
        homepage: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [cepLoading, setCepLoading] = useState(false);

    // Carregar dados do cliente se estiver editando
    useEffect(() => {
        if (cliente && cliente.id) {
            setFormData({
                id: cliente.id,
                name: cliente.name || '',
                nomefantasia: cliente.nomeFantasia || '',
                loja: cliente.loja || '',
                razao: cliente.razaoSocial || '',
                endereco: cliente.endereco || '',
                bairro: cliente.bairro || '',
                cidade: cliente.cidade || '',
                estado: cliente.estado || '',
                cep: cliente.cep || '',
                cnpj: cliente.cnpj || '',
                tipo: cliente.tipo || '',
                contato: cliente.contato || '',
                email: cliente.email || '',
                telefone: cliente.telefone?.replace(/\D/g, '') || '',
                ddd: cliente.ddd || '',
                ativo: cliente.status === 'Inativo' ? 'nao' : 'sim',
                codigo: cliente.codigo || '',
                finalidade: cliente.finalidade || '',
                pais: cliente.pais || '',
                codmunicipio: cliente.codmunicipio || '',
                abertura: cliente.abertura || '',
                homepage: cliente.homepage || ''
            });
        } else {
            // Limpar formulário para novo cliente
            setFormData({
                name: '',
                nomefantasia: '',
                loja: '',
                razao: '',
                endereco: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                cnpj: '',
                tipo: '',
                contato: '',
                email: '',
                telefone: '',
                ddd: '',
                ativo: 'sim',
                codigo: '',
                finalidade: '',
                pais: '',
                codmunicipio: '',
                abertura: '',
                homepage: ''
            });
        }
        setError('');
        setSuccess('');
    }, [cliente, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Formatação específica para o CEP
        if (name === 'cep') {
            const cepValue = value.replace(/\D/g, '');
            let formattedCep = cepValue;
            
            if (cepValue.length > 5) {
                formattedCep = `${cepValue.slice(0, 5)}-${cepValue.slice(5, 8)}`;
            }
            
            setFormData(prev => ({ ...prev, [name]: formattedCep }));
            
            // Consultar CEP quando tiver 8 dígitos
            if (cepValue.length === 8) {
                handleCepSearch(cepValue);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Função para consultar o CEP na API ViaCEP
    const handleCepSearch = async (cep) => {
        try {
            setCepLoading(true);
            const cepNumbers = cep.replace(/\D/g, '');
            
            if (cepNumbers.length !== 8) {
                return;
            }
            
            const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                setFormData(prev => ({
                    ...prev,
                    endereco: data.logradouro || prev.endereco,
                    bairro: data.bairro || prev.bairro,
                    cidade: data.localidade || prev.cidade,
                    estado: data.uf || prev.estado,
                    codmunicipio: data.ibge || prev.codmunicipio,
                }));
            } else {
                setError('CEP não encontrado. Por favor, verifique o CEP informado.');
            }
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            setError('Erro ao consultar o CEP. Por favor, tente novamente.');
        } finally {
            setCepLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar campos obrigatórios
        const requiredFields = ['name', 'cnpj', 'endereco', 'email', 'telefone', 'cep'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
        
        if (emptyFields.length > 0) {
            setError(`Por favor, preencha os campos obrigatórios: ${emptyFields.join(', ')}`);
            setSuccess('');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            // Preparar dados para envio à API
            const clienteData = {
                ...formData,
                ativo: formData.ativo === 'sim'
            };
            
            // Salvar cliente (criar ou atualizar)
            await clientService.salvarCliente(clienteData);
            
            setSuccess('Cliente salvo com sucesso!');
            
            // Notificar o componente pai e fechar modal após pequeno delay
            setTimeout(() => {
                onSave();
                onClose();
            }, 1500);
            
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            if (error.response && error.response.data) {
                setError(`Erro ao salvar cliente: ${error.response.data.message || 'Verifique os dados e tente novamente.'}`);
            } else {
                setError('Erro ao salvar cliente. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Campos do formulário agrupados
    const formFields = {
        principais: [
            { id: 'codigo', label: 'Código', type: 'text' },
            { id: 'name', label: 'Nome Completo', type: 'text', required: true },
            { id: 'nomefantasia', label: 'Nome Fantasia', type: 'text' },
            { id: 'razao', label: 'Razão Social', type: 'text' },
            { id: 'cnpj', label: 'CNPJ', type: 'text', required: true },
            { id: 'tipo', label: 'Tipo de Cliente', type: 'select', options: [
                { value: '', label: 'Selecione' },
                { value: 'F', label: 'Pessoa Física' },
                { value: 'J', label: 'Pessoa Jurídica' },
                { value: 'M', label: 'MEI' }
            ]},
            { id: 'finalidade', label: 'Finalidade', type: 'select', options: [
                { value: '', label: 'Selecione' },
                { value: 'F', label: 'Fornecedor' },
                { value: 'C', label: 'Cliente' },
                { value: 'A', label: 'Ambos' }
            ]},
            { 
                id: 'ativo', 
                label: 'Cliente Ativo', 
                type: 'select',
                options: [
                    { value: 'sim', label: 'Sim' },
                    { value: 'nao', label: 'Não' }
                ]
            },
            { id: 'abertura', label: 'Data de Abertura', type: 'date', required:true },
        ],
        endereco: [
            { id: 'cep', label: 'CEP', type: 'text', required: true, maxLength: 9 },
            { id: 'endereco', label: 'Endereço', type: 'text', required: true },
            { id: 'bairro', label: 'Bairro', type: 'text' },
            { id: 'cidade', label: 'Cidade', type: 'text' },
            { id: 'estado', label: 'Estado', type: 'text', maxLength: 2 },
            { id: 'pais', label: 'País', type: 'text' },
            { id: 'codmunicipio', label: 'Código Município', type: 'text' },
        ],
        contato: [
            { id: 'email', label: 'E-mail', type: 'email', required: true },
            { id: 'ddd', label: 'DDD', type: 'text', maxLength: 3 },
            { id: 'telefone', label: 'Telefone', type: 'tel', required: true },
            { id: 'contato', label: 'Nome do Contato', type: 'text' },
            { id: 'homepage', label: 'Website', type: 'url' }
        ],
        outros: [
            { id: 'loja', label: 'Loja', type: 'text', required: true }
        ]
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_container} onClick={e => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <h2>{cliente && cliente.id ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h2>
                    <button className={styles.close_button} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.modal_body}>
                    <form className={styles.cadastro_form} onSubmit={handleSubmit}>
                        {/* Mensagens de erro e sucesso */}
                        {error && (
                            <div className={styles.error_message}>
                                <div><FaExclamationTriangle /> {error}</div>
                                <FaTimes onClick={() => setError('')} style={{ cursor: 'pointer' }} />
                            </div>
                        )}
                        {success && (
                            <div className={styles.success_message}>{success}</div>
                        )}

                        {/* Campos Principais */}
                        <div>
                            <h3>Informações Principais</h3>
                            <div className={styles.form_grid}>
                                {formFields.principais.map(field => (
                                    <div key={field.id} className={styles.inputGroup}>
                                        <label className={styles.label} htmlFor={field.id}>
                                            {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        {field.type === 'select' ? (
                                            <select
                                                id={field.id}
                                                name={field.id}
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                className={styles.input}
                                                required={field.required}
                                            >
                                                {field.options.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                id={field.id}
                                                name={field.id}
                                                type={field.type}
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                className={styles.input}
                                                required={field.required}
                                                maxLength={field.maxLength}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Campos de Endereço */}
                        <div>
                            <h3>Endereço</h3>
                            <div className={styles.form_grid}>
                                {formFields.endereco.map(field => (
                                    <div key={field.id} className={styles.inputGroup}>
                                        <label className={styles.label} htmlFor={field.id}>
                                            {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={field.type}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            className={styles.input}
                                            required={field.required}
                                            maxLength={field.maxLength}
                                            disabled={field.id !== 'cep' && cepLoading}
                                        />
                                        {field.id === 'cep' && cepLoading && (
                                            <div className={styles.loading_indicator}>Consultando...</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Campos de Contato */}
                        <div>
                            <h3>Informações de Contato</h3>
                            <div className={styles.form_grid}>
                                {formFields.contato.map(field => (
                                    <div key={field.id} className={styles.inputGroup}>
                                        <label className={styles.label} htmlFor={field.id}>
                                            {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={field.type}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            className={styles.input}
                                            required={field.required}
                                            maxLength={field.maxLength}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Outros Campos */}
                        <div>
                            <h3>Outras Informações</h3>
                            <div className={styles.form_grid}>
                                {formFields.outros.map(field => (
                                    <div key={field.id} className={styles.inputGroup}>
                                        <label className={styles.label} htmlFor={field.id}>
                                            {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={field.type}
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            className={styles.input}
                                            required={field.required}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <button type="button" className={styles.cancel_button} onClick={onClose}>
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        className={styles.save_button} 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar Cliente'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal de confirmação de exclusão
const ConfirmDeleteModal = ({ isOpen, onClose, cliente, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay} onClick={onClose}>
            <div className={`${styles.modal_container} ${styles.confirm_modal}`} onClick={e => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <h2>Confirmar Exclusão</h2>
                    <button className={styles.close_button} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.modal_body}>
                    <div className={styles.confirm_icon}>
                        <FaExclamationTriangle />
                    </div>
                    <div className={styles.confirm_title}>
                        Tem certeza que deseja excluir este cliente?
                    </div>
                    <div className={styles.confirm_message}>
                        Esta ação não poderá ser desfeita. O cliente <strong>{cliente?.name}</strong> será removido permanentemente.
                    </div>
                </div>
                <div className={styles.modal_footer}>
                    <button className={styles.cancel_button} onClick={onClose}>
                        Cancelar
                    </button>
                    <button 
                        className={styles.btn_batch_action_warning} 
                        onClick={() => {
                            onConfirm(cliente?.id);
                            onClose();
                        }}
                    >
                        Sim, Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente principal
const Clientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [showStats, setShowStats] = useState(true);
    
    // Estados para modais
    const [showClientModal, setShowClientModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCliente, setCurrentCliente] = useState(null);

    // Estatísticas
    const [stats, setStats] = useState({
        total: 0,
        ativos: 0,
        inativos: 0,
        novos: 0
    });

    // Buscar clientes na API
    const fetchClientes = async () => {
        try {
            setLoading(true);
            const data = await clientService.getClientes();
            
            // Formatar dados dos clientes
            const clientesFormatados = data.map(cliente => ({
                id: cliente.id,
                name: cliente.name || '',
                nomeFantasia: cliente.nomefantasia || '',
                razaoSocial: cliente.razao || '',
                cnpj: cliente.cnpj || '',
                email: cliente.email || '',
                telefone: formatTelefone(cliente.ddd, cliente.telefone) || '',
                status: cliente.ativo ? 'Ativo' : 'Inativo',
                endereco: cliente.address.logradouro || '',
                bairro: cliente.address.bairro || '',
                cidade: cliente.address.cidade || '',
                estado: cliente.address.estado || '',
                cep: cliente.address.cep || '',
                contato: cliente.contato || '',
                tipo: cliente.tipo || '',
                loja: cliente.loja || '',
                ddd: cliente.ddd || '',
                codigo: cliente.codigo || '',
                finalidade: cliente.finalidade || '',
                pais: cliente.pais || '',
                codmunicipio: cliente.address.codmunicipio || '',
                abertura: cliente.abertura || '',
                homepage: cliente.homepage || ''
            }));
            
            setClientes(clientesFormatados);
            
            // Calcular estatísticas
            setStats({
                total: clientesFormatados.length,
                ativos: clientesFormatados.filter(c => c.status === 'Ativo').length,
                inativos: clientesFormatados.filter(c => c.status === 'Inativo').length,
                novos: 0 // Poderia ser calculado por data de cadastro se disponível
            });
            
            setError('');
        } catch (err) {
            console.error('Erro ao buscar clientes:', err);
            setError('Não foi possível carregar os clientes. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Formatar telefone
    const formatTelefone = (ddd, telefone) => {
        if (!telefone) return '';
        const dddFormatado = ddd ? `(${ddd})` : '';
        
        // Formatar números de telefone
        if (telefone.length === 8) {
            return `${dddFormatado} ${telefone.slice(0, 4)}-${telefone.slice(4)}`;
        } else if (telefone.length === 9) {
            return `${dddFormatado} ${telefone.slice(0, 5)}-${telefone.slice(5)}`;
        }
        return `${dddFormatado} ${telefone}`;
    };

    // Carregar clientes ao montar componente
    useEffect(() => {
        fetchClientes();
        
        // Adicionar função global para edição de cliente (usada pelo modal de visualização)
        window.clientEditFunction = handleEditCliente;
        
        return () => {
            delete window.clientEditFunction;
        };
    }, []);

    // Filtrar clientes pela busca
    const filteredClientes = clientes.filter(cliente => {
        const searchLower = search.toLowerCase();
        return (
            cliente.name.toLowerCase().includes(searchLower) ||
            cliente.nomeFantasia.toLowerCase().includes(searchLower) ||
            cliente.cnpj.toLowerCase().includes(searchLower) ||
            cliente.email.toLowerCase().includes(searchLower)
        );
    });

    // Abrir modal de cadastro
    const handleNovoCliente = () => {
        setCurrentCliente(null);
        setShowClientModal(true);
    };

    // Abrir modal para visualizar cliente
    const handleViewCliente = (cliente) => {
        setCurrentCliente(cliente);
        setShowViewModal(true);
    };

    // Abrir modal de edição
    const handleEditCliente = (cliente) => {
        setCurrentCliente(cliente);
        setShowClientModal(true);
    };

    // Abrir modal de confirmação de exclusão
    const handleDeleteConfirm = (cliente) => {
        setCurrentCliente(cliente);
        setShowDeleteModal(true);
    };

    // Excluir cliente
    const handleDeleteCliente = async (id) => {
        try {
            await clientService.excluirCliente(id);
            fetchClientes(); // Recarregar lista após exclusão
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            setError('Não foi possível excluir o cliente. Por favor, tente novamente.');
        }
    };

    // Limpar busca
    const handleClearSearch = () => {
        setSearch('');
    };

    // Configuração das colunas da tabela
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '80px'
        },
        {
            name: 'Nome',
            selector: row => row.name,
            sortable: true,
            grow: 2
        },
        {
            name: 'Nome Fantasia',
            selector: row => row.nomeFantasia || '-',
            sortable: true,
            grow: 2
        },
        {
            name: 'CNPJ',
            selector: row => row.cnpj,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            grow: 2
        },
        {
            name: 'Telefone',
            selector: row => row.telefone,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            width: '120px',
            cell: row => (
                <span className={`${styles.status} ${row.status === 'Ativo' ? styles.ativo : styles.inativo}`}>
                    {row.status}
                </span>
            )
        },
        {
            name: 'Ações',
            cell: row => (
                <div className={styles.actions}>
                    <button 
                        className={styles.btn_action}
                        onClick={() => handleViewCliente(row)}
                        title="Visualizar"
                    >
                        <FaEye />
                    </button>
                    <button 
                        className={styles.btn_action} 
                        onClick={() => handleEditCliente(row)}
                        title="Editar"
                    >
                        <FaEdit />
                    </button>
                    <button 
                        className={styles.btn_action_delete} 
                        onClick={() => handleDeleteConfirm(row)}
                        title="Excluir"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
            button: true,
            width: '120px'
        }
    ];

    // Exportar dados
    const handleExport = () => {
        // Implementação da exportação dos dados para Excel ou CSV
        alert('Funcionalidade de exportação em desenvolvimento');
    };

    return (
        <div className={styles.clientes_container}>
            <Header title="Gerenciamento de Clientes" />
            
            <div className={styles.content_container}>
                {/* Cabeçalho com estatísticas */}
                {showStats && (
                    <div className={styles.stats_container}>
                        <div className={styles.stat_card}>
                            <div className={styles.stat_title}>Total de Clientes</div>
                            <div className={styles.stat_value}>{stats.total}</div>
                        </div>
                        <div className={styles.stat_card}>
                            <div className={styles.stat_title}>Clientes Ativos</div>
                            <div className={styles.stat_value}>{stats.ativos}</div>
                        </div>
                        <div className={styles.stat_card}>
                            <div className={styles.stat_title}>Clientes Inativos</div>
                            <div className={styles.stat_value}>{stats.inativos}</div>
                        </div>
                        <div className={styles.stat_card}>
                            <div className={styles.stat_title}>Novos Clientes (30 dias)</div>
                            <div className={styles.stat_value}>{stats.novos}</div>
                        </div>
                    </div>
                )}
                
                {/* Barra de ações */}
                <div className={styles.actions_bar}>
                    <div className={styles.search_container}>
                        <div className={styles.search_input_container}>
                            <input
                                type="text"
                                placeholder="Buscar clientes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.search_input}
                            />
                            {search && (
                                <button className={styles.clear_search} onClick={handleClearSearch}>
                                    <FaTimes />
                                </button>
                            )}
                            <button className={styles.search_button}>
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                    <div className={styles.buttons_container}>
                        <button className={styles.btn_export} onClick={handleExport}>
                            <FaFileExport />
                            <span>Exportar</span>
                        </button>
                        <button className={styles.btn_new} onClick={handleNovoCliente}>
                            <FaUserPlus />
                            <span>Novo Cliente</span>
                        </button>
                    </div>
                </div>
                
                {/* Exibir mensagem de erro, se houver */}
                {error && (
                    <div className={styles.error_message}>
                        <FaExclamationTriangle /> {error}
                    </div>
                )}
                
                {/* Tabela de clientes */}
                <div className={styles.table_container}>
                    <CustomDataTables
                        columns={columns}
                        data={filteredClientes}
                        loading={loading}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        highlightOnHover
                        pointerOnHover
                        noDataComponent={
                            <div className={styles.no_data}>
                                {search 
                                    ? "Nenhum cliente encontrado para esta busca." 
                                    : "Nenhum cliente cadastrado."
                                }
                            </div>
                        }
                    />
                </div>
            </div>
            
            {/* Modais */}
            <ClientModal 
                isOpen={showClientModal} 
                onClose={() => setShowClientModal(false)} 
                cliente={currentCliente}
                onSave={fetchClientes}
            />
            
            <ClientViewModal 
                isOpen={showViewModal} 
                onClose={() => setShowViewModal(false)} 
                cliente={currentCliente} 
            />
            
            <ConfirmDeleteModal 
                isOpen={showDeleteModal} 
                onClose={() => setShowDeleteModal(false)} 
                cliente={currentCliente}
                onConfirm={handleDeleteCliente}
            />
        </div>
    );
};

export default Clientes;