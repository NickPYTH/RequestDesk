import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const height = width * 0.8

export const Carousel = () => {
        const images = [
            {
                source: {
                    uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
                },
            },
            {
                source: {
                    uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
                },
            },
            {
                source: {
                    uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
                },
            },
            {
                source: {
                    uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
                },
            },

        ];
        if (images && images.length) {
            return (
                <View
                    style={styles.scrollContainer}
                >
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
        }
        else{
            return (
                <View/>
            )
        }
}


const styles = StyleSheet.create({
    scrollContainer: {
        height,
    },
    image: {
        width: width-10,
        height,
    },
});
