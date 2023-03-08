import React, { Component } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import {host} from "../conf";
const { width } = Dimensions.get("window");
const height = width * 0.8;

export const Carousel = ({ ids }) => {
    const images = [];
    ids.map((id) => {
        images.push({
            source: {
                uri: `http://${host}:8000/api/accounts/get-image-by-id?id=${id}`,
            },
        });
    });
    if (images && images.length) {
        return (
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    {images.map((image, id) => (
                        <View>
                            <Image style={styles.image} source={image.source} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    } else {
        return <View />;
    }
};

const styles = StyleSheet.create({
    scrollContainer: {
        height,
    },
    image: {
        width: width - 10,
        height,
    },
});
