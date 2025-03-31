import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');

const pratas = [
  {
    id: '1',
    nome: 'Corrente Escamada 60cm',
    imagem: 'https://cdn.awsli.com.br/2500x2500/1295/1295384/produto/63587553/3fe4d6055b.jpg',
    material: 'Prata',
    tam: '3mm',
  },
  {
    id: '2',
    nome: 'Pulseira Escamada Masculina',
    imagem: 'https://images.tcdn.com.br/img/img_prod/754400/pulseira_de_prata_masculina_6mm_1x1_10_4gr_fio_160_13079_1_ca6438bef2973580104b3c35a3c12aad.jpg',
    material: 'Prata',
    tam: '4mm',
  },
  {
    id: '3',
    nome: 'Corrente Cartier Masculina 70cm',
    imagem: 'https://joiasboz.com.br/media/catalog/product/cache/40ec5f172b670e90def05cdce45725c8/c/o/corrente-cartier-em-prata-50-cm-2_8-mm_2.jpg',
    material: 'Prata',
    tam: '3mm',
  },
  {
    id: '4',
    nome: 'Pulseira 3x1 Masculina',
    imagem: 'https://images.tcdn.com.br/img/img_prod/754400/pulseira_de_prata_masculina_8_6mm_3x1_16_7gr_fio_200_13081_1_542bdc005241617cdd059846b5978370.jpg',
    material: 'Prata',
    tam: '4mm',
  },
];

export default function App() {
  let [fontsLoaded] = useFonts({ Poppins_400Regular });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chico Pratas925</Text>
      <FlatList
        data={pratas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.details}>Material: {item.material}</Text>
              <Text style={styles.details}>Tam: {item.tam}</Text>
            </View>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: height * 0.05 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: width * 0.05, backgroundColor: '#f8f8f8' },
  title: { fontSize: width * 0.06, fontFamily: 'Poppins_400Regular', marginBottom: width * 0.03, textAlign: 'center' },
  card: { marginBottom: width * 0.04, borderRadius: 10, overflow: 'hidden' },
  image: { width: '100%', height: height * 0.25, resizeMode: 'cover' },
  info: { padding: width * 0.03 },
  name: { fontSize: width * 0.05, fontFamily: 'Poppins_400Regular', textAlign: 'center' },
  details: { fontSize: width * 0.04, color: '#555', textAlign: 'center' },
});