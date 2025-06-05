import axios from "axios"; 

const clientService = axios.create({
    baseURL: "http://localhost:8083/user/users"
});

// Função para buscar todos os clientes
const getClientes = async () => {
    const response = await clientService.get();
    console.log("Clientes consultados: ", response.data);
    return response.data.filter(user => user.userType === "CLIENT");
};

// Função para salvar (criar ou editar) um cliente
// Função para salvar (criar ou editar) um cliente
const salvarCliente = async (cliente) => {
    const clienteConvertido = {
        ...cliente,
        userType: "CLIENT"
    };

    console.log("Cliente: ", cliente)
    
    try {
        if (cliente.id) {
            // Usar o endpoint específico para atualizar cliente
            const response = await clientService.put(`/client/${cliente.id}`, clienteConvertido);
            console.log("resposta da api: ", response.data);
            return response.data;
        } else {
            // Criar novo cliente
            const response = await clientService.post("/client", clienteConvertido);
            return response.data;
        }
    } catch (error) {
        console.log(error.response?.data || error.message);
        console.error("Erro ao salvar cliente:", error);
        throw error;
    }
};
// Função para excluir um cliente
const excluirCliente = async (id) => {
    try {
        await clientService.delete(`/${id}`);
        return true;
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        throw error;
    }
};

// Função para buscar um cliente por ID
const getClientePorId = async (id) => {
    try {
        const response = await clientService.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cliente por ID:", error);
        throw error;
    }
};

export default {
    getClientes,
    salvarCliente,
    excluirCliente,
    getClientePorId
};
