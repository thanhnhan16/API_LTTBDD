import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const Screen1 = ({ navigation }) => {
  const [user, setUser] = useState([]);
  var [task, setTask] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUser();
  }, [isFocused]);
  useEffect(() => {
    getTask();
  }, [isFocused]);

  const getUser = () => {
    fetch("https://6544aecc5a0b4b04436cbb37.mockapi.io/user", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        // handle error
      });
  };

  const getTask = () => {
    fetch("https://6544aecc5a0b4b04436cbb37.mockapi.io/tasks", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        setTask(task);
      })
      .catch((error) => {
        // handle error
      });
  };

  const deleteTask = (id) => {
    fetch("https://6544aecc5a0b4b04436cbb37.mockapi.io/tasks/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        getTask(task);
      })
      .catch((error) => {
        // handle error
      });
  };
  return (
    <View>
      {user
        .filter((item) => {
          return item.id == 1;
        })
        .map((item) => {
          return (
            <View>
              <View style={styles.g1}>
                <Image
                  style={styles.img11}
                  source={require("../assets/Icon Button 11.png")}
                />
                <TouchableOpacity>
                  <Image style={styles.avatar} source={item.avatar} />
                </TouchableOpacity>

                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.text1}>Have agrate day a head</Text>
                </View>
              </View>

              <View>
                {task.map((item) => {
                  return (
                    <View style={styles.g2}>
                      <TouchableOpacity onPress={() => deleteTask(item.id)}>
                        <Image
                          source={require("../assets/Frame (4).png")}
                          style={styles.img1}
                        />
                      </TouchableOpacity>
                      <Text style={styles.text2}>{item.task}</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Screen3", item)}
                      >
                        <Image
                          source={require("../assets/Frame (3).png")}
                          style={styles.img2}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Screen2")}
                style={{ alignItems: "center", marginTop: 20 }}
              >
                <Image
                  source={require("../assets/Group 13.png")}
                  style={{ width: 69, height: 69 }}
                  resizeMode="contain"
                ></Image>
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  g1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  img11: {
    width: "36px",
    height: "36px",
    margin: 10,
  },
  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50px",
    marginLeft: 50,
  },
  name: {
    fontFamily: "Epilogue",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "30px",
    color: "#171A1F",
  },
  text1: {
    fontFamily: "Epilogue",
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "22px",
    color: "#171A1F",
  },
  img1: {
    width: 24,
    height: 24,
  },
  img2: {
    width: 24,
    height: 24,
  },
  text2: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 700,
  },
  g2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 335,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DEE1E678",
    margin: 22,
  },
});
