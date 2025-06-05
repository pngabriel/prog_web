import axios from "axios";

const productService = axios.create({
    baseURL: "http://192.168.100.57:8083/products"
});

// Função para converter status do formulário para enum ProductStatus
const convertToProductStatus = (statusText) => {
    switch (statusText) {
        case "Ativo":
            return "ACTIVE";
        case "Baixo Estoque":
            return "LOW_STOCK";
        case "Esgotado":
            return "OUT_OF_STOCK";
        case "Inativo":
            return "INACTIVE";
        default:
            return "ACTIVE"; // Valor padrão
    }
};

// Função para converter enum ProductStatus para texto no formulário
const convertFromProductStatus = (statusEnum) => {
    switch (statusEnum) {
        case "ACTIVE":
            return "Ativo";
        case "LOW_STOCK":
            return "Baixo Estoque";
        case "OUT_OF_STOCK":
            return "Esgotado";
        case "INACTIVE":
            return "Inativo";
        default:
            return "Ativo"; // Valor padrão
    }
};

// Função para buscar todos os produtos
const getProdutos = async () => {
    const response = await productService.get("/products");
    // Converter status do backend para formato da UI
    const produtos = response.data.map(produto => ({
        ...produto,
        status: convertFromProductStatus(produto.status)
    }));
    return produtos;
};

// Função para salvar (criar ou editar) um produto
const salvarProduto = async (produto) => {
    // Converter status do formulário para o formato do backend
    const produtoConvertido = {
        ...produto,
        status: convertToProductStatus(produto.status)
    };

    console.log("Produto enviado no corpo da requisição: ", produtoConvertido);

    try {
        if (produto.id) {
            // Editar
            const response = await productService.put(`/products/${produto.id}`, produtoConvertido);
            return {
                ...response.data,
                status: convertFromProductStatus(response.data.status)
            };
        } else {
            // Criar
            const response = await productService.post("/products", produtoConvertido);
            return {
                ...response.data,
                status: convertFromProductStatus(response.data.status)
            };
        }
    } catch (error) {
        console.error("Erro ao salvar produto:", error);
        throw error;
    }
};

// Função para excluir um produto
const excluirProduto = async (id) => {
    try {
        await productService.delete(`/products/${id}`);
        return true;
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        throw error;
    }
};

export default {
    getProdutos,
    salvarProduto,
    excluirProduto,
    convertToProductStatus,
    convertFromProductStatus
};