import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
  useToast,
  FormControl,
  Input,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";

const Adddoc = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [value, setValue] = useState();
  const [type, setType] = useState();
  const [doc, setDoc] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const buildInvertedIndex = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", doc);
    formData.append("stemType", type);
    formData.append("removeStopWords", value);
    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res);
    if (res.status == 200) {
      toast({
        title: `Success`,
        status: "success",
        isClosable: true,
        description: "Success build inverted index",
        position: "top-center",
      });
    } else {
      toast({
        title: `Failed`,
        status: "error",
        isClosable: true,
        description: "there are an error in build inverted index",
        position: "top-center",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blue.50"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader
            fontFamily="work sans"
            fontSize="33px"
            display="flex"
            justifyContent="center"
          >
            Build Inverted Index
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl isRequired mb={5} py={5}>
              <FormLabel>Remove stop word Yes or No ?</FormLabel>
              <RadioGroup
                onChange={setValue}
                value={value}
                borderWidth={2}
                borderRadius={5}
                p={2}
              >
                <Stack direction="row">
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired py={5}>
              <FormLabel>Stemming Type</FormLabel>

              <RadioGroup
                onChange={setType}
                value={type}
                borderWidth={2}
                borderRadius={5}
                p={2}
              >
                <Stack direction="row">
                  <Radio value="none">None</Radio>
                  <Radio value="stemm">Stemm</Radio>
                  <Radio value="lemm">Lemm</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={5} py={5}>
              <Input
                type="file"
                p={1}
                onChange={(event) => setDoc(event.target.files[0])}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button
              colorScheme="whatsapp"
              mr={3}
              onClick={buildInvertedIndex}
              isLoading={loading}
            >
              Go
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Adddoc;
