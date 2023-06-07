import { Center, Image } from "@chakra-ui/react";
import loading from "../assets/loading1.gif";

export default function Loading() {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <Image w={"100vw"} maxW={"200px"} src={loading} />
    </Center>
  );
}
