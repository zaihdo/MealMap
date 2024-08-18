import React, { forwardRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SFSymbol, SymbolView } from "expo-symbols";
import { ComponentProps } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 34;
const ICON_SIZE = 25;

interface IconButtonProps {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
}

// Using forwardRef to pass the ref to the TouchableOpacity component
const IconButton = forwardRef<TouchableOpacity, IconButtonProps>(
  ({ androidName, iosName, containerStyle, onPress, width, height }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[
          {
            backgroundColor: "#00000050",
            padding: CONTAINER_PADDING,
            borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
            width: CONTAINER_WIDTH,
          },
          containerStyle,
        ]}
      >
        <SymbolView
          name={iosName}
          size={ICON_SIZE}
          style={width && height ? { width, height } : {}}
          type="hierarchical"
          tintColor={"white"}
          fallback={
            <Ionicons size={ICON_SIZE} name={androidName} color={"white"} />
          }
        />
      </TouchableOpacity>
    );
  }
);

export default IconButton;
