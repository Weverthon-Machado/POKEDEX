import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

// Cores por tipo de Pokémon
const TYPE_COLORS = {
  fire: "#FF4C4C",
  water: "#4C9EFF",
  grass: "#4CAF50",
  electric: "#FFD700",
  psychic: "#FF6BA8",
  ice: "#74D7EC",
  dragon: "#6A3DE8",
  dark: "#3D3D3D",
  fairy: "#FF9EC9",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  const animateEntry = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fetchPokemon = async (query = null) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = query
        ? `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`
        : `https://pokeapi.co/api/v2/pokemon/${id}`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Pokémon não encontrado!");
      const data = await response.json();

      const poke = {
        id: data.id,
        nome: data.name,
        imagem:
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default,
        tipo1: data.types[0]?.type.name,
        tipo2: data.types[1]?.type.name,
        altura: (data.height / 10).toFixed(1),
        peso: (data.weight / 10).toFixed(1),
      };
      setPokemon(poke);
      if (query) setId(data.id);
      animateEntry();
    } catch (err) {
      setError("Pokémon não encontrado! Tente outro nome ou ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    fetchPokemon(searchText);
    setSearchText("");
  };

  const handlePrevious = () => {
    if (id > 1) setId(id - 1);
  };

  const handleNext = () => {
    setId(id + 1);
  };

  const handleBackToStart = () => {
    setId(1);
  };

  const bgColor = pokemon?.tipo1
    ? TYPE_COLORS[pokemon.tipo1] || "#FF5252"
    : "#FF5252";
  const tipo1Color = TYPE_COLORS[pokemon?.tipo1] || "#ccc";
  const tipo2Color = TYPE_COLORS[pokemon?.tipo2] || "#ccc";

  return (
    <View style={[styles.container, { backgroundColor: bgColor + "22" }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchArea}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome ou ID..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={[styles.searchBtn, { backgroundColor: bgColor }]}
          onPress={handleSearch}
        >
          <Text style={styles.searchBtnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.loadingArea}>
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorArea}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : pokemon ? (
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                borderColor: bgColor,
              },
            ]}
          >
            {/* ID Badge */}
            <View style={[styles.idBadge, { backgroundColor: bgColor }]}>
              <Text style={styles.idText}>#{String(pokemon.id).padStart(3, "0")}</Text>
            </View>

            {/* Pokémon Image */}
            <View style={[styles.imageWrapper, { backgroundColor: bgColor + "33" }]}>
              <Image
                source={{ uri: pokemon.imagem }}
                style={styles.imagemPoke}
                resizeMode="contain"
              />
            </View>

            {/* Name */}
            <Text style={[styles.nomePoke, { color: bgColor }]}>
              {pokemon.nome.toUpperCase()}
            </Text>

            {/* Types */}
            <View style={styles.tiposRow}>
              <View style={[styles.tipoBadge, { backgroundColor: tipo1Color }]}>
                <Text style={styles.tipoText}>{pokemon.tipo1?.toUpperCase()}</Text>
              </View>
              {pokemon.tipo2 && (
                <View style={[styles.tipoBadge, { backgroundColor: tipo2Color }]}>
                  <Text style={styles.tipoText}>{pokemon.tipo2?.toUpperCase()}</Text>
                </View>
              )}
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Altura</Text>
                <Text style={[styles.statValue, { color: bgColor }]}>
                  {pokemon.altura}m
                </Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: bgColor + "44" }]} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Peso</Text>
                <Text style={[styles.statValue, { color: bgColor }]}>
                  {pokemon.peso}kg
                </Text>
              </View>
            </View>
          </Animated.View>
        ) : null}

        {/* Navigation Buttons */}
        <View style={styles.areaBtn}>
          <TouchableOpacity
            style={[styles.btn, id <= 1 && styles.btnDisabled, { backgroundColor: bgColor }]}
            onPress={handlePrevious}
            disabled={id <= 1}
          >
            <Text style={styles.txtBtn}>← Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnHome, { borderColor: bgColor }]}
            onPress={handleBackToStart}
          >
            <Text style={[styles.txtBtnHome, { color: bgColor }]}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: bgColor }]}
            onPress={handleNext}
          >
            <Text style={styles.txtBtn}>Próximo →</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Start button */}
        <TouchableOpacity
          style={[styles.btnVoltar, { backgroundColor: bgColor }]}
          onPress={handleBackToStart}
        >
          <Text style={styles.txtBtnVoltar}>⬆ Voltar ao início (#001)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 180,
    height: 60,
  },
  searchArea: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: "System",
    color: "#333",
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBtn: {
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  searchBtnText: {
    fontSize: 20,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 32,
    paddingTop: 8,
  },
  loadingArea: {
    marginTop: 60,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
  errorArea: {
    marginTop: 40,
    marginHorizontal: 30,
    backgroundColor: "#FFE5E5",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  errorText: {
    fontSize: 15,
    color: "#c0392b",
    textAlign: "center",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 24,
    marginTop: 12,
    marginHorizontal: 20,
    width: "88%",
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  idBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  idText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },
  imageWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  imagemPoke: {
    width: 160,
    height: 160,
  },
  nomePoke: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.08)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  tiposRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  tipoBadge: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tipoText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 0,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1.5,
    height: 36,
    marginHorizontal: 12,
  },
  statLabel: {
    fontSize: 11,
    color: "#aaa",
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
  },
  areaBtn: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  btnDisabled: {
    opacity: 0.35,
  },
  btnHome: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  txtBtn: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  txtBtnHome: {
    fontSize: 22,
  },
  btnVoltar: {
    marginTop: 14,
    marginHorizontal: 20,
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
    width: "88%",
  },
  txtBtnVoltar: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
