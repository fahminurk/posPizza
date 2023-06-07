import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import bg from "../assets/bg-login.jpg";
import logo from "../assets/logo PIZZA PIZZAZZ.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { api } from "../api/api";

export default function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // input
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
  };

  const login = async () => {
    let token;

    if (!user.email || !user.password) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .post("/users/login", user)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.token));
          token = res.data.token;
        })
        .catch((err) =>
          toast({
            title: "Incorrect password/email",
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          })
        );

      await api
        .get("/users/v3", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "login",
            payload: res.data,
          });
          console.log(token);
          if (res.data.role == "ADMIN") {
            toast({
              title: "success login",
              status: "success",
              position: "top",
              duration: 1000,
              isClosable: true,
            });
            return nav("/DashboardAdmin");
          } else {
            toast({
              title: "success login",
              status: "success",
              position: "top",
              duration: 1000,
              isClosable: true,
            });
            return nav("/cashier");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <Center>
        {" "}
        <Box
          bgImage={bg}
          w={"100vw"}
          maxW={"1366px"}
          h={"100vh"}
          maxH={"1024px"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Center>
            <Box
              w={"350px"}
              bg={"white"}
              borderRadius={10}
              border={"8px"}
              borderColor={"#FDA29B"}
            >
              <Flex flexDir={"column"} m={5} gap={5}>
                <Center>
                  <Image src={logo} w={"200px"} />
                </Center>

                <Box>
                  <Box>Email</Box>
                  <Input
                    variant={"filled"}
                    placeholder="Email..."
                    id="email"
                    onChange={inputHandler}
                  />
                </Box>
                <Box>
                  <Box>Password</Box>
                  <Input
                    variant={"filled"}
                    placeholder="Password..."
                    id="password"
                    onChange={inputHandler}
                  />
                </Box>
                <Button
                  bg={"#F04438"}
                  color={"white"}
                  _hover={{ bg: "#FDA29B" }}
                  onClick={login}
                >
                  Login
                </Button>
              </Flex>
            </Box>
          </Center>
        </Box>
      </Center>
    </>
  );
}
