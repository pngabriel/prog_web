import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Obtém a largura da tela para dimensionar corretamente as imagens
const { width } = Dimensions.get('window');

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams();
  const [quantidade, setQuantidade] = useState(1);
  const [corSelecionada, setCorSelecionada] = useState('Preto');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('M');
  
  // Dados simulados mais detalhados do produto
  const produto = {
    id,
    nome: 'Camiseta Premium Cotton',
    descricao: 'Camiseta confeccionada em algodão premium de alta qualidade. Confortável, durável e perfeita para o dia a dia.',
    preco: 99.90,
    precoAntigo: 129.90,
    imagens: [
      'data:image/jpeg;base64,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',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MOICtXxbHg1DNHle_va2E-Witoa3ACbxjw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRygkhrNReuEQi25FgkPr9xMyleu6_YQ7F2ZA&s',
      'data:image/jpeg;base64,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',
      'https://coisadocapeta.com.br/wp-content/uploads/2024/01/CAMISETA-GHOST-FRENTE.png',
    ],
    cores: ['Preto', 'Branco', 'Azul', 'Vermelho'],
    tamanhos: ['P', 'M', 'G', 'GG'],
    avaliacao: 4.7,
    numAvaliacoes: 128,
    especificacoes: [
      { nome: 'Material', valor: '100% Algodão' },
      { nome: 'Peso', valor: '180g' },
      { nome: 'Fabricante', valor: 'Fashion Clothes Inc.' },
      { nome: 'Origem', valor: 'Brasil' }
    ],
    tempoEntrega: '2-3 dias úteis',
    disponivel: true,
    emEstoque: 15,
  };

  const incrementarQuantidade = () => {
    if (quantidade < produto.emEstoque) {
      setQuantidade(quantidade + 1);
    }
  };

  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const formatarPreco = (preco:any) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const handleComprar = () => {
    alert(`Produto adicionado ao carrinho!\n${quantidade}x ${produto.nome}\nCor: ${corSelecionada}\nTamanho: ${tamanhoSelecionado}`);
  };

  const renderEstrelas = () => {
    const estrelas = [];
    const avaliacao = Math.round(produto.avaliacao * 2) / 2;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= avaliacao) {
        estrelas.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
      } else if (i - 0.5 === avaliacao) {
        estrelas.push(<Ionicons key={i} name="star-half" size={16} color="#FFD700" />);
      } else {
        estrelas.push(<Ionicons key={i} name="star-outline" size={16} color="#FFD700" />);
      }
    }
    
    return estrelas;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Carrossel de imagens - Corrigido para evitar corte */}
        <View style={styles.imageCarouselContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            style={styles.imageCarousel}
          >
            {produto.imagens.map((imagem, index) => (
              <View key={index} style={styles.imagemContainer}>
                <Image 
                  source={{ uri: imagem }} 
                  style={styles.imagem} 
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          {/* Indicador de página */}
          <View style={styles.paginationContainer}>
            {produto.imagens.map((_, index) => (
              <View 
                key={index} 
                style={[styles.paginationDot, index === 0 ? styles.paginationDotActive : null]} 
              />
            ))}
          </View>
        </View>

        {/* Informações principais */}
        <View style={styles.infoContainer}>
          <View style={styles.headerInfo}>
            <Text style={styles.nome}>{produto.nome}</Text>
            <View style={styles.avaliacaoContainer}>
              <View style={styles.estrelas}>
                {renderEstrelas()}
              </View>
              <Text style={styles.avaliacaoText}>
                {produto.avaliacao} ({produto.numAvaliacoes} avaliações)
              </Text>
            </View>
          </View>

          {/* Preço */}
          <View style={styles.precoContainer}>
            {produto.precoAntigo && (
              <Text style={styles.precoAntigo}>
                {formatarPreco(produto.precoAntigo)}
              </Text>
            )}
            <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
            {produto.precoAntigo && (
              <View style={styles.descontoBadge}>
                <Text style={styles.descontoText}>
                  -{Math.round((1 - produto.preco / produto.precoAntigo) * 100)}%
                </Text>
              </View>
            )}
          </View>

          {/* Cores */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Cor:</Text>
            <View style={styles.coresContainer}>
              {produto.cores.map((cor) => (
                <TouchableOpacity
                  key={cor}
                  style={[
                    styles.corOption,
                    corSelecionada === cor && styles.corSelecionada
                  ]}
                  onPress={() => setCorSelecionada(cor)}
                >
                  <Text style={corSelecionada === cor ? styles.optionTextSelected : styles.optionText}>
                    {cor}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tamanhos */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tamanho:</Text>
            <View style={styles.tamanhosContainer}>
              {produto.tamanhos.map((tamanho) => (
                <TouchableOpacity
                  key={tamanho}
                  style={[
                    styles.tamanhoOption,
                    tamanhoSelecionado === tamanho && styles.tamanhoSelecionado
                  ]}
                  onPress={() => setTamanhoSelecionado(tamanho)}
                >
                  <Text style={tamanhoSelecionado === tamanho ? styles.optionTextSelected : styles.optionText}>
                    {tamanho}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantidade */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quantidade:</Text>
            <View style={styles.quantidadeContainer}>
              <TouchableOpacity onPress={decrementarQuantidade} style={styles.quantidadeButton}>
                <Ionicons name="remove" size={18} color="#333" />
              </TouchableOpacity>
              <Text style={styles.quantidadeText}>{quantidade}</Text>
              <TouchableOpacity onPress={incrementarQuantidade} style={styles.quantidadeButton}>
                <Ionicons name="add" size={18} color="#333" />
              </TouchableOpacity>
              <Text style={styles.estoqueText}>
                {produto.emEstoque} disponíveis
              </Text>
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.descricao}>{produto.descricao}</Text>
          </View>

          {/* Especificações */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Especificações</Text>
            {produto.especificacoes.map((spec, index) => (
              <View key={index} style={styles.especRow}>
                <Text style={styles.especNome}>{spec.nome}:</Text>
                <Text style={styles.especValor}>{spec.valor}</Text>
              </View>
            ))}
          </View>

          {/* Entrega */}
          <View style={styles.entregaContainer}>
            <Ionicons name="time-outline" size={20} color="#4CAF50" />
            <Text style={styles.entregaText}>
              Entrega em {produto.tempoEntrega}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra de compra */}
      <View style={styles.bottomBar}>
        <View style={styles.precoTotalContainer}>
          <Text style={styles.precoTotalLabel}>Total:</Text>
          <Text style={styles.precoTotal}>
            {formatarPreco(produto.preco * quantidade)}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.comprarButton}
          onPress={handleComprar}
          disabled={!produto.disponivel}
        >
          <Text style={styles.comprarButtonText}>
            {produto.disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 5,
  },
  favoriteButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20, // Adiciona espaço no final do scroll
  },
  // Novo container para o carrossel
  imageCarouselContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 10, // Espaço superior para evitar corte
  },
  imageCarousel: {
    height: 300,
  },
  // Container para cada imagem individual
  imagemContainer: {
    width: width, // Usa a largura da tela
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Espaço nas laterais
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cccccc',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: '#3498db',
    width: 10,
    height: 10,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginTop: 10, // Espaço entre o carrossel e as informações
  },
  headerInfo: {
    marginBottom: 10,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estrelas: {
    flexDirection: 'row',
    marginRight: 5,
  },
  avaliacaoText: {
    fontSize: 14,
    color: '#666666',
  },
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  precoAntigo: {
    fontSize: 16,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  preco: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  descontoBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  descontoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  coresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  corOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginRight: 10,
    marginBottom: 10,
  },
  corSelecionada: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  tamanhosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tamanhoOption: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginRight: 10,
    marginBottom: 10,
  },
  tamanhoSelecionado: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  optionText: {
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantidadeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantidadeText: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  estoqueText: {
    marginLeft: 15,
    fontSize: 14,
    color: '#666666',
  },
  descricao: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555555',
  },
  especRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  especNome: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  especValor: {
    flex: 2,
    fontSize: 15,
    color: '#555555',
  },
  entregaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f9f1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  entregaText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4CAF50',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  precoTotalContainer: {
    flex: 1,
  },
  precoTotalLabel: {
    fontSize: 14,
    color: '#666666',
  },
  precoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  comprarButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
  },
  comprarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});