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

// ------------------- COMPONENTE FAVORITOS -------------------
export default function Favoritos() {
  const [favoritos, setFavoritos] = useState(produtosExemplo);
  const toast = useToast();

  const removerFavorito = (id) => {
    setFavoritos(favoritos.filter(item => item.id !== id));
    toast.show({
      description: "Produto removido dos favoritos",
      placement: "top"
    });
  };

  const adicionarAoCarrinho = (produto) => {
    // Aqui seria implementada a lógica para adicionar ao carrinho
    toast.show({
      description: "Produto adicionado ao carrinho",
      placement: "top"
    });
  };

  // Renderizar cada item da lista de favoritos
  const renderItem = ({ item }) => (
    <Pressable>
      <Box 
        borderBottomWidth="1" 
        borderColor="coolGray.200" 
        pl="4" 
        pr="5" 
        py="2"
      >
        <HStack space={3} alignItems="center">
          <Image 
            source={{ uri: item.imagem }} 
            alt={item.nome}
            size="md"
            rounded="md"
          />
          <VStack width="60%">
            <Text 
              color="coolGray.800" 
              bold
              numberOfLines={1}
            >
              {item.nome}
            </Text>
            <Text 
              color="coolGray.600"
              numberOfLines={2}
            >
              {item.descricao}
            </Text>
            <HStack alignItems="center" space={1} mt="1">
              <Icon as={AntDesign} name="star" size="xs" color="amber.400" />
              <Text fontSize="xs" color="coolGray.700">{item.avaliacao}</Text>
            </HStack>
            <Text 
              color="emerald.600" 
              bold
              fontSize="md"
              mt="1"
            >
              R$ {item.preco.toFixed(2)}
            </Text>
          </VStack>
          <Spacer />
          <VStack space={2}>
            <IconButton
              colorScheme="red"
              variant="solid"
              rounded="full"
              size="sm"
              icon={<Icon as={AntDesign} name="delete" size="sm" />}
              onPress={() => removerFavorito(item.id)}
            />
            <IconButton
              colorScheme="emerald"
              variant="solid"
              rounded="full"
              size="sm"
              icon={<Icon as={AntDesign} name="shoppingcart" size="sm" />}
              onPress={() => adicionarAoCarrinho(item)}
            />
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <Box flex={1} bg="white" safeAreaTop>
      <HStack px="4" py="3" justifyContent="space-between" alignItems="center" bg="emerald.500">
        <HStack space={2} alignItems="center">
          <Icon as={AntDesign} name="heart" size="md" color="white" />
          <Text color="white" fontSize="lg" fontWeight="bold">Meus Favoritos</Text>
        </HStack>
        <IconButton 
          icon={<Icon as={AntDesign} name="search1" size="sm" color="white" />} 
          borderRadius="full"
          _pressed={{ bg: "emerald.600" }}
        />
      </HStack>

      {favoritos.length > 0 ? (
        <FlatList
          data={favoritos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Center flex={1}>
          <Icon as={AntDesign} name="hearto" size="4xl" color="coolGray.300" />
          <Text mt="4" fontSize="lg" color="coolGray.400">
            Você ainda não tem favoritos
          </Text>
          <Button mt="4" colorScheme="emerald">
            Explorar produtos
          </Button>
        </Center>
      )}
    </Box>
  );
}
