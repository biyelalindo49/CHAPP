import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { useMenu } from "../../context/menu-context";

const courseFilters = ["All Courses", "Starter", "Main Course", "Dessert"] as const;

export default function Menu() {
  const { menuItems, deleteMenuItem } = useMenu();
  const [searchText, setSearchText] = React.useState("");
  const [selectedCourse, setSelectedCourse] =
    React.useState<(typeof courseFilters)[number]>("All Courses");
  const prices = menuItems
    .map((item) => Number.parseFloat(item.price.replace(/[^\d.]/g, "")))
    .filter(Number.isFinite);
  const averagePrice = prices.length > 0
    ? `R${(prices.reduce((total, price) => total + price, 0) / prices.length).toFixed(2)}`
    : "—";
  const courseNames = Array.from(new Set([
    "Starter",
    "Main Course",
    "Seafood",
    "Dessert",
    ...menuItems.map((item) => item.category),
  ]));
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchText.trim().toLowerCase());
    const matchesCourse = selectedCourse === "All Courses" || item.category === selectedCourse;
    return matchesName && matchesCourse;
  });

  const clearFilters = () => {
    setSearchText("");
    setSelectedCourse("All Courses");
  };

  const confirmDelete = (id: number, name: string) => {
    Alert.alert(
      "Delete menu item",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMenuItem(id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Chef Christoffel's Menu
      </Text>

      <Text style={styles.subtitle}>
        Featured Food
      </Text>

      <View style={styles.overview}>
        <Text style={styles.overviewTitle}>Menu Overview</Text>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{menuItems.length}</Text>
            <Text style={styles.summaryLabel}>Total items</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{averagePrice}</Text>
            <Text style={styles.summaryLabel}>Average price</Text>
          </View>
        </View>
        <Text style={styles.courseSummaryTitle}>Items by course</Text>
        <View style={styles.courseSummary}>
          {courseNames.map((course) => (
            <View style={styles.courseCount} key={course}>
              <Text style={styles.courseCountValue}>
                {menuItems.filter((item) => item.category === course).length}
              </Text>
              <Text style={styles.courseCountLabel}>{course}</Text>
            </View>
          ))}
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search menu items by name"
        value={searchText}
        onChangeText={setSearchText}
        accessibilityLabel="Search menu items by name"
        returnKeyType="search"
      />

      <Text style={styles.filterLabel}>Filter by course</Text>
      <View style={styles.filterOptions}>
        {courseFilters.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterOption,
              selectedCourse === course && styles.selectedFilterOption,
            ]}
            onPress={() => setSelectedCourse(course)}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedCourse === course }}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedCourse === course && styles.selectedFilterOptionText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {(searchText.length > 0 || selectedCourse !== "All Courses") && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearFilters}
          accessibilityRole="button"
        >
          <Text style={styles.clearButtonText}>CLEAR SEARCH AND FILTER</Text>
        </TouchableOpacity>
      )}

      <ScrollView>

        {filteredMenuItems.length === 0 ? (
          <Text style={styles.emptyMessage}>No menu items match your search.</Text>
        ) : filteredMenuItems.map((item) => (

          <View
            style={styles.card}
            key={item.id}
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

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push({
                  pathname: "/screens/addmenu",
                  params: { id: String(item.id) },
                })}
              >
                <Text style={styles.editButtonText}>EDIT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id, item.name)}
              >
                <Text style={styles.deleteButtonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
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

  overview: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },

  overviewTitle: {
    color: "#2A2521",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  summaryCards: {
    flexDirection: "row",
    marginBottom: 12,
  },

  summaryCard: {
    backgroundColor: "#F7F1E8",
    borderRadius: 8,
    flex: 1,
    padding: 10,
    marginRight: 8,
  },

  summaryValue: {
    color: "#2A2521",
    fontSize: 20,
    fontWeight: "bold",
  },

  summaryLabel: {
    color: "#625850",
    fontSize: 12,
    marginTop: 3,
  },

  courseSummaryTitle: {
    color: "#2A2521",
    fontWeight: "bold",
    marginBottom: 8,
  },

  courseSummary: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  courseCount: {
    minWidth: "25%",
    alignItems: "center",
    paddingVertical: 5,
  },

  courseCountValue: {
    color: "#A27A3D",
    fontSize: 18,
    fontWeight: "bold",
  },

  courseCountLabel: {
    color: "#625850",
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3C7B9",
    borderRadius: 8,
    padding: 13,
    marginBottom: 14,
    fontSize: 16,
  },

  filterLabel: {
    color: "#2A2521",
    fontWeight: "bold",
    marginBottom: 8,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  filterOption: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3C7B9",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 7,
    marginBottom: 7,
  },

  selectedFilterOption: {
    backgroundColor: "#2A2521",
    borderColor: "#2A2521",
  },

  filterOptionText: {
    color: "#2A2521",
    fontSize: 13,
  },

  selectedFilterOptionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  clearButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 2,
  },

  clearButtonText: {
    color: "#8B3A3A",
    fontWeight: "bold",
    fontSize: 12,
  },

  emptyMessage: {
    color: "#625850",
    textAlign: "center",
    paddingVertical: 24,
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

  actions: {
    flexDirection: "row",
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#2A2521",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#8B3A3A",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
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