import React, { useState } from 'react';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Pressable,
  Center,
  NativeBaseProvider,
  StatusBar,
  Input,
  Icon,
  Divider
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function Mensagens() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  
  // Dados de exemplo de conversas
  const data = [
    {
      id: "1",
      nome: "Ana Silva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      ultimaMensagem: "Oi, como você está?",
      horario: "09:30",
      naoLidas: 2,
    },
    {
      id: "2",
      nome: "Pedro Costa",
      avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
      ultimaMensagem: "Vamos marcar aquela reunião?",
      horario: "Ontem",
      naoLidas: 0,
    },
    {
      id: "3",
      nome: "Mariana Lima",
      avatar: "https://images.unsplash.com/photo-1614289371518-722f2615aa1f",
      ultimaMensagem: "Obrigada pelas informações!",
      horario: "11:42",
      naoLidas: 1,
    },
    {
      id: "4",
      nome: "João Mendes",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      ultimaMensagem: "O arquivo que você pediu está pronto",
      horario: "Seg",
      naoLidas: 0,
    },
    {
      id: "5",
      nome: "Carla Oliveira",
      avatar: "https://images.unsplash.com/photo-1531123414780-f74242c2b052",
      ultimaMensagem: "Você viu o email que te enviei?",
      horario: "10:15",
      naoLidas: 3,
    },
  ];

  // Função para filtrar os dados com base no texto de pesquisa
  const filteredData = data.filter(item => 
    item.nome.toLowerCase().includes(searchText.toLowerCase()) || 
    item.ultimaMensagem.toLowerCase().includes(searchText.toLowerCase())
  );

  // Renderizar cada item da lista
  const renderItem = ({ item }) => {
    return (
        <Pressable 
          onPress={() => {
            router.push({
              pathname: "../chat",
              params: {
                userId: item.id,
                nome: item.nome,
                avatar: item.avatar
              }
            });
          }}
          py="2"
        >
          <HStack space="3" alignItems="center" px="4" py="2">
            <Avatar size="md" source={{ uri: item.avatar }} />
            <VStack flex="1">
              <HStack justifyContent="space-between">
                <Text bold fontSize="md">{item.nome}</Text>
                <Text fontSize="xs" color="gray.500">{item.horario}</Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" color="gray.600" numberOfLines={1} flex="1" mr="2">
                  {item.ultimaMensagem}
                </Text>
                {item.naoLidas > 0 ? (
                  <Center bg="primary.600" rounded="full" w="6" h="6">
                    <Text color="white" fontSize="xs">{item.naoLidas}</Text>
                  </Center>
                ) : null}
              </HStack>
            </VStack>
          </HStack>
          <Divider my="1" />
        </Pressable>
      );
  };

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="primary.800" />
      <Box flex="1" bg="white">
        <HStack bg="primary.800" px="4" py="3" justifyContent="space-between" alignItems="center">
          <HStack space="2" alignItems="center">
            <Heading color="white" fontSize="xl">Mensagens</Heading>
          </HStack>
          <HStack space="2">
            <Icon as={<MaterialIcons name="more-vert" />} size="6" color="white" />
          </HStack>
        </HStack>

        <Box px="4" py="3">
          <Input
            placeholder="Pesquisar mensagens"
            bg="gray.100"
            width="100%"
            borderRadius="10"
            py="2"
            px="2"
            value={searchText}
            onChangeText={setSearchText}
            InputLeftElement={
              <Icon
                ml="2"
                size="5"
                color="gray.500"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              searchText.length > 0 ? (
                <Pressable onPress={() => setSearchText('')}>
                  <Icon
                    mr="2"
                    size="5"
                    color="gray.500"
                    as={<MaterialIcons name="close" />}
                  />
                </Pressable>
              ) : null
            }
          />
        </Box>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </NativeBaseProvider>
  );
}