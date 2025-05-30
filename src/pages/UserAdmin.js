import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  Field,
  Input,
  VStack,
  Heading,
  Text,
  Spinner,
  Portal,
  CloseButton,
  HStack,
  NativeSelect,
} from "@chakra-ui/react";
import {
  useCurrentUser,
  useAdminUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../api/todoApi";

const USER_TYPE_OPTIONS = [
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

function UserRow({ user, onEdit, onDelete }) {
  return (
    <HStack
      bg="white"
      p={3}
      borderRadius="16px"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      mb={2}
    >
      <VStack align="flex-start" spacing={1} flex={1}>
        <Text fontWeight={600} color="black">
          {user.first_name} {user.last_name} ({user.email})
        </Text>
        <Text fontSize="sm" color="gray.600">
          Phone: {user.phone || "-"} | Birthday: {user.birthday || "-"}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Type: {user.user_type || (user.is_admin ? "ADMIN" : "USER")}
        </Text>
      </VStack>
      <HStack spacing={2}>
        <Button size="sm" colorScheme="blue" onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" colorScheme="red" onClick={onDelete}>
          Delete
        </Button>
      </HStack>
    </HStack>
  );
}

export default function UserAdmin() {
  // Auth and admin check
  const { data: currentUser, isLoading: loadingUser, error: userError } = useCurrentUser();
  const isAdmin = currentUser && (currentUser.is_admin || currentUser.user_type === "ADMIN");

  // User list
  const {
    data: users,
    isLoading: loadingUsers,
    error: usersError,
    refetch: refetchUsers,
  } = useAdminUsers();

  // CRUD hooks
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = add, object = edit
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
    phone: "",
    user_type: "USER",
  });
  const [errors, setErrors] = useState({});

  // Open/close dialog functions
  const openAddDialog = () => {
    setEditingUser(null);
    setForm({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
      phone: "",
      user_type: "USER",
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (user) => {
    setEditingUser(user);
    setForm({
      email: user.email || "",
      password: "", // Password field should be empty for editing
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      birthday: user.birthday || "",
      phone: user.phone || "",
      user_type: user.user_type || (user.is_admin ? "ADMIN" : "USER"),
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
    setForm({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
      phone: "",
      user_type: "USER",
    });
    setErrors({});
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    let hasError = false;
    const newErrors = {};
    
    if (!form.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    
    if (!editingUser && !form.password) {
      newErrors.password = "Password is required for new users";
      hasError = true;
    }
    
    if (!form.first_name) {
      newErrors.first_name = "First name is required";
      hasError = true;
    }
    
    if (!form.last_name) {
      newErrors.last_name = "Last name is required";
      hasError = true;
    }
    
    if (!form.user_type) {
      newErrors.user_type = "User type is required";
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingUser) {
        // For editing, only include password if it's provided
        const updateData = { ...form };
        if (!form.password) {
          delete updateData.password;
        }
        await updateUser.mutateAsync({ userId: editingUser.id, updatedData: updateData });
      } else {
        await createUser.mutateAsync(form);
      }
      closeDialog();
    } catch (err) {
      // Parse error message to determine which field has the error
      const errorMessage = err.message || "Save failed";
      const lowerErrorMessage = errorMessage.toLowerCase();
      
      if (lowerErrorMessage.includes("email")) {
        setErrors(prev => ({ ...prev, email: errorMessage }));
      } else if (lowerErrorMessage.includes("password")) {
        setErrors(prev => ({ ...prev, password: errorMessage }));
      } else if (lowerErrorMessage.includes("first")) {
        setErrors(prev => ({ ...prev, first_name: errorMessage }));
      } else if (lowerErrorMessage.includes("last")) {
        setErrors(prev => ({ ...prev, last_name: errorMessage }));
      } else if (lowerErrorMessage.includes("birth")) {
        setErrors(prev => ({ ...prev, birthday: errorMessage }));
      } else if (lowerErrorMessage.includes("phone")) {
        setErrors(prev => ({ ...prev, phone: errorMessage }));
      } else if (lowerErrorMessage.includes("type")) {
        setErrors(prev => ({ ...prev, user_type: errorMessage }));
      } else {
        // If we can't determine the specific field, show error on email as fallback
        setErrors(prev => ({ ...prev, email: errorMessage }));
      }
    }
  };

  // Handle delete
  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user ${user.email}?`)) return;
    try {
      await deleteUser.mutateAsync(user.id);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  // Loading and error states
  if (loadingUser || loadingUsers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }
  if (userError || usersError) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500">{userError?.message || usersError?.message}</Text>
      </Box>
    );
  }
  if (!isAdmin) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500">You do not have permission to view this page.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="3xl" mx="auto" mt={10} p={6} bg="white" borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={6} color="black">
        User Management (Admin)
      </Heading>
      <Button colorScheme="blue" mb={4} onClick={openAddDialog}>
        Add New User
      </Button>
      <VStack spacing={3} align="stretch">
        {users && users.length > 0 ? (
          users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={() => openEditDialog(user)}
              onDelete={() => handleDelete(user)}
            />
          ))
        ) : (
          <Text color="gray.500">No users found.</Text>
        )}
      </VStack>

      {/* Add/Edit User Dialog */}
      {isDialogOpen && (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen} placement="center">
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content as="form" onSubmit={handleSubmit} mx={{ base: 4, md: 0 }} width={{ base: "90%", md: "md" }}>
                <Dialog.Header pt={4} px={4} pb={2}>
                  <Dialog.Title fontSize="lg" fontWeight="semibold">
                    {editingUser ? "Edit User" : "Add New User"}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body px={4} pb={4}>
                  {/* Email Field */}
                  <Field.Root name="email" required>
                    <Field.Label>Email</Field.Label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={errors.email || "Enter email"}
                      borderColor={errors.email ? "red.500" : "inherit"}
                      _placeholder={{ color: errors.email ? "red.500" : "gray.500" }}
                      isDisabled={!!editingUser}
                    />
                  </Field.Root>

                  {/* Password Field */}
                  <Field.Root name="password" mt={4} required={!editingUser}>
                    <Field.Label>
                      Password {editingUser && "(leave empty to keep current password)"}
                    </Field.Label>
                    <Input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder={errors.password || (editingUser ? "Enter new password (optional)" : "Enter password")}
                      borderColor={errors.password ? "red.500" : "inherit"}
                      _placeholder={{ color: errors.password ? "red.500" : "gray.500" }}
                    />
                  </Field.Root>

                  {/* First Name Field */}
                  <Field.Root name="first_name" mt={4} required>
                    <Field.Label>First Name</Field.Label>
                    <Input
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      placeholder={errors.first_name || "Enter first name"}
                      borderColor={errors.first_name ? "red.500" : "inherit"}
                      _placeholder={{ color: errors.first_name ? "red.500" : "gray.500" }}
                    />
                  </Field.Root>

                  {/* Last Name Field */}
                  <Field.Root name="last_name" mt={4} required>
                    <Field.Label>Last Name</Field.Label>
                    <Input
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      placeholder={errors.last_name || "Enter last name"}
                      borderColor={errors.last_name ? "red.500" : "inherit"}
                      _placeholder={{ color: errors.last_name ? "red.500" : "gray.500" }}
                    />
                  </Field.Root>

                  {/* Birthday Field */}
                  <Field.Root name="birthday" mt={4}>
                    <Field.Label>Birthday</Field.Label>
                    <Input
                      name="birthday"
                      type="date"
                      value={form.birthday}
                      onChange={handleChange}
                      borderColor={errors.birthday ? "red.500" : "inherit"}
                      _placeholder={{ color: errors.birthday ? "red.500" : "gray.500" }}
                    />
                  </Field.Root>

                  {/* Phone Field */}
                  <Field.Root name="phone" mt={4}>
                    <Field.Label>Phone</Field.Label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={errors.phone || "Enter phone number"}
                      borderColor={errors.phone ? "red.500" : "inherit"}
                      _placeholder={{ color: errors.phone ? "red.500" : "gray.500" }}
                    />
                  </Field.Root>

                  {/* User Type Field */}
                  <Field.Root name="user_type" mt={4} required>
                    <Field.Label>User Type</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        name="user_type"
                        value={form.user_type}
                        onChange={handleChange}
                        borderColor={errors.user_type ? "red.500" : "inherit"}
                      >
                        {USER_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {errors.user_type && (
                      <Text fontSize="sm" color="red.500" mt={1}>
                        {errors.user_type}
                      </Text>
                    )}
                  </Field.Root>
                </Dialog.Body>
                <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                  <Button colorPalette="blue" mr={3} type="submit" isLoading={createUser.isLoading || updateUser.isLoading}>
                    Save
                  </Button>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton onClick={closeDialog} />
                  </Dialog.CloseTrigger>
                </Box>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </Box>
  );
} 