import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import contacts from "../contacts";

const ContactList = () => {

  return (
    <Box>
      {contacts.map((contact, index) => (
        <Flex key={index} alignItems="center" p={2}>
          <Avatar src={contact.avatar} name={contact.name} />
          <Link href={`/send/${contact.id}`} ml={4}>{contact.name}</Link>
        </Flex>
      ))}
    </Box>
  );
};

export default ContactList;