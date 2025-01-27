import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import Config from "react-native-config";

import { signIn, signUp } from "../../firebase/authService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      let token;
      if (isSignUp) {
        // Sign Up logic
        token = await signUp(email, password);
        console.log("Signed up and token:", token);
      } else {
        // Sign In logic
        token = await signIn(email, password);
        console.log("Signed in and token:", token);
      }

      // Send token to backend for validation
      const response = await fetch(`${Config.PUBLIC_BACKEND_URI}/api/whoami`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Backend response:", data);
      } else {
        throw new Error("Failed to fetch user data from the backend");
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      setErrorMessage("Authentication failed");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button title={isSignUp ? "Sign Up" : "Sign In"} onPress={handleAuth} />
      <Button
        title={isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        onPress={() => {
          setIsSignUp(!isSignUp);
        }}
      />
    </View>
  );
};

export default LoginScreen;
