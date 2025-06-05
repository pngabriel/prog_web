import React from 'react';
import { VStack, Button, Text, Box, Heading, HStack, Divider, Icon, Avatar, Progress, Badge, ScrollView, Pressable, Center } from 'native-base';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const screenWidth = Dimensions.get("window").width;
  
  // Color Theme based on the provided CSS
  const colors = {
    primary: "#4CAF50",
    primaryDark: "#3e8e41",
    primaryLight: "#f0f9f0",
    danger: "#e53935",
    dangerDark: "#c62828",
    dangerLight: "#ffebee",
    text: "#333",
    textLight: "#666",
    background: "#F8F9FA",
  };
  
  type CardProps = {
    icon: string;
    iconColor: string;
    title: string;
    value: string | number;
    bgColor?: string;
  };
  
  const renderCard = ({ icon, iconColor, title, value, bgColor }: CardProps) => (
    <Pressable>
      <Box 
        bg={bgColor || "white"} 
        borderRadius="lg" 
        p={4} 
        width={screenWidth * 0.42} 
        shadow={3}
        style={{ elevation: 3 }}
      >
        <HStack space={2} alignItems="center" mb={2}>
          <Center bg={iconColor === "blue" ? colors.primaryLight : `${iconColor}.100`} p={2} borderRadius="md">
            <Icon 
              as={Ionicons} 
              name={icon} 
              size="md" 
              color={iconColor === "blue" ? colors.primary : `${iconColor}.600`} 
            />
          </Center>
          <Text color="gray.700" fontSize="sm" fontWeight="medium">{title}</Text>
        </HStack>
        <Text bold fontSize="xl" color="gray.800">{value}</Text>
      </Box>
    </Pressable>
  );

  type OrderItemProps = {
    orderNum: number;
    status: string;
    statusIcon: string;
    statusColor: string;
    date: string;
  };
  
  const renderOrderItem = ({ orderNum, status, statusIcon, statusColor, date }: OrderItemProps) => {
    // Map the statusColor to our new theme
    let borderColor = colors.primary;
    let bgColor = colors.primaryLight;
    let textColor = colors.primary;
    
    if (statusColor === "green") {
      borderColor = colors.primary;
      bgColor = colors.primaryLight;
      textColor = colors.primary;
    } else if (statusColor === "red") {
      borderColor = colors.danger;
      bgColor = colors.dangerLight;
      textColor = colors.danger;
    }
    
    return (
      <Pressable>
        <HStack 
          bg="white" 
          borderRadius="lg" 
          p={3} 
          mb={3} 
          alignItems="center" 
          justifyContent="space-between"
          borderLeftWidth={4}
          borderLeftColor={statusColor === "green" ? colors.primary : 
                          statusColor === "red" ? colors.danger : 
                          statusColor === "orange" ? "orange.500" : 
                          statusColor === "blue" ? colors.primary : `${statusColor}.500`}
          shadow={1}
        >
          <HStack space={3} alignItems="center">
            <Box 
              bg={statusColor === "green" ? colors.primaryLight : 
                statusColor === "red" ? colors.dangerLight : 
                statusColor === "blue" ? colors.primaryLight : 
                `${statusColor}.100`} 
              p={2} 
              borderRadius="full"
            >
              <Icon 
                as={Ionicons} 
                name={statusIcon} 
                size="sm" 
                color={statusColor === "green" ? colors.primary : 
                      statusColor === "red" ? colors.danger : 
                      statusColor === "blue" ? colors.primary : 
                      `${statusColor}.500`} 
              />
            </Box>
            <VStack>
              <Text bold color="gray.800">Pedido #{orderNum}</Text>
              <Text fontSize="xs" color="gray.600">{date}</Text>
            </VStack>
          </HStack>
          <Badge 
            colorScheme={statusColor} 
            _text={{
              fontWeight: "medium",
              color: statusColor === "green" ? colors.primary : 
                    statusColor === "red" ? colors.danger : 
                    statusColor === "blue" ? colors.primary : 
                    `${statusColor}.800`
            }}
            bg={statusColor === "green" ? colors.primaryLight : 
              statusColor === "red" ? colors.dangerLight : 
              statusColor === "blue" ? colors.primaryLight : 
              `${statusColor}.100`}
            rounded="md"
            px={2}
          >
            {status}
          </Badge>
        </HStack>
      </Pressable>
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com Gradiente */}
        <Box width="100%" overflow="hidden" bgColor={colors.primary}>
        <Box 
          bg={{
            linearGradient: {
              colors: [colors.primary, colors.primaryDark],
              start: [0, 0],
              end: [1, 0]
            }
          }} 
          borderBottomLeftRadius={30} 
          borderBottomRightRadius={30}
          borderTopLeftRadius={25}
          borderTopRightRadius={25}
          pt={8} 
          pb={8} 
          px={5}
          shadow={4}
        >
          <HStack width="100%" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center" space={3}>
              <Avatar 
                size="md"
                source={{ uri: 'https://images.icon-icons.com/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png' }}
                borderWidth={2}
                borderColor="white"
              >
                N
              </Avatar>
              <VStack>
                <Text fontSize="sm" color={colors.primaryLight} fontWeight="medium">Bem-vindo de volta,</Text>
                <Heading size="md" color="white">Nicolas</Heading>
              </VStack>
            </HStack>
            <HStack space={3}>
              <Center bg="rgba(255,255,255,0.3)" p={2} borderRadius="full">
                <Icon as={Ionicons} name="search" size="sm" color="white" />
              </Center>
              <Center bg="rgba(255,255,255,0.3)" p={2} borderRadius="full">
                <Icon as={Ionicons} name="notifications-outline" size="sm" color="white" />
              </Center>
            </HStack>
          </HStack>
          
          {/* Estatísticas em Cards */}
          <HStack justifyContent="space-between" mt={6}>
            <Box bg="rgba(255,255,255,0.3)" p={3} borderRadius="lg" width="48%">
              <Text color="white" fontSize="xs" fontWeight="medium">Total Gasto</Text>
              <HStack alignItems="baseline" space={1}>
                <Text color="white" bold fontSize="xl">R$ 1.200</Text>
                <Text color={colors.primaryLight} fontSize="xs" fontWeight="bold">+22%</Text>
              </HStack>
            </Box>
            <Box bg="rgba(255,255,255,0.3)" p={3} borderRadius="lg" width="48%">
              <Text color="white" fontSize="xs" fontWeight="medium">Pontos Fidelidade</Text>
              <HStack alignItems="baseline" space={1}>
                <Text color="white" bold fontSize="xl">820</Text>
                <Text color="yellow.100" fontSize="xs" fontWeight="bold">⭐</Text>
              </HStack>
            </Box>
          </HStack>
        </Box>
        </Box>

        <VStack space={6} px={5} pt={6} pb={10}>
          {/* Cards de estatísticas */}
          <VStack>
            <HStack justifyContent="space-between" mb={4} alignItems="center">
              <Heading size="sm" color="gray.800">Seus Números</Heading>
              <Pressable>
                <Text color={colors.primary} fontSize="sm" fontWeight="medium">Ver todos</Text>
              </Pressable>
            </HStack>
            <HStack justifyContent="space-between">
              {renderCard({
                icon: "receipt-outline",
                iconColor: "blue", // Will be mapped to primary
                title: "Pedidos",
                value: "12",
                bgColor: "white"
              })}
              {renderCard({
                icon: "cart-outline",
                iconColor: "orange",
                title: "Carrinho",
                value: "3 itens",
                bgColor: "white"
              })}
            </HStack>
          </VStack>

          {/* Progresso do Usuário */}
          <Box bg="white" shadow={2} borderRadius="lg" p={4} style={{ elevation: 2 }}>
            <HStack justifyContent="space-between" alignItems="center" mb={2}>
              <Heading size="sm" color="gray.800">Progresso Mensal</Heading>
              <Badge 
                bg={colors.primaryLight}
                _text={{ 
                  color: colors.primary,
                  fontWeight: "bold" 
                }} 
                rounded="full"
                px={2}
              >
                54%
              </Badge>
            </HStack>
            <Text fontSize="xs" color="gray.600" fontWeight="medium" mb={2}>Meta de compras mensais</Text>
            <Progress 
              value={54} 
              colorScheme="green" 
              bg="gray.200" 
              size="md"
              borderRadius="full"
              _filledTrack={{
                bg: colors.primary
              }}
            />
            <HStack mt={2} justifyContent="space-between">
              <Text fontSize="xs" color="gray.600" fontWeight="medium">R$ 650 de R$ 1.200</Text>
              <Text fontSize="xs" color={colors.primary} fontWeight="bold">Bom progresso!</Text>
            </HStack>
          </Box>

          {/* Últimos Pedidos */}
          <VStack>
            <HStack justifyContent="space-between" mb={4} alignItems="center">
              <Heading size="sm" color="gray.800">Últimos Pedidos</Heading>
              <Pressable>
                <Text color={colors.primary} fontSize="sm" fontWeight="medium">Ver todos</Text>
              </Pressable>
            </HStack>
            
            {renderOrderItem({
              orderNum: 1234,
              status: "Entregue",
              statusIcon: "checkmark-circle",
              statusColor: "green",
              date: "12 de março, 2025"
            })}
            {renderOrderItem({
              orderNum: 1240,
              status: "Em transporte",
              statusIcon: "car",
              statusColor: "blue",
              date: "28 de março, 2025"
            })}
            {renderOrderItem({
              orderNum: 1251,
              status: "Aguardando",
              statusIcon: "time",
              statusColor: "orange",
              date: "30 de março, 2025"
            })}
          </VStack>

          {/* Ofertas */}
          <Box 
            bg={{
              linearGradient: {
                colors: [colors.primary, colors.primaryDark],
                start: [0, 0],
                end: [1, 0]
              }
            }}
            bgColor={colors.primary}
            borderRadius="lg" 
            p={4}
            shadow={3}
            style={{ elevation: 3 }}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <VStack width="70%">
                <Text color="white" bold mb={1} fontSize="xs">OFERTAS ESPECIAIS</Text>
                <Heading size="md" color="white" mb={2}>10% OFF no próximo pedido</Heading>
                <Text color="white" fontSize="xs" mb={3} fontWeight="medium">Válido para compras acima de R$ 100,00</Text>
                <Button 
                  bg="white" 
                  _text={{ 
                    color: colors.primary, 
                    fontWeight: "bold" 
                  }} 
                  size="sm" 
                  alignSelf="flex-start"
                  shadow={1}
                  _pressed={{
                    bg: "gray.100"
                  }}
                >
                  RESGATAR
                </Button>
              </VStack>
              <Center>
                <Icon as={MaterialCommunityIcons} name="tag-multiple" size="3xl" color="white" opacity={0.8} />
              </Center>
            </HStack>
          </Box>

          {/* Ações Rápidas */}
          <VStack>
            <Heading size="sm" mb={4} color="gray.800">Ações Rápidas</Heading>
            <HStack justifyContent="space-between">
              <Pressable>
                <Center 
                  bg={colors.primaryLight}
                  width={16} 
                  height={16} 
                  borderRadius="lg" 
                  shadow={1}
                  style={{ elevation: 1 }}
                >
                  <Icon as={Ionicons} name="list-outline" size="md" color={colors.primary} />
                </Center>
                <Text fontSize="xs" mt={2} textAlign="center" fontWeight="medium" color="gray.700">Pedidos</Text>
              </Pressable>
              
              <Pressable>
                <Center 
                  bg={colors.primaryLight}
                  width={16} 
                  height={16} 
                  borderRadius="lg" 
                  shadow={1}
                  style={{ elevation: 1 }}
                >
                  <Icon as={Ionicons} name="cart-outline" size="md" color={colors.primary} />
                </Center>
                <Text fontSize="xs" mt={2} textAlign="center" fontWeight="medium" color="gray.700">Carrinho</Text>
              </Pressable>
              
              <Pressable>
                <Center 
                  bg="purple.50" 
                  width={16} 
                  height={16} 
                  borderRadius="lg" 
                  shadow={1}
                  style={{ elevation: 1 }}
                >
                  <Icon as={Ionicons} name="heart-outline" size="md" color="purple.600" />
                </Center>
                <Text fontSize="xs" mt={2} textAlign="center" fontWeight="medium" color="gray.700">Favoritos</Text>
              </Pressable>
              
              <Pressable>
                <Center 
                  bg="gray.100" 
                  width={16} 
                  height={16} 
                  borderRadius="lg" 
                  shadow={1}
                  style={{ elevation: 1 }}
                >
                  <Icon as={Ionicons} name="settings-outline" size="md" color="gray.600" />
                </Center>
                <Text fontSize="xs" mt={2} textAlign="center" fontWeight="medium" color="gray.700">Ajustes</Text>
              </Pressable>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}