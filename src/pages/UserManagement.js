import {useCurrentUser, useUpdateCurrentUser} from "../api/todoApi";
import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Field,
    Input,
    VStack,
    Heading,
    Text,
    Spinner,
} from "@chakra-ui/react";

export default function UserManagement() {
    const {data: user, isLoading, error} = useCurrentUser();
    const updateUser = useUpdateCurrentUser();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        birthday: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (user) {
            setForm({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                birthday: user.birthday || "",
                phone: user.phone || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: undefined}));
        setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");
        try {
            await updateUser.mutateAsync(form);
            setSuccessMessage("Profile updated successfully!");
        } catch (err) {
            // Try to parse field errors if backend provides them
            let msg = err.message || "Update failed";
            let field = null;
            if (msg.toLowerCase().includes("first")) field = "first_name";
            else if (msg.toLowerCase().includes("last")) field = "last_name";
            else if (msg.toLowerCase().includes("birth")) field = "birthday";
            else if (msg.toLowerCase().includes("phone")) field = "phone";
            if (field) setErrors({[field]: msg});
            else setErrors({general: msg});
        }
    };

    if (isLoading) {
        return <Box p={8} textAlign="center"><Spinner size="lg" /></Box>;
    }
    if (error) {
        return <Box p={8} textAlign="center"><Text color="red.500">Failed to load user: {error.message}</Text></Box>;
    }

    return (
        <Box maxW="md" mx="auto" mt={10} p={6} bg="white" borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={6} color="black">User Profile</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <Field.Root name="first_name" color="black" required invalid={!!errors.first_name}>
                        <Field.Label>First Name</Field.Label>
                        <Input
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                            placeholder={errors.first_name ? errors.first_name : user?.first_name || "Enter first name"}
                            borderColor={errors.first_name ? "red.500" : undefined}
                            _placeholder={{ color: errors.first_name ? "red.500" : "gray.500" }}
                        />
                        {errors.first_name && <Field.ErrorText>{errors.first_name}</Field.ErrorText>}
                    </Field.Root>
                    <Field.Root name="last_name" color="black" required invalid={!!errors.last_name}>
                        <Field.Label>Last Name</Field.Label>
                        <Input
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            placeholder={errors.last_name ? errors.last_name : user?.last_name || "Enter last name"}
                            borderColor={errors.last_name ? "red.500" : undefined}
                            _placeholder={{ color: errors.last_name ? "red.500" : "gray.500" }}
                        />
                        {errors.last_name && <Field.ErrorText>{errors.last_name}</Field.ErrorText>}
                    </Field.Root>
                    <Field.Root name="birthday" color="black" invalid={!!errors.birthday}>
                        <Field.Label>Birthday</Field.Label>
                        <Input
                            name="birthday"
                            type="date"
                            value={form.birthday}
                            onChange={handleChange}
                            borderColor={errors.birthday ? "red.500" : undefined}
                            _placeholder={{ color: errors.birthday ? "red.500" : "gray.500" }}
                        />
                        {errors.birthday && <Field.ErrorText>{errors.birthday}</Field.ErrorText>}
                    </Field.Root>
                    <Field.Root name="phone" color="black" invalid={!!errors.phone}>
                        <Field.Label>Phone</Field.Label>
                        <Input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder={errors.phone ? errors.phone : user?.phone || "Enter phone number"}
                            borderColor={errors.phone ? "red.500" : undefined}
                            _placeholder={{ color: errors.phone ? "red.500" : "gray.500" }}
                        />
                        {errors.phone && <Field.ErrorText>{errors.phone}</Field.ErrorText>}
                    </Field.Root>
                    {errors.general && <Text color="red.500">{errors.general}</Text>}
                    <Button
                        type="submit"
                        colorScheme="blue"
                        isLoading={updateUser.isLoading}
                        width="full"
                        borderRadius="md"
                    >
                        Save Changes
                    </Button>
                    {successMessage && (
                        <Text color="green.500" mt={2} textAlign="center">
                            {successMessage}
                        </Text>
                    )}
                </VStack>
            </form>
        </Box>
    );
}