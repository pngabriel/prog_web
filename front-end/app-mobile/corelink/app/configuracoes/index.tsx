import React, { useState } from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Icon,
  Pressable,
  Divider,
  Switch,
  Select,
  useColorMode,
  IconButton,
  useColorModeValue,
  Avatar,
  Badge,
  Input,
  Button,
  FormControl,
  Modal,
  useDisclose
} from 'native-base';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function Configuracoes() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [notificacoes, setNotificacoes] = useState(true);
  const [atualizacaoAutomatica, setAtualizacaoAutomatica] = useState(true);
  const [sincronizacao, setSincronizacao] = useState(true);
  const [backupAutomatico, setBackupAutomatico] = useState(true);
  const [modoSeguro, setModoSeguro] = useState(false);
  const [idioma, setIdioma] = useState('pt-BR');
  const [moeda, setMoeda] = useState('BRL');
  const [formatoData, setFormatoData] = useState('DD/MM/YYYY');
  const [formatoHora, setFormatoHora] = useState('24h');
  const [ultimoBackup, setUltimoBackup] = useState('15/03/2025 14:30');
  const [versaoApp, setVersaoApp] = useState('2.5.1');
  
  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const ConfigItem = ({ icon, title, subtitle, children, isLast }) => {
    return (
      <>
        <HStack alignItems="center" justifyContent="space-between" py={4}>
          <HStack space={3} alignItems="center">
            <Icon as={icon.as} name={icon.name} size={5} color={icon.color || "primary.500"} />
            <VStack>
              <Text fontWeight="medium" color={textColor}>{title}</Text>
              {subtitle && <Text fontSize="xs" color={subtitleColor}>{subtitle}</Text>}
            </VStack>
          </HStack>
          {children}
        </HStack>
        {!isLast && <Divider bg={borderColor} />}
      </>
    );
  };
  
  const ConfigSection = ({ title, icon, children }) => {
    return (
      <Box bg={bgCard} rounded="lg" shadow={1} mb={4} px={4}>
        <HStack py={3} alignItems="center" space={2}>
          <Icon as={icon.as} name={icon.name} size={5} color="primary.500" />
          <Text fontSize="md" fontWeight="bold" color={textColor}>{title}</Text>
        </HStack>
        <Divider bg={borderColor} />
        {children}
      </Box>
    );
  };

  return (
    <Box flex={1} bg={useColorModeValue('gray.100', 'gray.900')} safeAreaTop>
      <Box px={4} pt={4} pb={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>Configurações</Text>
          <IconButton 
            icon={<Icon as={MaterialIcons} name={colorMode === 'light' ? 'dark-mode' : 'light-mode'} />} 
            onPress={toggleColorMode}
            variant="solid"
            rounded="full"
            bg="primary.500"
            _pressed={{ bg: "primary.600" }}
          />
        </HStack>
      </Box>
      
      <ScrollView px={4} showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <Box bg={bgCard} rounded="lg" shadow={1} mb={4} p={4}>
          <HStack space={4} alignItems="center">
            <Avatar 
              size="lg" 
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }}
              borderWidth={2}
              borderColor="primary.500"
            >
              AV
              <Avatar.Badge bg="green.500" />
            </Avatar>
            <VStack>
              <HStack alignItems="center" space={2}>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>Ana Costa</Text>
                <Badge colorScheme="primary" variant="solid" rounded="md">Admin</Badge>
              </HStack>
              <Text fontSize="sm" color={subtitleColor}>ana.costa@empresa.com.br</Text>
              <Text fontSize="xs" color={subtitleColor}>Último acesso: hoje às 08:45</Text>
            </VStack>
            <IconButton 
              icon={<Icon as={MaterialIcons} name="edit" size="sm" />} 
              rounded="full"
              ml="auto"
              onPress={onOpen}
            />
          </HStack>
        </Box>
        
        {/* Gerais */}
        <ConfigSection title="Configurações Gerais" icon={{ as: Ionicons, name: "settings-outline" }}>
          <ConfigItem 
            icon={{ as: MaterialIcons, name: "language" }} 
            title="Idioma" 
            subtitle="Defina o idioma do sistema"
          >
            <Select
              selectedValue={idioma}
              minWidth={120}
              onValueChange={value => setIdioma(value)}
              size="sm"
            >
              <Select.Item label="Português (BR)" value="pt-BR" />
              <Select.Item label="English (US)" value="en-US" />
              <Select.Item label="Español" value="es" />
            </Select>
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "currency-usd" }} 
            title="Moeda" 
            subtitle="Defina a moeda padrão"
          >
            <Select
              selectedValue={moeda}
              minWidth={120}
              onValueChange={value => setMoeda(value)}
              size="sm"
            >
              <Select.Item label="Real (R$)" value="BRL" />
              <Select.Item label="Dólar ($)" value="USD" />
              <Select.Item label="Euro (€)" value="EUR" />
            </Select>
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "calendar-range" }} 
            title="Formato de data" 
            subtitle="Defina como as datas serão exibidas"
          >
            <Select
              selectedValue={formatoData}
              minWidth={120}
              onValueChange={value => setFormatoData(value)}
              size="sm"
            >
              <Select.Item label="DD/MM/AAAA" value="DD/MM/YYYY" />
              <Select.Item label="MM/DD/AAAA" value="MM/DD/YYYY" />
              <Select.Item label="AAAA-MM-DD" value="YYYY-MM-DD" />
            </Select>
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "clock-outline" }} 
            title="Formato de hora" 
            subtitle="Defina como os horários serão exibidos"
            isLast
          >
            <Select
              selectedValue={formatoHora}
              minWidth={120}
              onValueChange={value => setFormatoHora(value)}
              size="sm"
            >
              <Select.Item label="24 horas" value="24h" />
              <Select.Item label="12 horas (AM/PM)" value="12h" />
            </Select>
          </ConfigItem>
        </ConfigSection>
        
        {/* Sincronização e Dados */}
        <ConfigSection title="Sincronização e Dados" icon={{ as: Ionicons, name: "cloud-upload-outline" }}>
          <ConfigItem 
            icon={{ as: MaterialIcons, name: "sync" }} 
            title="Sincronização automática" 
            subtitle="Sincronizar dados com o servidor automaticamente"
          >
            <Switch 
              size="sm"
              isChecked={sincronizacao}
              onToggle={() => setSincronizacao(!sincronizacao)}
              colorScheme="primary"
            />
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "backup-restore" }} 
            title="Backup automático" 
            subtitle="Realizar backup dos dados todos os dias"
          >
            <Switch 
              size="sm"
              isChecked={backupAutomatico}
              onToggle={() => setBackupAutomatico(!backupAutomatico)}
              colorScheme="primary"
            />
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "clock-time-eight-outline" }} 
            title="Último backup" 
            subtitle={ultimoBackup}
            isLast
          >
            <Button size="sm" leftIcon={<Icon as={MaterialIcons} name="backup" size="xs" />}>
              Fazer backup
            </Button>
          </ConfigItem>
        </ConfigSection>
        
        {/* Notificações */}
        <ConfigSection title="Notificações" icon={{ as: Ionicons, name: "notifications-outline" }}>
          <ConfigItem 
            icon={{ as: Ionicons, name: "notifications" }} 
            title="Notificações push" 
            subtitle="Receber alertas em tempo real"
          >
            <Switch 
              size="sm"
              isChecked={notificacoes}
              onToggle={() => setNotificacoes(!notificacoes)}
              colorScheme="primary"
            />
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialIcons, name: "email" }} 
            title="Notificações por email" 
            subtitle="Receber alertas por email"
            isLast
          >
            <Switch 
              size="sm"
              isChecked={true}
              colorScheme="primary"
            />
          </ConfigItem>
        </ConfigSection>
        
        {/* Atualizações */}
        <ConfigSection title="Atualizações" icon={{ as: Feather, name: "refresh-cw" }}>
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "update" }} 
            title="Atualização automática" 
            subtitle="Baixar e instalar atualizações automaticamente"
          >
            <Switch 
              size="sm"
              isChecked={atualizacaoAutomatica}
              onToggle={() => setAtualizacaoAutomatica(!atualizacaoAutomatica)}
              colorScheme="primary"
            />
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "information-outline" }} 
            title="Versão do aplicativo" 
            subtitle={versaoApp}
            isLast
          >
            <Button 
              size="sm"
              leftIcon={<Icon as={Ionicons} name="cloud-download-outline" size="xs" />}
              variant="outline"
            >
              Verificar
            </Button>
          </ConfigItem>
        </ConfigSection>
        
        {/* Segurança */}
        <ConfigSection title="Segurança" icon={{ as: MaterialIcons, name: "security" }}>
          <ConfigItem 
            icon={{ as: MaterialCommunityIcons, name: "shield-lock-outline" }} 
            title="Modo seguro" 
            subtitle="Ativar verificação em duas etapas para operações sensíveis"
          >
            <Switch 
              size="sm"
              isChecked={modoSeguro}
              onToggle={() => setModoSeguro(!modoSeguro)}
              colorScheme="primary"
            />
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialIcons, name: "lock" }} 
            title="Trocar senha" 
            subtitle="Alterar credenciais de acesso"
            isLast
          >
            <Button 
              size="sm"
              variant="ghost"
              rightIcon={<Icon as={MaterialIcons} name="arrow-forward" size="xs" />}
            >
              Alterar
            </Button>
          </ConfigItem>
        </ConfigSection>
        
        {/* Suporte e Ajuda */}
        <ConfigSection title="Suporte e Ajuda" icon={{ as: MaterialIcons, name: "help-outline" }}>
          <ConfigItem 
            icon={{ as: MaterialIcons, name: "support-agent" }} 
            title="Contatar suporte" 
            subtitle="Abrir um ticket de suporte"
          >
            <Button 
              size="sm"
              leftIcon={<Icon as={MaterialIcons} name="chat" size="xs" />}
              colorScheme="primary"
              variant="subtle"
            >
              Contatar
            </Button>
          </ConfigItem>
          
          <ConfigItem
            icon={{ as: FontAwesome5, name: "book" }} 
            title="Documentação" 
            subtitle="Consultar manual do sistema"
          >
            <Button 
              size="sm"
              leftIcon={<Icon as={MaterialIcons} name="menu-book" size="xs" />}
              colorScheme="primary"
              variant="subtle"
            >
              Acessar
            </Button>
          </ConfigItem>
          
          <ConfigItem 
            icon={{ as: MaterialIcons, name: "bug-report" }} 
            title="Reportar problema" 
            subtitle="Informar problemas técnicos"
            isLast
          >
            <Button 
              size="sm"
              leftIcon={<Icon as={MaterialIcons} name="report" size="xs" />}
              colorScheme="primary"
              variant="subtle"
            >
              Reportar
            </Button>
          </ConfigItem>
        </ConfigSection>
        
        {/* Licença */}
        <Box bg={bgCard} rounded="lg" shadow={1} mb={4} p={4}>
          <VStack space={2} alignItems="center">
            <Text fontSize="sm" color={subtitleColor} textAlign="center">
              ©2025 SeuERP Pro - Todos os direitos reservados
            </Text>
            <Text fontSize="xs" color={subtitleColor} textAlign="center">
              Licença: Premium Business - Válida até 12/12/2025
            </Text>
          </VStack>
        </Box>
      </ScrollView>
      
      {/* Modal de edição de perfil */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Editar Perfil</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <HStack justifyContent="center" mb={2}>
                <Avatar 
                  size="xl" 
                  source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }}
                >
                  <Avatar.Badge bg="green.500">
                    <Icon as={Ionicons} name="camera" size="xs" color="white" />
                  </Avatar.Badge>
                </Avatar>
              </HStack>
              
              <FormControl>
                <FormControl.Label>Nome</FormControl.Label>
                <Input defaultValue="Ana Costa" />
              </FormControl>
              
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input defaultValue="ana.costa@empresa.com.br" />
              </FormControl>
              
              <FormControl>
                <FormControl.Label>Cargo</FormControl.Label>
                <Input defaultValue="Gerente Financeiro" />
              </FormControl>
              
              <FormControl>
                <FormControl.Label>Telefone</FormControl.Label>
                <Input defaultValue="(11) 98765-4321" />
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancelar
              </Button>
              <Button onPress={onClose}>
                Salvar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}