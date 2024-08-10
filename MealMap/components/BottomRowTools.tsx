import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import IconButton from './IconButton'
import { Link } from 'expo-router'
import { ThemedText } from './ThemedText'

export default function BottomRowTools() {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
        <Link href={"/media-library"} asChild>
            <IconButton iosName={'photo.stack'} androidName={'library'}/>
        </Link>
        <View style={styles.directionRowItemsCenter}>
            <TouchableOpacity onPress={()=>{}}>
                <ThemedText>Snap</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                <ThemedText>Snap</ThemedText>
            </TouchableOpacity>
        </View>
        <IconButton iosName='magnifyingglass' androidName='add'></IconButton>
    </View>
    )
}

const styles = StyleSheet.create({
    directionRowItemsCenter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    bottomContainer: {
        bottom: 5,
        paddingHorizontal: 5,
        width: "100%",
        justifyContent: "space-between",
        position: "absolute",
        alignSelf: "center"
    }
})