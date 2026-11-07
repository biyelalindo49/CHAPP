import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMenu, type MenuItem } from "../../context/menu-context";

export default function AddMenu() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { menuItems, addMenuItem, updateMenuItem } = useMenu();
  const editingId = id ? Number(id) : null;
  const editingItem = editingId === null
    ? undefined
    : menuItems.find((item) => item.id === editingId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Starter");
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description);
      setPrice(editingItem.price);
      setCategory(editingItem.category);
    }
  }, [editingItem]);

  const saveItem = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      setErrorMessage("Please complete the dish name, description, and price.");
      return;
    }

    const updatedFields = {
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      category,
    };

    if (editingId !== null) {
      if (!editingItem) {
        Alert.alert("Menu item unavailable", "This menu item may have been deleted.");
        router.replace("/screens/menu");
        return;
      }
      const updatedItem: MenuItem = { ...updatedFields, id: editingId };
      updateMenuItem(updatedItem);
    } else {
      addMenuItem(updatedFields);
    }
    router.replace("/screens/menu");
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>
          {editingId === null ? "Add Menu Item" : "Edit Menu Item"}
        </Text>

        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setErrorMessage("");
          }}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={styles.description}
          placeholder="Enter description"
          value={description}
          onChangeText={(value) => {
            setDescription(value);
            setErrorMessage("");
          }}
          multiline
        />

        <Text style={styles.label}>
          Price
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          onChangeText={(value) => {
            setPrice(value);
            setErrorMessage("");
          }}
          keyboardType="numeric"
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.label}>
          Category
        </Text>

        <TouchableOpacity
          style={styles.categoryDropdown}
          onPress={() => setCategoryDropdownOpen((open) => !open)}
          accessibilityRole="button"
          accessibilityLabel={`Category: ${category}`}
          accessibilityState={{ expanded: categoryDropdownOpen }}
        >
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.dropdownIcon}>
            {categoryDropdownOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {categoryDropdownOpen && (
          <View style={styles.categoryOptions}>
            {["Starter", "Main Course", "Seafood", "Dessert"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryOption,
                  category === item && styles.selected,
                ]}
                onPress={() => {
                  setCategory(item);
                  setCategoryDropdownOpen(false);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: category === item }}
              >
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={saveItem}
        >
          <Text style={styles.buttonText}>
            {editingId === null ? "SAVE MENU ITEM" : "UPDATE MENU ITEM"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>
            BACK TO MENU
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
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2A2521",
    marginTop: 25,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2521",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3C7B9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },

  description: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3C7B9",
    borderRadius: 8,
    padding: 15,
    height: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },

  categoryDropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3C7B9",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryOptions: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3C7B9",
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },

  categoryOption: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8DFD5",
  },

  dropdownIcon: {
    color: "#625850",
    fontSize: 12,
  },

  selected: {
    borderWidth: 2,
    borderColor: "#A27A3D",
  },

  categoryText: {
    color: "#2A2521",
  },

  errorMessage: {
    color: "#8B3A3A",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2A2521",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  back: {
    alignItems: "center",
    padding: 15,
  },

  backText: {
    color: "#2A2521",
    fontWeight: "bold",
  },
});