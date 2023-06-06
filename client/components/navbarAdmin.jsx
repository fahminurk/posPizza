import { Avatar, Box, Center, Flex, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function NavbarAdmin() {
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);
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
            <Box w={"385px"}>
              <Input
                variant={"filled"}
                placeholder="Search document or Product"
                w={"80%"}
              />
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
