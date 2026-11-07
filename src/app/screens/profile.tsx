import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function Profile() {

  return (
    <ScrollView style={styles.container}>

      <View style={styles.content}>

        <View style={styles.profileImage}>
          <Text style={styles.initials}>
            CC
          </Text>
        </View>

        <Text style={styles.name}>
          Chef Christoffel
        </Text>

        <Text style={styles.profession}>
          Professional Fine Dining Chef
        </Text>

        <Text style={styles.rating}>
          ★★★★★
        </Text>

        <Text style={styles.heading}>
          Cuisines
        </Text>

        <Text style={styles.text}>
          Fine Dining, Seafood and European Cuisine
        </Text>

        <Text style={styles.heading}>
          About the Chef
        </Text>

        <Text style={styles.text}>
          Chef Christoffel specialises in fine dining
          experiences and carefully prepared dishes
          using quality ingredients.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screens/menu" as any)}
        >
          <Text style={styles.buttonText}>
            EXPLORE MENU
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1E8",
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },

  content: {
    padding: 25,
    alignItems: "center",
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#2A2521",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  initials: {
    color: "#F4E7D3",
    fontSize: 40,
    fontWeight: "bold",
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2A2521",
    marginTop: 20,
  },

  profession: {
    fontSize: 17,
    color: "#75685C",
    marginTop: 8,
  },

  rating: {
    fontSize: 24,
    color: "#A27A3D",
    marginTop: 15,
  },

  heading: {
    alignSelf: "flex-start",
    fontSize: 21,
    fontWeight: "bold",
    color: "#2A2521",
    marginTop: 30,
  },

  text: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#625850",
    lineHeight: 24,
    marginTop: 8,
  },

  button: {
    backgroundColor: "#2A2521",
    padding: 16,
    paddingHorizontal: 45,
    borderRadius: 8,
    marginTop: 35,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});