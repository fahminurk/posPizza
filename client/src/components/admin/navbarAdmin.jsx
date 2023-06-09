import { Avatar, Box, Center, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export default function NavbarAdmin() {
  const userSelector = useSelector((state) => state.auth);
  // console.log(userSelector);

  const LiveJam = () => {
    const [time, setTime] = useState(moment().format("hh:mm:ss"));

    useEffect(() => {
      setTimeout(() => {
        setTime(moment().format("hh:mm:ss"));
      }, 1000);
    }, [time]);

    return <>{moment().format("DD MMMM, hh:mm:ss a")}</>;
  };

  return (
    <>
      <Center position={"fixed"} zIndex={2}>
        <Box
          pl={"200px"}
          w={"100vw"}
          // maxW={"1119px"}
          h={"88px"}
          border={"solid"}
          borderColor={"#CDD5DF"}
          bg={"white"}
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            m={"17px 15px"}
            // bg={"white"}
          >
            <Box
              color={"white"}
              fontSize={"20px"}
              fontWeight={"bold"}
              bg={"#B42318"}
              p={2}
              borderRadius={5}
            >
              {LiveJam()}
            </Box>
            <Flex gap={3} alignItems={"center"}>
              <Box flexDir={"column"} fontSize={"sm"}>
                <Box>{userSelector.name}</Box>
                <Box float={"right"} color={"gray"}>
                  {userSelector.role}
                </Box>
              </Box>
              <Box>
                <Avatar src={userSelector.avatar_url} w={"40px"} h={"40px"} />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
