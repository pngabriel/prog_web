import React, { useState } from "react";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
  IconButton,
  Button,
  Divider,
  ScrollView,
  Input,
  FormControl,
  Select,
  CheckIcon,
  Pressable,
  Badge,
  Icon,
  Center,
  useToast
} from "native-base";
import { AntDesign, Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Define as cores do seu CSS
const theme = {
  primary: "#4CAF50",       // Verde principal
  primaryDark: "#3e8e41",   // Verde mais escuro (hover)
  danger: "#e53935",        // Vermelho para ações destrutivas
  dangerDark: "#c62828"     // Vermelho escuro (hover)
};

// Dados de exemplo para produtos
const produtosExemplo = [
  {
    id: "1",
    nome: "Smartphone XYZ Pro",
    preco: 2499.99,
    imagem: "https://via.placeholder.com/150",
    descricao: "Smartphone de última geração com câmera de alta resolução e processador potente",
    categoria: "Eletrônicos",
    avaliacao: 4.5,
  },
  {
    id: "2",
    nome: "Notebook Ultra Slim",
    preco: 3999.99,
    imagem: "https://via.placeholder.com/150",
    descricao: "Notebook leve e potente para trabalho e entretenimento",
    categoria: "Informática",
    avaliacao: 4.2,
  },
  {
    id: "3",
    nome: "Fone de Ouvido Bluetooth",
    preco: 299.99,
    imagem: "https://via.placeholder.com/150",
    descricao: "Fone de ouvido sem fio com cancelamento de ruído",
    categoria: "Acessórios",
    avaliacao: 4.8,
  },
  {
    id: "4",
    nome: "Smart TV 4K 55\"",
    preco: 3299.99,
    imagem: "https://via.placeholder.com/150",
    descricao: "Smart TV com resolução 4K e sistema operacional inteligente",
    categoria: "Eletrônicos",
    avaliacao: 4.7,
  },
];

export default function CarrinhoCompras() {
    const router = useRouter();
    const [itensCarrinho, setItensCarrinho] = useState(
      produtosExemplo.slice(0, 3).map(produto => ({
        ...produto,
        quantidade: 1
      }))
    );
    const toast = useToast();
  
    const removerDoCarrinho = (id) => {
      setItensCarrinho(itensCarrinho.filter(item => item.id !== id));
      toast.show({
        description: "Produto removido do carrinho",
        placement: "top",
        backgroundColor: theme.danger
      });
    };
  
    const alterarQuantidade = (id, novaQuantidade) => {
      if (novaQuantidade < 1) return;
      setItensCarrinho(
        itensCarrinho.map(item => 
          item.id === id ? { ...item, quantidade: novaQuantidade } : item
        )
      );
    };
  
    const calcularTotal = () => {
      return itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };
  
    const calcularQuantidadeTotal = () => {
      return itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
    };
  
    // Renderizar cada item do carrinho
    const renderItem = ({ item }) => (
      <Box 
        borderBottomWidth="1" 
        borderColor="coolGray.200" 
        pl="4" 
        pr="5" 
        py="3"
        bg="white"
      >
        <HStack space={3} alignItems="center">
          {/* <Image 
            source={{ uri: item.imagem }} 
            // alt={item.nome}
            size="sm"
            rounded="md"
          /> */}
          <VStack width="50%">
            <Text 
              color="coolGray.800" 
              bold
              numberOfLines={1}
            >
              {item.nome}
            </Text>
            <Text 
              color={theme.primary}
              bold
              fontSize="md"
            >
              R$ {item.preco.toFixed(2)}
            </Text>
          </VStack>
          <Spacer />
          <HStack space={2} alignItems="center">
            <IconButton
              bg={theme.primary}
              _pressed={{ bg: theme.primaryDark }}
              rounded="full"
              size="md"
              icon={<Icon as={AntDesign} name="minus" size="sm" color="white" />}
              onPress={() => alterarQuantidade(item.id, item.quantidade - 1)}
            />
            <Text width="8" textAlign="center" fontSize="md">{item.quantidade}</Text>
            <IconButton
              bg={theme.primary}
              _pressed={{ bg: theme.primaryDark }}
              rounded="full"
              size="md"
              icon={<Icon as={AntDesign} name="plus" size="sm" color="white" />}
              onPress={() => alterarQuantidade(item.id, item.quantidade + 1)}
            />
          </HStack>
          <IconButton
            colorScheme="red"
            bg={theme.danger}
            _pressed={{ bg: theme.dangerDark }}
            rounded="full"
            size="md"
            icon={<Icon as={AntDesign} name="delete" size="sm" color="white" />}
            onPress={() => removerDoCarrinho(item.id)}
          />
        </HStack>
      </Box>
    );
  
    return (
      <Box flex={1} bg="gray.100" safeAreaTop>
        <HStack px="4" py="3" justifyContent="space-between" alignItems="center" bg={theme.primary}>
          <HStack space={2} alignItems="center">
            <Icon as={AntDesign} name="shoppingcart" size="md" color="white" />
            <Text color="white" fontSize="lg" fontWeight="bold">Meu Carrinho</Text>
          </HStack>
          <Badge rounded="full" bg={theme.danger} zIndex={1} px={2}>
            <Text color="white" fontSize="sm" fontWeight="bold">
              {calcularQuantidadeTotal()}
            </Text>
          </Badge>
        </HStack>
  
        {itensCarrinho.length > 0 ? (
          <VStack flex={1} bg="gray.100">
            <FlatList
              data={itensCarrinho}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 200 }}
              showsVerticalScrollIndicator={false}
            />
        
            <Box p="5" bg="white" shadow={2} position="absolute" bottom={0} width="100%" borderTopRadius="xl">
              <HStack justifyContent="space-between" mb="2">
                <Text color="coolGray.500" fontSize="md">Subtotal:</Text>
                <Text fontWeight="bold" fontSize="md">R$ {calcularTotal().toFixed(2)}</Text>
              </HStack>
        
              <HStack justifyContent="space-between" mb="2">
                <Text color="coolGray.500" fontSize="md">Taxa de entrega:</Text>
                <Text fontWeight="bold" fontSize="md">R$ 15,00</Text>
              </HStack>
        
              <Divider my="3" />
        
              <HStack justifyContent="space-between" mb="4">
                <Text color="coolGray.800" fontWeight="bold" fontSize="lg">Total:</Text>
                <Text color={theme.primary} fontSize="xl" fontWeight="bold">
                  R$ {(calcularTotal() + 15).toFixed(2)}
                </Text>
              </HStack>
        
              <Button
                bg={theme.primary}
                _pressed={{ bg: theme.primaryDark }}
                size="lg"
                height="12"
                mb="3"
                onPress={() => router.push("../finalizar_compra")}
                startIcon={<Icon as={MaterialIcons} name="shopping-bag" size="sm" />}
                _text={{ fontSize: "md", fontWeight: "bold" }}
                shadow={2}
              >
                Finalizar Compra
              </Button>
        
              <Button
                variant="outline"
                borderColor={theme.primary}
                _text={{ color: theme.primary, fontSize: "md", fontWeight: "bold" }}
                _pressed={{ bg: "gray.100" }}
                size="lg"
                height="12"
                onPress={() => router.push("../(tabs)/produtos")}
                startIcon={<Icon as={MaterialIcons} name="arrow-back" size="sm" color={theme.primary} />}
              >
                Continuar comprando
              </Button>
            </Box>
          </VStack>
        ) : (
          <Center flex={1} p={4}>
            <Icon as={AntDesign} name="shoppingcart" size="4xl" color="gray.300" />
            <Text mt="4" fontSize="xl" color="gray.500" textAlign="center">
              Seu carrinho está vazio
            </Text>
            <Button 
              mt="6" 
              bg={theme.primary}
              _pressed={{ bg: theme.primaryDark }}
              size="lg"
              width="2/3"
              height="14"
              onPress={() => router.push("../(tabs)/produtos")}
              _text={{ fontSize: "md", fontWeight: "bold" }}
              shadow={2}
            >
              Explorar produtos
            </Button>
          </Center>
        )}
      </Box>
    );
}