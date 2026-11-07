import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

type MenuItem = {
  name: string;
  category: string;
  description: string;
  price: string;
};

export default function Menu() {

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      name: "Garden Salad",
      category: "Starter",
      description: "Fresh seasonal vegetables with a light dressing.",
      price: "R95",
    },
    {
      name: "Grilled Beef Fillet",
      category: "Main Course",
      description: "Tender beef fillet with seasonal vegetables.",
      price: "R285",
    },
    {
      name: "Seafood Platter",
      category: "Seafood",
      description: "A selection of fresh seafood prepared by the chef.",
      price: "R320",
    },
    {
      name: "Chocolate Dessert",
      category: "Dessert",
      description: "Rich chocolate dessert with a delicate garnish.",
      price: "R120",
    },
  ]);

  const deleteItem = (index: number) => {
    const updatedItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedItems);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Chef Christoffel's Menu
      </Text>

      <Text style={styles.subtitle}>
        Featured Food
      </Text>

      <ScrollView>

        {menuItems.map((item, index) => (

          <View
            style={styles.card}
            key={index}
          >

            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(index)}
            >
              <Text style={styles.deleteButtonText}>
                DELETE
              </Text>
            </TouchableOpacity>

          </View>

        ))}

      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/addmenu" as any)}
      >
        <Text style={styles.buttonText}>
          ADD MENU ITEM
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.push("/screens/logout" as any)}
      >
        <Text style={styles.logoutText}>
          LOG OUT
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1E8",
    padding: 20,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2A2521",
    marginTop: 25,
  },

  subtitle: {
    fontSize: 17,
    color: "#A27A3D",
    marginBottom: 20,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
  },

  category: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#A27A3D",
  },

  name: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#2A2521",
    marginTop: 5,
  },

  description: {
    fontSize: 15,
    color: "#625850",
    lineHeight: 22,
    marginTop: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A2521",
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: "#8B3A3A",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2A2521",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  logout: {
    alignItems: "center",
    padding: 15,
  },

  logoutText: {
    color: "#8B3A3A",
    fontWeight: "bold",
  },
});