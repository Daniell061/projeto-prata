import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const produtos = [
  {
    id: '1',
    nome: 'Corrente Escamada 60cm',
    descricao: 'Corrente de prata 925 escamada, ideal para o dia a dia. Seu design clássico e elegante permite combinações variadas, desde looks casuais até trajes mais sofisticados, oferecendo estilo e personalidade.',
    imagem: 'https://cdn.awsli.com.br/2500x2500/1295/1295384/produto/63587553/3fe4d6055b.jpg',
    material: 'Prata 925',
    tam: '3mm',
    preco: 'R$ 150,00',
  },
  {
    id: '2',
    nome: 'Pulseira Escamada Masculina',
    descricao: 'Pulseira de prata 925 escamada com design moderno. Perfeita para homens que buscam sofisticação e estilo, esse acessório combina com diversas ocasiões, proporcionando um toque de elegância e exclusividade.',
    imagem: 'https://images.tcdn.com.br/img/img_prod/754400/pulseira_de_prata_masculina_6mm_1x1_10_4gr_fio_160_13079_1_ca6438bef2973580104b3c35a3c12aad.jpg',
    material: 'Prata 925',
    tam: '4mm',
    preco: 'R$ 120,00',
  },
  {
    id: '3',
    nome: 'Corrente Cartier Masculina',
    descricao: 'Clássica corrente Cartier em prata, versátil e estilosa. Seu modelo atemporal traz um visual sofisticado e imponente, sendo ideal para complementar qualquer estilo, desde o esportivo ao mais formal.',
    imagem: 'https://joiasboz.com.br/media/catalog/product/cache/40ec5f172b670e90def05cdce45725c8/c/o/corrente-cartier-em-prata-50-cm-2_8-mm_2.jpg',
    material: 'Prata 925',
    tam: '3mm',
    preco: 'R$ 180,00',
  },
  {
    id: '4',
    nome: 'Pulseira 3x1 Masculina',
    descricao: 'Modelo 3x1 resistente, perfeito para qualquer ocasião. Essa pulseira possui um acabamento impecável e um design sofisticado, tornando-se um acessório essencial para quem aprecia um visual estiloso e marcante.',
    imagem: 'https://images.tcdn.com.br/img/img_prod/754400/pulseira_de_prata_masculina_8_6mm_3x1_16_7gr_fio_200_13081_1_542bdc005241617cdd059846b5978370.jpg',
    material: 'Prata 925',
    tam: '4mm',
    preco: 'R$ 160,00',
  },
  {
    id: '5',
    nome: 'Anel Masculino Clássico',
    descricao: 'Anel robusto de prata, perfeito para um visual sofisticado. Feito com materiais de alta qualidade, proporciona resistência e durabilidade, além de um acabamento refinado para compor diferentes looks.',
    imagem: 'https://images.tcdn.com.br/img/img_prod/624203/anel_masculino_dedeira_masculina_prata_aco_inoxidavel_de_leao_31821_1_7d8d2cdf4fc476b6f0b6fb73b3f657e8.jpeg',
    material: 'Prata 925',
    tam: 'Ajustável',
    preco: 'R$ 100,00',
  },
  {
    id: '6',
    nome: 'Brinco Argola Pequeno',
    descricao: 'Brinco de argola pequeno em prata, discreto e elegante. Ideal para quem busca um acessório versátil e atemporal, combinando facilmente com diferentes estilos e ocasiões, sem perder o brilho e sofisticação.',
    imagem: 'https://images.tcdn.com.br/img/img_prod/643537/brinco_argola_pequena_prata_925_610_1_0b4da8e6d70056833530b69fc4a15fec.jpg',
    material: 'Prata 925',
    tam: '1cm',
    preco: 'R$ 50,00',
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chico Pratas925</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <TouchableOpacity onPress={() => abrirModal(item)}>
              <Image source={{ uri: item.imagem }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.description}>{item.descricao}</Text>
              <Text style={styles.details}>Material: {item.material}</Text>
              <Text style={styles.details}>Tamanho: {item.tam}</Text>
              <Text style={styles.price}>Preço: {item.preco}</Text>
            </View>
          </Card>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeArea} onPress={() => setModalVisible(false)} />
          {produtoSelecionado && (
            <View style={styles.modalContent}>
              <Image source={{ uri: produtoSelecionado.imagem }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{produtoSelecionado.nome}</Text>
              <Text style={styles.modalDescription}>{produtoSelecionado.descricao}</Text>
              <Text style={styles.modalPrice}>Preço: {produtoSelecionado.preco}</Text>
              <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>
                Fechar
              </Button>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f8f8f8',
  },

  // Título principal
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: width * 0.05,
  },

  // Estilos do Card
  card: {
    marginBottom: width * 0.04,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: width * 0.4,
  },
  info: {
    padding: width * 0.03,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  description: {
    fontSize: width * 0.04,
    color: '#333',
    marginVertical: width * 0.02,
  },
  details: {
    fontSize: width * 0.035,
    color: '#555',
  },
  price: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#008000',
    marginTop: 5,
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  closeArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.9,
  },
  modalImage: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: width * 0.04,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#008000',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#333',
  },
});
