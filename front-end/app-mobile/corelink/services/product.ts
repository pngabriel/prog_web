import axios from "axios";

// Aqui você pode trocar o IP se estiver usando emulador Android: use http://10.0.2.2:8083
const productService = axios.create({
    baseURL: "http://192.168.100.57:8083/products"
});

// Converte texto do status (do formulário) para enum do backend
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
            return "ACTIVE"; // Padrão
    }
};

// Converte enum do backend para texto usado na UI
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
            return "Ativo";
    }
};

// Busca todos os produtos
const getProdutos = async () => {
    try {
        const response = await productService.get("/products");
        return response.data.map(produto => ({
            ...produto,
            status: convertFromProductStatus(produto.status)
        }));
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
};

// Cria ou atualiza produto
const salvarProduto = async (produto) => {
    const produtoConvertido = {
        ...produto,
        status: convertToProductStatus(produto.status)
    };

    console.log("Produto enviado:", produtoConvertido);

    try {
        if (produto.id) {
            // Atualizar
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

// Exclui um produto
const excluirProduto = async (id) => {
    try {
        await productService.delete(`/products/${id}`);
        return true;
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        throw error;
    }
};

// Exporta os métodos
export default {
    getProdutos,
    salvarProduto,
    excluirProduto,
    convertToProductStatus,
    convertFromProductStatus
};
