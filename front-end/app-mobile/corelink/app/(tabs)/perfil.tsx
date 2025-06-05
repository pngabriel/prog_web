import { VStack, Text, Avatar, Button, Icon, Divider, Box, HStack, Badge, Progress, ScrollView, Switch } from "native-base";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Perfil() {
  const router = useRouter();
  const isDarkMode = false; // Simulação do estado de tema escuro
  
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

  return (
    <ScrollView flex={1} bg="gray.100">
      <VStack alignItems="center" justifyContent="center" space={4} p={5} mt={10}>
        <Avatar size="xl" source={{ uri: "https://via.placeholder.com/150" }} />
        <Text fontSize="xl" fontWeight="bold">Nome do Usuário</Text>
        <Text fontSize="md" color="gray.500">email@exemplo.com</Text>
        
        <Box alignItems="center" width="100%">
          <Text fontSize="sm" color="gray.600">Membro desde: Janeiro de 2022</Text>
          <Text fontSize="sm" color="gray.600">Último login: 10 minutos atrás</Text>
          <Badge 
            bg={colors.primaryLight}
            _text={{ color: colors.primary }}
            mt={2}
          >
            Conta Verificada
          </Badge>
        </Box>

        <Divider my={3} />

        <Box width="100%" px={4}>
          <Text fontSize="md" fontWeight="bold" mb={2}>Progresso do Perfil</Text>
          <Progress 
            value={80} 
            colorScheme="blue" 
            mb={4} 
            _filledTrack={{
              bg: colors.primary
            }}
          />
        </Box>

        <VStack space={4} width="100%">
          <Button 
            bg={colors.primary}
            _pressed={{ bg: colors.primaryDark }}
            leftIcon={<Icon as={Ionicons} name="list-outline" size="sm" />} 
            onPress={() => router.push("../pedidos")}
          >
            Ver Pedidos
          </Button>
          <Button 
            bg={colors.primary}
            _pressed={{ bg: colors.primaryDark }}
            leftIcon={<Icon as={Ionicons} name="cart-outline" size="sm" />} 
            onPress={() => router.push("../carrinho_compra")}
          >
            Adicionar ao Carrinho
          </Button>
          <Button 
            colorScheme="gray" 
            leftIcon={<Icon as={Ionicons} name="settings-outline" size="sm" />} 
            onPress={() => router.push("../configuracoes")}
          >
            Configurações
          </Button>
          <Button 
            colorScheme="purple" 
            leftIcon={<Icon as={Ionicons} name="heart-outline" size="sm" />} 
            onPress={() => router.push("../favoritos")}
          >
            Favoritos
          </Button>
          <Button 
            bg={colors.primary}
            _pressed={{ bg: colors.primaryDark }}
            leftIcon={<Icon as={Ionicons} name="chatbubble-ellipses-outline" size="sm" />} 
            onPress={() => router.push("../mensagens")}
          >
            Mensagens
          </Button>
        </VStack>

        <Divider my={3} />

        <Box width="100%" px={4}>
          <Text fontSize="md" fontWeight="bold" mb={2}>Estatísticas</Text>
          <HStack justifyContent="space-between">
            <Box alignItems="center">
              <Text fontSize="lg" fontWeight="bold">120</Text>
              <Text fontSize="sm" color="gray.500">Pedidos</Text>
            </Box>
            <Box alignItems="center">
              <Text fontSize="lg" fontWeight="bold">35</Text>
              <Text fontSize="sm" color="gray.500">Favoritos</Text>
            </Box>
            <Box alignItems="center">
              <Text fontSize="lg" fontWeight="bold">4.8</Text>
              <Text fontSize="sm" color="gray.500">Avaliação</Text>
            </Box>
            <Box alignItems="center">
              <Text fontSize="lg" fontWeight="bold">5</Text>
              <Text fontSize="sm" color="gray.500">Cupons Ativos</Text>
            </Box>
          </HStack>
        </Box>

        <Divider my={3} />

        <Box width="100%" px={4} alignItems="center">
          <HStack space={3} alignItems="center">
            <Text fontSize="md">Modo Escuro</Text>
            <Switch 
              isChecked={isDarkMode} 
              onToggle={() => console.log("Alterar tema")}
              onTrackColor={colors.primary}
            />
          </HStack>
        </Box>

        <Divider my={3} />

        <Button 
          bg={colors.danger}
          _pressed={{ bg: colors.dangerDark }}
          leftIcon={<Icon as={Ionicons} name="log-out-outline" size="sm" />} 
          onPress={() => router.push("../login")}
        >
          Sair
        </Button>
        <Button 
          bg={colors.primary}
          _pressed={{ bg: colors.primaryDark }}
          leftIcon={<Icon as={Ionicons} name="analytics-outline" size="sm" />} 
          onPress={() => router.push("../painel_gerencial_produtos")}
          mt={3}
        >
          Painel Gerencial
        </Button>
      </VStack>
    </ScrollView>
  );
}