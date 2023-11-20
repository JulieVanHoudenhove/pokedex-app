import { Button, StyleSheet, Text, View } from "react-native";

export default function CustomButton({ changeText, text, color }) {
    const clickEvent = () => {
        changeText(text);
    }

    return (
        <Button
            onPress={clickEvent}
            title="Learn More"
            color={color}
            accessibilityLabel="Learn more about this purple button"
        />
    )
}

const styles = StyleSheet.create({

})