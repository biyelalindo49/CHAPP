import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.ResturantImage}
          resizeMode="cover"
        />

        <Text style={styles.title}>
          Chef Christoffel
        </Text>

        <Text style={styles.subtitle}>
          Fine Dining Experience
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screens/login" as any)}
        >
          <Text style={styles.buttonText}>
            ENTER
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1B18",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    width: "100%",
    maxWidth: 480,
    alignItems: "center",
  },

  ResturantImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 25,
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#F4E7D3",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: "#D6B98C",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#D6B98C",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 40,
  },

  buttonText: {
    color: "#1E1B18",
    fontSize: 16,
    fontWeight: "bold",
  },
});