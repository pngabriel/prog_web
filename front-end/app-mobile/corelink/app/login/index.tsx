import React, { useState } from "react";
import { VStack, Input, Button, Text, Heading, Box } from "native-base";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Por favor, preencha todos os campos!");
    } else {
      setError("");
      console.log("Username:", username);
      console.log("Password:", password);
    }
  };

  return (
    <Box flex={1} bg="#ececec" justifyContent="center" alignItems="center" px={4}>
      <Box
        bg="#fff"
        p={8}
        borderRadius={10}
        shadow={6}
        w="100%"
        maxW="400px"
        alignItems="center"
      >
        <Heading color="#333" fontSize="2xl" mb={5}>
          CoreLink
        </Heading>

        <VStack space={4} w="100%">
          <Box>
            <Text fontWeight="600" color="#555" mb={1}>
              Username
            </Text>
            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Digite seu nome de usuário"
              borderColor="#ddd"
              borderRadius={6}
              fontSize="md"
              bg="#f9f9f9"
              _focus={{
                borderColor: "#4CAF50",
                shadow: 2,
              }}
            />
          </Box>

          <Box>
            <Text fontWeight="600" color="#555" mb={1}>
              Password
            </Text>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              type="password"
              borderColor="#ddd"
              borderRadius={6}
              fontSize="md"
              bg="#f9f9f9"
              _focus={{
                borderColor: "#4CAF50",
                shadow: 2,
              }}
            />
          </Box>

          {error !== "" && (
            <Text color="#ff4d4d" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Button
            bg="#4CAF50"
            _pressed={{ bg: "#45a049" }}
            borderRadius={6}
            py={3}
            onPress={handleLogin}
          >
            <Text color="white" fontSize="md" fontWeight="bold">
              Login
            </Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
