import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  IconButton,
  Button,
  Divider,
  ScrollView,
  Input,
  FormControl,
  Select,
  CheckIcon,
  Icon,
  useToast,
  Radio,
  Checkbox,
  Badge,
  Center,
  Spinner,
  useColorModeValue
} from "native-base";
import { AntDesign, Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

// Cores do tema baseadas no CSS
const THEME_COLORS = {
  primary: "#4CAF50",
  primaryDark: "#3e8e41",
  danger: "#e53935",
  dangerDark: "#c62828",
  white: "#fff",
  background: "#f0f9f0",
  text: "#333",
  lightBackground: "rgba(255, 255, 255, 0.95)",
  cardBg: "#fff",
  shadow: "rgba(0, 0, 0, 0.1)"
};

// Dados de exemplo para o carrinho
const produtosCarrinho = [
  {
    id: "1",
    nome: "Smartphone XYZ Pro",
    preco: 2499.99,
    imagem: "https://via.placeholder.com/150",
    quantidade: 1,
  },
  {
    id: "3",
    nome: "Fone de Ouvido Bluetooth",
    preco: 299.99,
    imagem: "https://via.placeholder.com/150",
    quantidade: 2,
  },
];

export default function FinalizarCompra() {
  const [endereco, setEndereco] = useState({
    nome: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  
  const [metodoPagamento, setMetodoPagamento] = useState("cartao");
  const [formaPagamento, setFormaPagamento] = useState("credito");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [parcelas, setParcelas] = useState("1");
  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();

  // Calcular subtotal
  const subtotal = produtosCarrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );
  
  // Calcular frete
  const frete = 25.90;
  
  // Calcular desconto
  const desconto = cupomAplicado ? subtotal * 0.1 : 0;
  
  // Calcular total
  const total = subtotal + frete - desconto;

  const aplicarCupom = () => {
    if (!cupom) {
      toast.show({
        description: "Digite um cupom válido",
        placement: "top",
        backgroundColor: THEME_COLORS.danger
      });
      return;
    }
    
    if (cupom === "DESCONTO10") {
      setCupomAplicado(true);
      toast.show({
        description: "Cupom aplicado com sucesso!",
        placement: "top",
        backgroundColor: THEME_COLORS.primary
      });
    } else {
      toast.show({
        description: "Cupom inválido!",
        placement: "top",
        backgroundColor: THEME_COLORS.danger
      });
    }
  };

  const buscarCEP = async () => {
    const cep = endereco.cep.replace(/\D/g, "");
    
    // Validar formato do CEP
    if (cep.length !== 8) {
      toast.show({
        description: "CEP inválido. Digite os 8 números do CEP.",
        placement: "top",
        backgroundColor: THEME_COLORS.danger
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast.show({
          description: "CEP não encontrado",
          placement: "top",
          backgroundColor: THEME_COLORS.danger
        });
        return;
      }
      
      setEndereco(prev => ({
        ...prev,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }));
      
      toast.show({
        description: "Endereço encontrado!",
        placement: "top",
        backgroundColor: THEME_COLORS.primary
      });
    } catch (error) {
      toast.show({
        description: "Erro ao buscar CEP. Tente novamente.",
        placement: "top",
        backgroundColor: THEME_COLORS.danger
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatarNumeroCartao = (texto) => {
    const numeroLimpo = texto.replace(/\D/g, "");
    const grupos = [];
    
    for (let i = 0; i < numeroLimpo.length && i < 16; i += 4) {
      grupos.push(numeroLimpo.slice(i, i + 4));
    }
    
    return grupos.join(" ");
  };
  
  const formatarValidade = (texto) => {
    const validadeLimpa = texto.replace(/\D/g, "");
    
    if (validadeLimpa.length <= 2) {
      return validadeLimpa;
    }
    
    return `${validadeLimpa.slice(0, 2)}/${validadeLimpa.slice(2, 4)}`;
  };

  const finalizarPedido = () => {
    if (!aceitarTermos) {
      toast.show({
        description: "Você precisa aceitar os termos e condições",
        placement: "top",
        backgroundColor: THEME_COLORS.danger
      });
      return;
    }
    
    // Validar campos do formulário
    if (!endereco.nome || !endereco.cep || !endereco.endereco || 
        !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      toast.show({
        description: "Preencha todos os campos de endereço obrigatórios",
        placement: "top",
        backgroundColor: THEME_COLORS.danger
      });
      return;
    }
    
    if (metodoPagamento === "cartao") {
      if (!numeroCartao || !nomeCartao || !validadeCartao || !cvvCartao) {
        toast.show({
          description: "Preencha todos os dados do cartão",
          placement: "top",
          backgroundColor: THEME_COLORS.danger
        });
        return;
      }
    }
    
    // Simular finalização bem-sucedida
    toast.show({
      description: "Pedido finalizado com sucesso!",
      placement: "top",
      backgroundColor: THEME_COLORS.primary
    });
  };

  return (
    <Box flex={1} bg={THEME_COLORS.background} safeAreaTop>
      {/* Header */}
      <HStack px="4" py="3" justifyContent="space-between" alignItems="center" bg={THEME_COLORS.primary}>
        <HStack space={2} alignItems="center">
          <Icon as={MaterialIcons} name="store" size="md" color={THEME_COLORS.white} />
          <Text color={THEME_COLORS.white} fontSize="lg" fontWeight="bold" letterSpacing="1px">CORELINK</Text>
        </HStack>
        {/* <HStack>
          <Icon as={Ionicons} name="cart-outline" size="md" color={THEME_COLORS.white} />
          <Badge colorScheme="danger" rounded="full" zIndex={1} variant="solid" alignSelf="flex-start" _text={{ fontSize: 10 }}>
            {produtosCarrinho.length}
          </Badge>
        </HStack> */}
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p="4" space={4}>
          {/* Título da página */}
          <Heading size="lg" color={THEME_COLORS.text} letterSpacing="1px">Finalizar Compra</Heading>
          <Divider />
          
          {/* Resumo do pedido */}
          <Box bg={THEME_COLORS.cardBg} p="4" rounded="md" shadow={2}>
            <Heading size="md" mb="4" color={THEME_COLORS.text}>Resumo do Pedido</Heading>
            
            {produtosCarrinho.map((item) => (
              <HStack key={item.id} space={3} alignItems="center" py="2">
                {/* <Image 
                  source={{ uri: item.imagem }} 
                  alt={item.nome}
                  size="sm"
                  rounded="sm"
                /> */}
                <VStack flex={1}>
                  <Text fontWeight="medium" fontSize="sm">{item.nome}</Text>
                  <Text fontSize="xs" color="coolGray.500">Quantidade: {item.quantidade}</Text>
                </VStack>
                <Text fontWeight="bold" color={THEME_COLORS.text}>
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </Text>
              </HStack>
            ))}
            
            <Divider my="3" />
            
            {/* Cupom de desconto */}
            <HStack space={2} alignItems="center" mb="3">
              <Input 
                flex={1}
                placeholder="Cupom de desconto" 
                value={cupom}
                onChangeText={setCupom}
                focusOutlineColor={THEME_COLORS.primary}
                borderColor="coolGray.300"
              />
              <Button 
                onPress={aplicarCupom}
                bg={THEME_COLORS.primary}
                _pressed={{ bg: THEME_COLORS.primaryDark }}
              >
                Aplicar
              </Button>
            </HStack>
            
            {/* Valores */}
            <VStack space={2}>
              <HStack justifyContent="space-between">
                <Text color="coolGray.600">Subtotal</Text>
                <Text>R$ {subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="coolGray.600">Frete</Text>
                <Text>R$ {frete.toFixed(2)}</Text>
              </HStack>
              {cupomAplicado && (
                <HStack justifyContent="space-between">
                  <Text color={THEME_COLORS.primary}>Desconto (10%)</Text>
                  <Text color={THEME_COLORS.primary}>- R$ {desconto.toFixed(2)}</Text>
                </HStack>
              )}
              <Divider my="2" />
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">Total</Text>
                <Text fontWeight="bold" fontSize="lg" color={THEME_COLORS.primary}>
                  R$ {total.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </Box>
          
          {/* Endereço de entrega */}
          <Box bg={THEME_COLORS.cardBg} p="4" rounded="md" shadow={2}>
            <Heading size="md" mb="4" color={THEME_COLORS.text}>Endereço de Entrega</Heading>
            
            <VStack space={3}>
              <FormControl isRequired>
                <FormControl.Label>Nome completo</FormControl.Label>
                <Input 
                  value={endereco.nome}
                  onChangeText={(text) => setEndereco({...endereco, nome: text})}
                  placeholder="Seu nome completo"
                  focusOutlineColor={THEME_COLORS.primary}
                  borderColor="coolGray.300"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormControl.Label>CEP</FormControl.Label>
                <Input 
                  value={endereco.cep}
                  onChangeText={(text) => {
                    const cepLimpo = text.replace(/\D/g, "").substring(0, 8);
                    setEndereco({...endereco, cep: cepLimpo});
                  }}
                  placeholder="Digite apenas números"
                  keyboardType="numeric"
                  focusOutlineColor={THEME_COLORS.primary}
                  borderColor="coolGray.300"
                  InputRightElement={
                    isLoading ? (
                      <Spinner color={THEME_COLORS.primary} size="sm" mr="2" />
                    ) : (
                      <Button 
                        size="sm" 
                        rounded="none" 
                        h="full" 
                        onPress={buscarCEP}
                        bg={THEME_COLORS.primary}
                        _pressed={{ bg: THEME_COLORS.primaryDark }}
                      >
                        Buscar
                      </Button>
                    )
                  }
                />
                <FormControl.HelperText>
                  Digite o CEP para buscar seu endereço automaticamente
                </FormControl.HelperText>
              </FormControl>
              
              <FormControl isRequired>
                <FormControl.Label>Endereço</FormControl.Label>
                <Input 
                  value={endereco.endereco}
                  onChangeText={(text) => setEndereco({...endereco, endereco: text})}
                  placeholder="Rua, Avenida, etc."
                  focusOutlineColor={THEME_COLORS.primary}
                  borderColor="coolGray.300"
                />
              </FormControl>
              
              <HStack space={2}>
                <FormControl isRequired flex={1}>
                  <FormControl.Label>Número</FormControl.Label>
                  <Input 
                    value={endereco.numero}
                    onChangeText={(text) => setEndereco({...endereco, numero: text})}
                    placeholder="123"
                    focusOutlineColor={THEME_COLORS.primary}
                    borderColor="coolGray.300"
                  />
                </FormControl>
                
                <FormControl flex={2}>
                  <FormControl.Label>Complemento</FormControl.Label>
                  <Input 
                    value={endereco.complemento}
                    onChangeText={(text) => setEndereco({...endereco, complemento: text})}
                    placeholder="Apto, Bloco, etc."
                    focusOutlineColor={THEME_COLORS.primary}
                    borderColor="coolGray.300"
                  />
                </FormControl>
              </HStack>
              
              <FormControl isRequired>
                <FormControl.Label>Bairro</FormControl.Label>
                <Input 
                  value={endereco.bairro}
                  onChangeText={(text) => setEndereco({...endereco, bairro: text})}
                  placeholder="Seu bairro"
                  focusOutlineColor={THEME_COLORS.primary}
                  borderColor="coolGray.300"
                />
              </FormControl>
              
              <HStack space={2}>
                <FormControl isRequired flex={2}>
                  <FormControl.Label>Cidade</FormControl.Label>
                  <Input 
                    value={endereco.cidade}
                    onChangeText={(text) => setEndereco({...endereco, cidade: text})}
                    placeholder="Sua cidade"
                    focusOutlineColor={THEME_COLORS.primary}
                    borderColor="coolGray.300"
                  />
                </FormControl>
                
                <FormControl isRequired flex={1}>
                  <FormControl.Label>Estado</FormControl.Label>
                  <Select
                    selectedValue={endereco.estado}
                    minWidth="70"
                    accessibilityLabel="Selecione o estado"
                    placeholder="UF"
                    _selectedItem={{
                      bg: THEME_COLORS.background,
                      endIcon: <CheckIcon size="5" color={THEME_COLORS.primary} />
                    }}
                    onValueChange={(itemValue) => setEndereco({...endereco, estado: itemValue})}
                    borderColor="coolGray.300"
                    focusOutlineColor={THEME_COLORS.primary}
                    dropdownIcon={
                      <Icon as={MaterialIcons} name="arrow-drop-down" size="md" color={THEME_COLORS.primary} />
                    }
                  >
                    {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((estado) => (
                      <Select.Item key={estado} label={estado} value={estado} />
                    ))}
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          </Box>
          
          {/* Forma de pagamento */}
          <Box bg={THEME_COLORS.cardBg} p="4" rounded="md" shadow={2}>
            <Heading size="md" mb="4" color={THEME_COLORS.text}>Forma de Pagamento</Heading>
            
            <Radio.Group name="metodoPagamento" value={metodoPagamento} onChange={setMetodoPagamento}>
              <VStack space={3}>
                <Radio value="cartao" colorScheme="green" size="sm">
                  <HStack alignItems="center" space={2}>
                    <Icon as={AntDesign} name="creditcard" size="sm" color="coolGray.600" />
                    <Text>Cartão de Crédito/Débito</Text>
                  </HStack>
                </Radio>
                
                <Radio value="boleto" colorScheme="green" size="sm">
                  <HStack alignItems="center" space={2}>
                    <Icon as={AntDesign} name="barcode" size="sm" color="coolGray.600" />
                    <Text>Boleto Bancário</Text>
                  </HStack>
                </Radio>
                
                <Radio value="pix" colorScheme="green" size="sm">
                  <HStack alignItems="center" space={2}>
                    <Icon as={MaterialIcons} name="qr-code" size="sm" color="coolGray.600" />
                    <Text>PIX</Text>
                  </HStack>
                </Radio>
              </VStack>
            </Radio.Group>
            
            {metodoPagamento === "cartao" && (
              <VStack space={3} mt="4">
                <Radio.Group name="formaPagamento" value={formaPagamento} onChange={setFormaPagamento}>
                  <HStack space={4}>
                    <Radio value="credito" colorScheme="green" size="sm">
                      <Text>Crédito</Text>
                    </Radio>
                    <Radio value="debito" colorScheme="green" size="sm">
                      <Text>Débito</Text>
                    </Radio>
                  </HStack>
                </Radio.Group>
                
                <FormControl isRequired>
                  <FormControl.Label>Número do cartão</FormControl.Label>
                  <Input 
                    value={numeroCartao}
                    onChangeText={(text) => {
                      const formatado = formatarNumeroCartao(text);
                      setNumeroCartao(formatado);
                    }}
                    placeholder="0000 0000 0000 0000"
                    keyboardType="numeric"
                    maxLength={19} // 16 dígitos + 3 espaços
                    focusOutlineColor={THEME_COLORS.primary}
                    borderColor="coolGray.300"
                    InputLeftElement={
                      <Icon as={AntDesign} name="creditcard" size="sm" color="coolGray.500" ml="2" />
                    }
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormControl.Label>Nome no cartão</FormControl.Label>
                  <Input 
                    value={nomeCartao}
                    onChangeText={setNomeCartao}
                    placeholder="Nome como está no cartão"
                    autoCapitalize="characters"
                    focusOutlineColor={THEME_COLORS.primary}
                    borderColor="coolGray.300"
                    InputLeftElement={
                      <Icon as={AntDesign} name="user" size="sm" color="coolGray.500" ml="2" />
                    }
                  />
                </FormControl>
                
                <HStack space={2}>
                  <FormControl isRequired flex={1}>
                    <FormControl.Label>Validade</FormControl.Label>
                    <Input 
                      value={validadeCartao}
                      onChangeText={(text) => {
                        const formatado = formatarValidade(text);
                        setValidadeCartao(formatado);
                      }}
                      placeholder="MM/AA"
                      maxLength={5}
                      keyboardType="numeric"
                      focusOutlineColor={THEME_COLORS.primary}
                      borderColor="coolGray.300"
                      InputLeftElement={
                        <Icon as={AntDesign} name="calendar" size="sm" color="coolGray.500" ml="2" />
                      }
                    />
                  </FormControl>
                  
                  <FormControl isRequired flex={1}>
                    <FormControl.Label>CVV</FormControl.Label>
                    <Input 
                      value={cvvCartao}
                      onChangeText={(text) => {
                        const cvvLimpo = text.replace(/\D/g, "").substring(0, 3);
                        setCvvCartao(cvvLimpo);
                      }}
                      placeholder="123"
                      keyboardType="numeric"
                      maxLength={3}
                      focusOutlineColor={THEME_COLORS.primary}
                      borderColor="coolGray.300"
                      InputLeftElement={
                        <Icon as={Feather} name="lock" size="sm" color="coolGray.500" ml="2" />
                      }
                    />
                  </FormControl>
                </HStack>
                
                {formaPagamento === "credito" && (
                  <FormControl isRequired>
                    <FormControl.Label>Parcelas</FormControl.Label>
                    <Select
                      selectedValue={parcelas}
                      accessibilityLabel="Escolha o número de parcelas"
                      placeholder="Selecione as parcelas"
                      _selectedItem={{
                        bg: THEME_COLORS.background,
                        endIcon: <CheckIcon size="5" color={THEME_COLORS.primary} />
                      }}
                      onValueChange={setParcelas}
                      borderColor="coolGray.300"
                      focusOutlineColor={THEME_COLORS.primary}
                      dropdownIcon={
                        <Icon as={MaterialIcons} name="arrow-drop-down" size="md" color={THEME_COLORS.primary} />
                      }
                    >
                      <Select.Item label={`1x de R$ ${(total).toFixed(2)} sem juros`} value="1" />
                      <Select.Item label={`2x de R$ ${(total/2).toFixed(2)} sem juros`} value="2" />
                      <Select.Item label={`3x de R$ ${(total/3).toFixed(2)} sem juros`} value="3" />
                      <Select.Item label={`4x de R$ ${(total/4).toFixed(2)} sem juros`} value="4" />
                      <Select.Item label={`5x de R$ ${(total/5).toFixed(2)} sem juros`} value="5" />
                      <Select.Item label={`6x de R$ ${(total/6).toFixed(2)} sem juros`} value="6" />
                    </Select>
                  </FormControl>
                )}
              </VStack>
            )}
            
            {metodoPagamento === "boleto" && (
              <VStack space={3} mt="4" p="3" bg={THEME_COLORS.background} rounded="md">
                <HStack alignItems="center" space={2}>
                 <Icon as={AntDesign} name="infocirlceo" size="sm" color={THEME_COLORS.primary} />
                  <Text color="coolGray.600" fontSize="sm" flex={1}>
                    O boleto será gerado após a confirmação do pedido e terá vencimento em 3 dias úteis.
                  </Text>
                </HStack>
                <HStack alignItems="center" space={2}>
                  <Icon as={AntDesign} name="clockcircleo" size="sm" color={THEME_COLORS.primary} />
                  <Text color="coolGray.600" fontSize="sm" flex={1}>
                    Após o pagamento, o pedido será processado em até 2 dias úteis.
                  </Text>
                </HStack>
              </VStack>
            )}
            
            {metodoPagamento === "pix" && (
              <VStack space={3} mt="4" alignItems="center">
                <HStack alignItems="center" space={2}>
                  <Icon as={AntDesign} name="infocirlceo" size="sm" color={THEME_COLORS.primary} />
                  <Text color="coolGray.600" fontSize="sm">
                    O código PIX será gerado após a confirmação do pedido.
                  </Text>
                </HStack>
                <Box 
                  borderWidth="1" 
                  borderColor="coolGray.300" 
                  borderStyle="dashed"
                  p="4" 
                  rounded="md"
                  alignItems="center"
                  bg={THEME_COLORS.background}
                  w="full"
                >
                  <Icon as={MaterialIcons} name="qr-code" size="2xl" color={THEME_COLORS.text} />
                  <Text fontSize="xs" color="coolGray.500" mt="2" textAlign="center">QR Code será gerado após finalizar</Text>
                </Box>
                <Text color={THEME_COLORS.primary} fontSize="xs" fontWeight="bold">
                  O pagamento via PIX é processado instantaneamente.
                </Text>
              </VStack>
            )}
          </Box>
          
          {/* Termos e condições */}
          <Box bg={THEME_COLORS.cardBg} p="4" rounded="md" shadow={2}>
            <Checkbox 
              value="termos" 
              isChecked={aceitarTermos}
              onChange={setAceitarTermos}
              colorScheme="green"
            >
              <Text fontSize="sm">
                Li e aceito os termos de uso e política de privacidade
              </Text>
            </Checkbox>
          </Box>
          
          {/* Botão de finalizar */}
          <Button 
            size="lg" 
            bg={THEME_COLORS.primary}
            _pressed={{ bg: THEME_COLORS.primaryDark }}
            rounded="md"
            shadow={2}
            onPress={finalizarPedido}
            leftIcon={<Icon as={AntDesign} name="checkcircleo" size="sm" />}
          >
            Finalizar Compra
          </Button>
          
          {/* Informações adicionais */}
          <VStack space={3} p="4" bg={THEME_COLORS.background} rounded="md" mb="4">
            <HStack alignItems="center" space={3}>
              <Center bg={THEME_COLORS.primary} p="2" rounded="full">
                <Icon as={Ionicons} name="shield-checkmark-outline" size="sm" color={THEME_COLORS.white} />
              </Center>
              <VStack>
                <Text fontWeight="bold" color={THEME_COLORS.text}>Pagamento 100% seguro</Text>
                <Text fontSize="xs" color="coolGray.600">Seus dados estão protegidos</Text>
              </VStack>
            </HStack>
            
            <HStack alignItems="center" space={3}>
              <Center bg={THEME_COLORS.primary} p="2" rounded="full">
                <Icon as={Ionicons} name="lock-closed-outline" size="sm" color={THEME_COLORS.white} />
              </Center>
              <VStack>
                <Text fontWeight="bold" color={THEME_COLORS.text}>Site seguro com criptografia SSL</Text>
                <Text fontSize="xs" color="coolGray.600">Todas as informações são criptografadas</Text>
              </VStack>
            </HStack>
            
            <HStack alignItems="center" space={3}>
              <Center bg={THEME_COLORS.primary} p="2" rounded="full">
                <Icon as={MaterialIcons} name="local-shipping" size="sm" color={THEME_COLORS.white} />
              </Center>
              <VStack>
                <Text fontWeight="bold" color={THEME_COLORS.text}>Entrega para todo o Brasil</Text>
                <Text fontSize="xs" color="coolGray.600">Consulte prazos na finalização</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}