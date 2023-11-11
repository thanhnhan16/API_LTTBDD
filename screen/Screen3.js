import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const Screen3 = ({ navigation, route }) => {
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [task, setTask] = useState([]);

  useEffect(() => {
    getUser();
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

  const updateTask = (taskName) => {
    const newTask = {
      content: "Check out mockapi.io",
      completed: false,
    };

    fetch(
      "https://6544aecc5a0b4b04436cbb37.mockapi.io/tasks/" + route.params.id,
      {
        method: "PUT", // or PATCH
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          task: taskName,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {})
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
              <Text style={styles.text2}>UPDATE YOUR JOB</Text>

              <View style={styles.g2}>
                <Image
                  style={styles.img4}
                  source={require("../assets/Frame (4).png")}
                />
                <TextInput
                  onChangeText={(text) => {
                    setTask(text);
                  }}
                  placeholder={route.params.task}
                  style={styles.input}
                ></TextInput>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Screen1", updateTask(task))}
              >
                <Text style={styles.textbutton}>UPDATE</Text>
              </TouchableOpacity>
              <Image
                style={styles.image96}
                source={require("../assets/Image 96.png")}
              />
            </View>
          );
        })}
    </View>
  );
};

export default Screen3;

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
  text2: {
    fontFamily: "Epilogue",
    fontSize: "32px",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: "48px",
    color: "#171A1F",
    marginTop: 20,
  },
  g2: {
    width: "334px",
    height: "55px",
    flexDirection: "row",
    border: "1px solid black",
    borderRadius: "3px",
    marginLeft: "25px",
  },
  input: {
    width: "290px",
    height: "55px",
  },
  img4: {
    width: "30px",
    height: "35px",
    margin: 7,
  },
  textbutton: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "26px",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    width: "190px",
    height: "44px",
    borderRadius: "12px",
    backgroundColor: "#00BDD6",
    marginTop: "60px",
    marginLeft: "100px",
  },
  image96: {
    width: "190px",
    height: "170px",
    marginLeft: "100px",
    marginTop: "80px",
  },
});
