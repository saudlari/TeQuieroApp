import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const ContactList = () => {
  const contacts = [
    { name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Bob Brown", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Eve Williams", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
  ];

  return (
    <Box>
      {contacts.map((contact, index) => (
        <Flex key={index} alignItems="center" p={2}>
          <Avatar src={contact.avatar} name={contact.name} />
          <Text ml={4}>{contact.name}</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default ContactList;