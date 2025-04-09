import React, { useState } from 'react';
import { View, Text, Image, Switch, FlatList, Modal, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const produtos = [
  {
    id: '1',
    nome: 'Corrente Escamada 60cm',
    descricao: 'Corrente de prata 925 escamada...',
    imagem: 'https://cdn.awsli.com.br/2500x2500/1295/1295384/produto/63587553/3fe4d6055b.jpg',
    material: 'Prata 925',
    tam: '3mm',
    preco: 'R$ 150,00',
    genero: 'masculino'
  },
  {
    id: '2',
    nome: 'Pulseira Escamada Masculina',
    descricao: 'Pulseira de prata 925 escamada...',
    imagem: 'https://images.tcdn.com.br/img/img_prod/754400/pulseira_de_prata_masculina_6mm_1x1_10_4gr_fio_160_13079_1_ca6438bef2973580104b3c35a3c12aad.jpg',
    material: 'Prata 925',
    tam: '4mm',
    preco: 'R$ 120,00',
    genero: 'masculino'
  },
  {
    id: '3',
    nome: 'Corrente Cartier Masculina',
    descricao: 'Clássica corrente Cartier em prata...',
    imagem: 'https://images.tcdn.com.br/img/img_prod/1195965/corrente_de_prata_masculina_cartier_cadeado_70_cm_colecao_for_men_35968_1_1d37003d084d7a8f6712ed21eaf99982_20230329091057.jpg',
    material: 'Prata 925',
    tam: '3mm',
    preco: 'R$ 180,00',
    genero: 'masculino'
  },
  {
    id: '4',
    nome: 'Pulseira 3x1 Masculina',
    descricao: 'Modelo 3x1 resistente...',
    imagem: 'https://images.tcdn.com.br/img/img_prod/754400/pulseira_de_prata_masculina_8_6mm_3x1_16_7gr_fio_200_13081_1_542bdc005241617cdd059846b5978370.jpg',
    material: 'Prata 925',
    tam: '4mm',
    preco: 'R$ 160,00',
    genero: 'masculino'
  },
  {
    id: '5',
    nome: 'Anel Masculino Clássico',
    descricao: 'Anel robusto de prata...',
    imagem: 'https://images.tcdn.com.br/img/img_prod/624203/anel_masculino_dedeira_masculina_prata_aco_inoxidavel_de_leao_31821_1_7d8d2cdf4fc476b6f0b6fb73b3f657e8.jpeg',
    material: 'Prata 925',
    tam: 'Ajustável',
    preco: 'R$ 100,00',
    genero: 'masculino'
  },
  {
    id: '6',
    nome: 'Brinco Argola Pequeno Feminino',
    descricao: 'Brinco de argola pequeno em prata...',
    imagem: 'https://images.tcdn.com.br/img/img_prod/643537/brinco_argola_pequena_prata_925_610_1_0b4da8e6d70056833530b69fc4a15fec.jpg',
    material: 'Prata 925',
    tam: '1cm',
    preco: 'R$ 50,00',
    genero: 'Feminino'
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [precoMax, setPrecoMax] = useState(500);
  const [tamMax, setTamMax] = useState(10);
  const [generoSelecionado, setGeneroSelecionado] = useState('todos');

  const tema = isDarkMode ? darkStyles : styles;

  const parsePreco = (preco) => Number(preco.replace('R$', '').replace(',', '.'));

  const parseTamanho = (tam) => {
    const num = parseFloat(tam.replace('mm', '').trim());
    return isNaN(num) ? 0 : num;
  };

  const produtosFiltrados = produtos.filter((p) => {
    const precoDentroDoLimite = parsePreco(p.preco) <= precoMax;
    const generoCombina = generoSelecionado === 'todos' || p.genero.toLowerCase() === generoSelecionado.toLowerCase();
    const tamanhoDentroDoLimite = parseTamanho(p.tam) <= tamMax;

    return precoDentroDoLimite && generoCombina && tamanhoDentroDoLimite;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tema.card}
      onPress={() => {
        setProdutoSelecionado(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.imagem }} style={tema.image} />
      <View style={tema.info}>
        <Text style={tema.name}>{item.nome}</Text>
        <Text style={tema.description} numberOfLines={2}>{item.descricao}</Text>
        <Text style={tema.details}>Material: {item.material}</Text>
        <Text style={tema.details}>Tamanho: {item.tam}</Text>
        <Text style={tema.price}>{item.preco}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tema.container}>
      <View style={tema.headerTop}>
        <Text style={tema.title}>Catálogo de Joias</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: width * 0.045, marginRight: 5 }}>🌞</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          <Text style={{ fontSize: width * 0.045, marginLeft: 5 }}>🌙</Text>
        </View>
      </View>

      <Text style={{ color: isDarkMode ? '#fff' : '#000', marginTop: 20, fontSize: width * 0.045 }}>
        Preço máximo: R$ {precoMax.toFixed(2)}
      </Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={500}
        step={10}
        value={precoMax}
        onValueChange={setPrecoMax}
        minimumTrackTintColor="#00e676"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#00e676"
      />

      <Text style={{ color: isDarkMode ? '#fff' : '#000', marginTop: 20, fontSize: width * 0.045 }}>
        Tamanho máximo (mm): {tamMax}mm
      </Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={tamMax}
        onValueChange={setTamMax}
        minimumTrackTintColor="#00e676"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#00e676"
      />

      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: width * 0.045 }}>
          Gênero:
        </Text>
        <View style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: isDarkMode ? '#333' : '#fff',
          overflow: 'hidden',
        }}>
          <Picker
            selectedValue={generoSelecionado}
            onValueChange={(itemValue) => setGeneroSelecionado(itemValue)}
            dropdownIconColor={isDarkMode ? '#fff' : '#000'}
            style={{
              color: isDarkMode ? '#fff' : '#000',
              height: 50,
              justifyContent: 'center',
              textAlign: 'center',
            }}
            itemStyle={{ textAlign: 'center' }}
          >
            <Picker.Item label="Todos" value="todos" />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={produtosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={tema.modalContainer}>
          <TouchableOpacity style={tema.closeArea} onPress={() => setModalVisible(false)} />
          {produtoSelecionado && (
            <View style={tema.modalContent}>
              <Image source={{ uri: produtoSelecionado.imagem }} style={tema.modalImage} />
              <Text style={tema.modalTitle}>{produtoSelecionado.nome}</Text>
              <Text style={tema.modalDescription}>{produtoSelecionado.descricao}</Text>
              <Text style={tema.modalPrice}>Preço: {produtoSelecionado.preco}</Text>
              <Button title="Fechar" onPress={() => setModalVisible(false)} color={isDarkMode ? '#00e676' : '#333'} />
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.02,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
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
    fontSize: width * 0.035,
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
    fontSize: width * 0.045,
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const darkStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: '#121212',
  },
  title: {
    ...styles.title,
    color: '#fff',
  },
  card: {
    ...styles.card,
    backgroundColor: '#1e1e1e',
  },
  name: {
    ...styles.name,
    color: '#fff',
  },
  description: {
    ...styles.description,
    color: '#ccc',
  },
  details: {
    ...styles.details,
    color: '#aaa',
  },
  price: {
    ...styles.price,
    color: '#00e676',
  },
  modalContent: {
    ...styles.modalContent,
    backgroundColor: '#1e1e1e',
  },
  modalTitle: {
    ...styles.modalTitle,
    color: '#fff',
  },
  modalDescription: {
    ...styles.modalDescription,
    color: '#ccc',
  },
  modalPrice: {
    ...styles.modalPrice,
    color: '#00e676',
  },
});
