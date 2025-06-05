import React, { useState } from 'react';
import { 
  VStack, 
  HStack, 
  Text, 
  Input, 
  Icon, 
  FlatList, 
  Box, 
  Button, 
  Badge, 
  Spacer, 
  Heading, 
  IconButton, 
  Select, 
  Modal,
  FormControl,
  useToast
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Dados de exemplo para produtos
const produtosIniciais = [
  { id: "1", nome: "Smartphone X", categoria: "Eletrônicos", preco: 1999.99, estoque: 15, status: "Ativo" },
  { id: "2", nome: "Notebook Pro", categoria: "Eletrônicos", preco: 4500.00, estoque: 8, status: "Ativo" },
  { id: "3", nome: "Mouse Sem Fio", categoria: "Acessórios", preco: 89.90, estoque: 45, status: "Ativo" },
  { id: "4", nome: "Teclado Mecânico", categoria: "Acessórios", preco: 259.90, estoque: 12, status: "Ativo" },
  { id: "5", nome: "Monitor 24''", categoria: "Eletrônicos", preco: 899.99, estoque: 3, status: "Baixo Estoque" },
  { id: "6", nome: "Cadeira Gamer", categoria: "Móveis", preco: 1200.00, estoque: 7, status: "Ativo" },
  { id: "7", nome: "Fone de Ouvido", categoria: "Acessórios", preco: 199.90, estoque: 0, status: "Esgotado" },
  { id: "8", nome: "Cabo HDMI", categoria: "Acessórios", preco: 29.90, estoque: 30, status: "Ativo" },
];

// Cores para status de produtos
const statusColors = {
  "Ativo": "green.500",
  "Baixo Estoque": "yellow.500",
  "Esgotado": "red.500",
  "Inativo": "gray.500"
};

type Produto = {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  status: string;
};


export default function PainelProdutos() {
  const router = useRouter();
  const toast = useToast();
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // Produto novo/edição
  const [nomeProduto, setNomeProduto] = useState("");
  const [categoriaProduto, setCategoriaProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [estoqueProduto, setEstoqueProduto] = useState("");
  const [statusProduto, setStatusProduto] = useState("Ativo");

  // Função para filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    // Filtro de busca
    const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase()) || 
                      produto.categoria.toLowerCase().includes(busca.toLowerCase());
    
    // Filtro de categoria
    const matchCategoria = categoriaFiltro === "" || produto.categoria === categoriaFiltro;
    
    // Filtro de status
    const matchStatus = statusFiltro === "" || produto.status === statusFiltro;
    
    return matchBusca && matchCategoria && matchStatus;
  });

  // Todas as categorias únicas para o filtro
  const categorias = [...new Set(produtos.map(p => p.categoria))];
  
  // Todos os status únicos para o filtro
  const statusOptions = [...new Set(produtos.map(p => p.status))];

  // Abrir modal para editar ou criar produto
  const handleEditarProduto = (produto:any) => {
    if (produto) {
      setProdutoEditando(produto);
      setNomeProduto(produto.nome);
      setCategoriaProduto(produto.categoria);
      setPrecoProduto(produto.preco.toString());
      setEstoqueProduto(produto.estoque.toString());
      setStatusProduto(produto.status);
    } else {
      setProdutoEditando(null);
      setNomeProduto("");
      setCategoriaProduto("");
      setPrecoProduto("");
      setEstoqueProduto("");
      setStatusProduto("Ativo");
    }
    setModalVisible(true);
  };

  // Salvar produto (novo ou editado)
  const handleSalvarProduto = () => {
    if (!nomeProduto || !categoriaProduto || !precoProduto || !estoqueProduto) {
      toast.show({
        render: () => (
          <Box bg="yellow.400" px="4" py="3" rounded="md" mb={5}>
            <Text color="black" fontWeight="bold">Campos obrigatórios</Text>
            <Text color="black">Por favor, preencha todos os campos</Text>
          </Box>
        )
      });
      return;
    }
  
    try {
      const precoNum = parseFloat(precoProduto);
      const estoqueNum = parseInt(estoqueProduto);
  
      if (isNaN(precoNum) || isNaN(estoqueNum)) {
        throw new Error("Valores inválidos");
      }
  
      const novoProduto = {
        id: produtoEditando ? produtoEditando.id : (produtos.length + 1).toString(),
        nome: nomeProduto,
        categoria: categoriaProduto,
        preco: precoNum,
        estoque: estoqueNum,
        status: statusProduto
      };
  
      if (produtoEditando) {
        // Editar produto existente
        setProdutos(produtos.map(p => p.id === produtoEditando.id ? novoProduto : p));
        toast.show({
          render: () => (
            <Box bg="blue.500" px="4" py="3" rounded="md" mb={5}>
              <Text color="white" fontWeight="bold">Produto atualizado</Text>
            </Box>
          )
        });
      } else {
        // Adicionar novo produto
        setProdutos([...produtos, novoProduto]);
        toast.show({
          render: () => (
            <Box bg="green.500" px="4" py="3" rounded="md" mb={5}>
              <Text color="white" fontWeight="bold">Produto adicionado</Text>
            </Box>
          )
        });
      }
  
      setModalVisible(false);
    } catch (error) {
      toast.show({
        render: () => (
          <Box bg="red.500" px="4" py="3" rounded="md" mb={5}>
            <Text color="white" fontWeight="bold">Erro ao salvar</Text>
            <Text color="white">Verifique os valores de preço e estoque</Text>
          </Box>
        )
      });
    }
  };
  

  // Remover produto
  const handleRemoverProduto = (id: any) => {
    setProdutos(produtos.filter(p => p.id !== id));
    toast.show({
      render: () => (
        <Box bg="gray.500" px="4" py="3" rounded="md" mb={5}>
          <Text color="white" fontWeight="bold">Produto removido</Text>
        </Box>
      )
    });
  };


  // Atualizar status do produto
  const atualizarStatus = (id:any, novoStatus:any) => {
    setProdutos(produtos.map(p => 
      p.id === id ? {...p, status: novoStatus} : p
    ));
  };

  return (
    <VStack space={4} flex={1} px={4} pt={10} bg="white">
      {/* Header */}
      <HStack alignItems="center" justifyContent="space-between" mb={2}>
        <Heading size="lg" color="#4CAF50">Controle de Produtos</Heading>
        <Button 
          leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="sm" />}
          colorScheme="green"
          onPress={() => handleEditarProduto(null)}
        >
          Novo Produto
        </Button>
      </HStack>

      <HStack>
        <Input
          flex={1}
          placeholder="Buscar produtos..."
          value={busca}
          onChangeText={setBusca}
          InputLeftElement={<Icon as={Ionicons} name="search-outline" size={5} ml={2} color="gray.400" />}
        />
      </HStack>

      {/* Filtros */}
      <HStack space={3} mb={2} justifyContent={"center"}>
        <Select
          width="180"
          placeholder="Categoria"
          selectedValue={categoriaFiltro}
          onValueChange={setCategoriaFiltro}
          _selectedItem={{
            bg: "green.100"
          }}
        >
          <Select.Item label="Todas" value="" />
          {categorias.map(cat => (
            <Select.Item key={cat} label={cat} value={cat} />
          ))}
        </Select>
        
        <Select
          width="180"
          placeholder="Status"
          selectedValue={statusFiltro}
          onValueChange={setStatusFiltro}
          _selectedItem={{
            bg: "green.100"
          }}
        >
          <Select.Item label="Todos" value="" />
          {statusOptions.map(status => (
            <Select.Item key={status} label={status} value={status} />
          ))}
        </Select>
      </HStack>

      {/* Lista de Produtos */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            mb={3}
            bg="white"
            shadow={1}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text fontWeight="bold" fontSize="md">{item.nome}</Text>
                <HStack space={2} mt={1}>
                  <Badge colorScheme="blue" variant="subtle" rounded="md">{item.categoria}</Badge>
                  <Badge 
                    colorScheme={
                      item.status === "Ativo" ? "green" : 
                      item.status === "Baixo Estoque" ? "yellow" : 
                      item.status === "Esgotado" ? "red" : "gray"
                    } 
                    variant="subtle" 
                    rounded="md"
                  >
                    {item.status}
                  </Badge>
                </HStack>
              </VStack>
              
              <VStack alignItems="flex-end">
                <Text fontWeight="bold" color="green.600">
                  R$ {item.preco.toFixed(2)}
                </Text>
                <Text color={item.estoque <= 5 ? "red.500" : "gray.600"}>
                  Estoque: {item.estoque} unid.
                </Text>
              </VStack>
            </HStack>

            <HStack mt={4} justifyContent="flex-end" space={2}>
              <Button
                size="sm"
                leftIcon={<Icon as={Ionicons} name="create-outline" size="sm" />}
                onPress={() => handleEditarProduto(item)}
                colorScheme="blue"
                variant="subtle"
              >
                Editar
              </Button>
              
              <Button
                size="sm"
                leftIcon={<Icon as={Ionicons} name="trash-outline" size="sm" />}
                onPress={() => handleRemoverProduto(item.id)}
                colorScheme="red"
                variant="subtle"
              >
                Remover
              </Button>
              
              {item.estoque > 0 && item.status !== "Inativo" && (
                <Button
                size="sm"
                colorScheme="green"
                variant="subtle"
                onPress={() =>
                  router.push({
                    pathname: "/produto/[id]", // <-- corrigido
                    params: { id: item.id }
                  })
                }
              >
                Detalhes
              </Button>              
              )}
            </HStack>
          </Box>
        )}
        ListEmptyComponent={
          <Box p={10} alignItems="center">
            <Text color="gray.500">Nenhum produto encontrado</Text>
          </Box>
        }
      />

      {/* Modal para adicionar/editar produto */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="lg">
        <Modal.Content>
          <Modal.Header>
            {produtoEditando ? "Editar Produto" : "Novo Produto"}
          </Modal.Header>
          <Modal.Body>
            <FormControl mb={3}>
              <FormControl.Label>Nome do Produto</FormControl.Label>
              <Input 
                value={nomeProduto} 
                onChangeText={setNomeProduto}
                placeholder="Nome do produto"
              />
            </FormControl>
            
            <FormControl mb={3}>
              <FormControl.Label>Categoria</FormControl.Label>
              <Input 
                value={categoriaProduto} 
                onChangeText={setCategoriaProduto}
                placeholder="Categoria"
              />
            </FormControl>
            
            <HStack space={3} mb={3}>
              <FormControl flex={1}>
                <FormControl.Label>Preço (R$)</FormControl.Label>
                <Input 
                  value={precoProduto} 
                  onChangeText={setPrecoProduto}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </FormControl>
              
              <FormControl flex={1}>
                <FormControl.Label>Estoque</FormControl.Label>
                <Input 
                  value={estoqueProduto} 
                  onChangeText={setEstoqueProduto}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </FormControl>
            </HStack>
            
            <FormControl>
              <FormControl.Label>Status</FormControl.Label>
              <Select
                selectedValue={statusProduto}
                onValueChange={setStatusProduto}
                placeholder="Selecione o status"
              >
                <Select.Item label="Ativo" value="Ativo" />
                <Select.Item label="Baixo Estoque" value="Baixo Estoque" />
                <Select.Item label="Esgotado" value="Esgotado" />
                <Select.Item label="Inativo" value="Inativo" />
              </Select>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button 
                variant="ghost" 
                colorScheme="blueGray" 
                onPress={() => setModalVisible(false)}
              >
                Cancelar
              </Button>
              <Button 
                colorScheme="green"
                onPress={handleSalvarProduto}
              >
                Salvar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}