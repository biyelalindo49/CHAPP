import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function Logout() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Log Out
      </Text>

      <Text style={styles.message}>
        Are you sure you want to log out?
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>
          LOG OUT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancel}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>
          CANCEL
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1E8",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2A2521",
  },

  message: {
    fontSize: 17,
    color: "#625850",
    marginTop: 15,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#8B3A3A",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  cancel: {
    padding: 15,
  },

  cancelText: {
    color: "#2A2521",
    fontWeight: "bold",
  },
});