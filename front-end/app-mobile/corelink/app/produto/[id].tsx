import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const produtos: Record<number, { nome: string; preco: string; imagem: string }> = {
    1: { nome: 'Tênis Esportivo', preco: 'R$ 199,99', imagem: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSbM0V0mJ1ikolP6wCFVEbklDZWwqrCgG8jZa9-GG73_luaTkDd4KkoNo7k_yb66j3LWKsKnIewF2JsmBew1Scn8TN5tn9j5zT7rJ6itln-FByfxZYfosuhpe4v7nu1AmP_t2jhQ-MaVsk&usqp=CAc' },
    2: { nome: 'Camiseta Dry Fit', preco: 'R$ 79,99', imagem: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwUU-zQsvkdVpxkewER78z2_QrDfTRPkhgRtVK-adwq5JogjYXqnvOH_mlYQN-4x_hPV_q-6rQdMr4NsIvL_3A0z-gvtkk42ymYvBz9ly9CsP0yNu5bwOK&usqp=CAE' },
    3: { nome: 'Relógio Smart', preco: 'R$ 299,99', imagem: 'data:image/jpeg;base64,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' }
};

export default function ProdutoScreen() {
    const { id } = useLocalSearchParams();
    const produto = produtos[Number(id)];

    if (!produto) {
        return <Text>Produto não encontrado.</Text>;
    }

    const handleCompra = () => {
        Alert.alert('Compra realizada!', `Você comprou: ${produto.nome}`);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: produto.imagem }} style={styles.imagem} />
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>{produto.preco}</Text>
            <TouchableOpacity style={styles.botao} onPress={handleCompra}>
                <Text style={styles.textoBotao}>Comprar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    imagem: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    preco: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20
    },
    botao: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
