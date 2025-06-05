import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  FlatList,
  HStack,
  Avatar,
  Text,
  VStack,
  Input,
  IconButton,
  Icon,
  Pressable,
  NativeBaseProvider,
  StatusBar,
  Heading,
  Divider
} from 'native-base';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function Chat() {
  const route = useRoute();
  const navigation = useNavigation();
  const [mensagem, setMensagem] = useState('');
  const flatListRef = useRef(null);

  // Receber dados da pessoa selecionada na tela de Mensagens
  const { userId, nome, avatar } = route.params || { 
    userId: "1", 
    nome: "Ana Silva", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
  };

  // Dados de exemplo das mensagens
  const [mensagens, setMensagens] = useState([
    {
      id: "1",
      texto: "Olá, tudo bem?",
      enviado: false,
      horario: "10:30"
    },
    {
      id: "2",
      texto: "Oi! Tudo ótimo e com você?",
      enviado: true,
      horario: "10:32"
    },
    {
      id: "3",
      texto: "Estou bem também! Queria saber se você vai estar livre amanhã para discutirmos aquele projeto.",
      enviado: false,
      horario: "10:33"
    },
    {
      id: "4",
      texto: "Sim, estou disponível. Que horas seria bom para você?",
      enviado: true,
      horario: "10:35"
    },
    {
      id: "5",
      texto: "Que tal às 14h?",
      enviado: false,
      horario: "10:36"
    }
  ]);

  // Função para enviar mensagem
  const enviarMensagem = () => {
    if (mensagem.trim() === '') return;
    
    const novaMensagem = {
      id: String(mensagens.length + 1),
      texto: mensagem,
      enviado: true,
      horario: new Date().toLocaleTimeString().slice(0, 5)
    };
    
    setMensagens([...mensagens, novaMensagem]);
    setMensagem('');
  };

  // Rolar para a última mensagem quando uma nova for enviada
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [mensagens]);

  // Renderizar uma mensagem
  const renderMensagem = ({ item }) => {
    return (
      <Box
        alignSelf={item.enviado ? "flex-end" : "flex-start"}
        bg={item.enviado ? "primary.600" : "gray.200"}
        px="3"
        py="2"
        mx="3"
        my="1"
        borderRadius="lg"
        maxWidth="80%"
      >
        <Text color={item.enviado ? "white" : "black"}>{item.texto}</Text>
        <Text fontSize="xs" color={item.enviado ? "white" : "gray.500"} alignSelf="flex-end">
          {item.horario}
        </Text>
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="primary.800" />
      <Box flex="1" bg="white">
        {/* Cabeçalho */}
        <HStack bg="primary.800" px="2" py="3" justifyContent="space-between" alignItems="center">
          <HStack space="2" alignItems="center" flex="1">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon as={<MaterialIcons name="arrow-back" />} size="6" color="white" />
            </Pressable>
            <Avatar size="sm" source={{ uri: avatar }} />
            <VStack>
              <Heading color="white" fontSize="md" ml="2">{nome}</Heading>
              <Text color="white" fontSize="xs" ml="2">Online</Text>
            </VStack>
          </HStack>
          <HStack space="3">
            <Icon as={<MaterialIcons name="videocam" />} size="6" color="white" />
            <Icon as={<MaterialIcons name="call" />} size="6" color="white" />
            <Icon as={<MaterialIcons name="more-vert" />} size="6" color="white" />
          </HStack>
        </HStack>
        
        <Divider />
        
        {/* Lista de mensagens */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={90}
          style={{ flex: 1 }}
        >
          <FlatList
            ref={flatListRef}
            data={mensagens}
            renderItem={renderMensagem}
            keyExtractor={item => item.id}
            flex="1"
            bg="gray.50"
            contentContainerStyle={{ paddingVertical: 10 }}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />
          
          {/* Input para nova mensagem */}
          <HStack space="2" alignItems="center" p="2" bg="white">
            <IconButton
              icon={<Icon as={<Ionicons name="happy-outline" />} size="6" color="gray.500" />}
              borderRadius="full"
              variant="ghost"
            />
            <Input
              flex="1"
              placeholder="Digite uma mensagem..."
              variant="rounded"
              bg="gray.100"
              value={mensagem}
              onChangeText={setMensagem}
              fontSize="md"
              py="2"
            />
            {mensagem.trim() !== '' ? (
              <IconButton
                icon={<Icon as={<Ionicons name="send" />} size="6" color="primary.600" />}
                borderRadius="full"
                variant="ghost"
                onPress={enviarMensagem}
              />
            ) : (
              <>
                <IconButton
                  icon={<Icon as={<Ionicons name="mic-outline" />} size="6" color="gray.500" />}
                  borderRadius="full"
                  variant="ghost"
                />
                <IconButton
                  icon={<Icon as={<Ionicons name="camera-outline" />} size="6" color="gray.500" />}
                  borderRadius="full"
                  variant="ghost"
                />
              </>
            )}
          </HStack>
        </KeyboardAvoidingView>
      </Box>
    </NativeBaseProvider>
  );
}