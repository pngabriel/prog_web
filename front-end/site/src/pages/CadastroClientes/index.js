import React, { useState, useEffect } from 'react';
import styles from './CadastroClientes.module.css';
import Header from '../../components/Header';
import clientService from '../../services/client'; // Importando o serviço
import { useParams, useNavigate } from 'react-router-dom'; // Para lidar com parâmetros de URL e navegação

export default function CadastroClientes() {
    const { id } = useParams(); // Para capturar o ID quando estiver editando
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        nomefantasia: '',
        loja: '',
        razao: '',
        endereco: '',
        cnpj: '',
        tipo: '',
        abertura: '',
        finalidade: '',
        contato: '',
        email: '',
        telefone: '',
        ddd: '',
        ativo: 'sim'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Carregar dados do cliente se estiver editando
    useEffect(() => {
        const fetchClienteData = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const clienteData = await clientService.getClientePorId(id);
                    // Convertendo o objeto da API para o formato do formulário
                    setFormData({
                        id: clienteData.id,
                        nome: clienteData.nome || '',
                        nomefantasia: clienteData.nomefantasia || '',
                        loja: clienteData.loja || '',
                        razao: clienteData.razao || '',
                        endereco: clienteData.endereco || '',
                        cnpj: clienteData.cnpj || '',
                        tipo: clienteData.tipo || '',
                        abertura: clienteData.abertura || '',
                        finalidade: clienteData.finalidade || '',
                        contato: clienteData.contato || '',
                        email: clienteData.email || '',
                        telefone: clienteData.telefone || '',
                        ddd: clienteData.ddd || '',
                        ativo: clienteData.ativo === false ? 'nao' : 'sim'
                    });
                } catch (error) {
                    setError('Erro ao carregar dados do cliente. Por favor, tente novamente.');
                    console.error('Erro ao buscar cliente:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchClienteData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar campos obrigatórios
        const requiredFields = ['nome', 'cnpj', 'endereco', 'email', 'telefone'];
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
            
            // Redirecionar após um pequeno delay
            setTimeout(() => {
                navigate('/clientes');
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

    // Melhoria: agrupar campos em seções lógicas
    const formFields = [
        { id: 'name', label: 'Nome Completo', type: 'text', required: true },
        { id: 'nomefantasia', label: 'Nome Fantasia', type: 'text' },
        { id: 'razao', label: 'Razão Social', type: 'text' },
        { id: 'cnpj', label: 'CNPJ', type: 'text', required: true },
        { id: 'endereco', label: 'Endereço Completo', type: 'text', required: true },
        { id: 'loja', label: 'Loja', type: 'text' },
        { id: 'tipo', label: 'Tipo de Cliente', type: 'text' },
        { id: 'abertura', label: 'Data de Abertura', type: 'date' },
        { id: 'finalidade', label: 'Finalidade', type: 'text' },
        { id: 'contato', label: 'Nome do Contato', type: 'text' },
        { id: 'email', label: 'E-mail', type: 'email', required: true },
        { id: 'homepage', label: 'Site', type: 'url' },
        { id: 'ddd', label: 'DDD', type: 'text' },
        { id: 'telefone', label: 'Telefone', type: 'tel', required: true },
        { 
            id: 'ativo', 
            label: 'Cliente Ativo', 
            type: 'select',
            options: [
                { value: 'sim', label: 'Sim' },
                { value: 'nao', label: 'Não' }
            ]
        }
    ];

    return (
        <div>
            <Header/>
            <main className={styles.cadastro_container}>
                <h2>{id ? 'Editar Cliente' : 'Cadastro de Cliente'}</h2>
                {loading ? (
                    <div className={styles.loading}>Carregando...</div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.cadastro_form}>
                        {formFields.map((field) => (
                            <div className={styles.inputGroup} key={field.id}>
                                <label htmlFor={field.id} className={styles.label}>
                                    {field.label} {field.required && <span style={{color: 'red'}}>*</span>}
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
                                        type={field.type}
                                        id={field.id} 
                                        name={field.id} 
                                        value={formData[field.id]} 
                                        onChange={handleChange} 
                                        className={styles.input} 
                                        required={field.required}
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                        
                        {error && <div className={styles.error_message}>{error}</div>}
                        {success && <div className={styles.success_message} style={{color: 'green', textAlign: 'center', gridColumn: 'span 2'}}>{success}</div>}
                        
                        <div className={styles.button_wrapper}>
                            <button 
                                type="submit" 
                                className={styles.button}
                                disabled={loading}
                            >
                                {loading ? 'Salvando...' : id ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
}