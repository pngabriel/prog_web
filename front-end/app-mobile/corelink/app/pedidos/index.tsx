import { VStack, Text, FlatList, Button, Box, HStack, Icon, Badge } from "native-base";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const pedidos = [
  { id: "1", status: "Pendente", total: 150.75, data: "10/03/2024", pagamento: "Cartão de Crédito", endereco: "Rua A, 123" },
  { id: "2", status: "Entregue", total: 89.99, data: "05/03/2024", pagamento: "Pix", endereco: "Rua B, 456" },
  { id: "3", status: "Cancelado", total: 45.50, data: "02/03/2024", pagamento: "Boleto", endereco: "Rua C, 789" },
  { id: "4", status: "Em andamento", total: 120.30, data: "08/03/2024", pagamento: "Cartão de Débito", endereco: "Rua D, 101" },
  { id: "5", status: "Em andamento", total: 220.10, data: "12/03/2024", pagamento: "Dinheiro", endereco: "Rua E, 202" },
];

const statusIcons: Record<string, { icon: string; color: string }> = {
  "Pendente": { icon: "time-outline", color: "yellow.500" },
  "Entregue": { icon: "checkmark-done-circle-outline", color: "green.500" },
  "Cancelado": { icon: "close-circle-outline", color: "red.500" },
  "Em andamento": { icon: "refresh-circle-outline", color: "blue.500" },
};


export default function PedidosScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} bg="gray.50">
      {/* Header */}
      <Box bg="blue.600" py={4} px={5} shadow={3} pt={10}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" color="white" fontWeight="bold">Meus Pedidos</Text>
          <Icon as={Ionicons} name="cart-outline" size={7} color="white" />
        </HStack>
      </Box>

      <VStack flex={1} p={5}>
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box bg="white" p={4} mb={3} borderRadius={10} shadow={3}>
              <HStack alignItems="center" justifyContent="space-between" mb={2}>
                <Text fontSize="lg" bold>Pedido #{item.id}</Text>
                
                <HStack alignItems="center" space={1}>
                  <Icon as={Ionicons} name={statusIcons[item.status].icon} size={6} color={statusIcons[item.status].color} />
                  <Badge colorScheme={statusIcons[item.status].color.replace(".500", "")} px={2}>
                    {item.status}
                  </Badge>
                </HStack>
              </HStack>

              <Text fontSize="sm" color="gray.500">Data: {item.data}</Text>
              <Text>
                Status:{" "}
                <Badge colorScheme={statusIcons[item.status].color.replace(".500", "")} px={2}>
                  {item.status}
                </Badge>
              </Text>
              <Text>
                Total: <Text bold color="green.600">R$ {item.total.toFixed(2)}</Text>
              </Text>
              <Text>
                Pagamento: <Text bold>{item.pagamento}</Text>
              </Text>
              <Text>
                Entrega: <Text bold>{item.endereco}</Text>
              </Text>

              <HStack mt={3} space={2}>
                <Button colorScheme="blue" flex={1} onPress={() => router.push("../detalhes_pedido")}>
                  Ver detalhes
                </Button>
                {item.status === "Pendente" && (
                  <Button colorScheme="red" flex={1}>Cancelar</Button>
                )}
              </HStack>
            </Box>

          )}
        />
      </VStack>
    </VStack>
  );
}