import React from "react";
              import PropTypes from "prop-types";
              import { Box, Flex, Text, Icon } from "@chakra-ui/react";

              const Card = React.memo(({
                  title,
                  icon,
                  value,
                  description,
                  children,
                  bg = "white",
                  p = { base: 3, md: 4 },
                  borderRadius = "lg",
                  ...props
              }) => {
                  return (
                      <Box bg={bg} p={p} borderRadius={borderRadius} {...props}>
                          {title && (
                              <Flex align="center" opacity="60%" mb={{ base: 2, md: 3 }} flexWrap="wrap">
                                  {icon && <Icon as={icon} mr={2} boxSize={{ base: "16px", md: "18px" }} />}
                                  <Text
                                      fontFamily="Inter"
                                      fontWeight={400}
                                      fontSize={{ base: "12px", md: "14px" }}
                                      lineHeight="160%"
                                      color="#161819"
                                  >
                                      {title}
                                  </Text>
                              </Flex>
                          )}

                          {value && (
                              <Box width="100%" maxHeight={{ base: "60px", md: "80px" }}>
                                  {value}
                              </Box>
                          )}

                          {children}

                          {description && (
                              <Text
                                  fontFamily="Inter"
                                  fontWeight={400}
                                  fontSize={{ base: "10px", md: "12px" }}
                                  lineHeight="160%"
                                  opacity="60%"
                                  color="#161819"
                                  mt={2}
                              >
                                  {description}
                              </Text>
                          )}
                      </Box>
                  );
              });

              Card.propTypes = {
                  title: PropTypes.string,
                  icon: PropTypes.elementType,
                  value: PropTypes.node,
                  description: PropTypes.string,
                  children: PropTypes.node,
                  bg: PropTypes.string,
                  p: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
                  borderRadius: PropTypes.string,
              };

              Card.defaultProps = {
                  bg: "white",
                  p: { base: 3, md: 4 },
                  borderRadius: "lg",
              };

              export default Card;