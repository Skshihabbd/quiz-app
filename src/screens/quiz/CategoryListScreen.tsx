import React, { useCallback, useContext, useEffect, useRef, useState,  } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { categoriesData } from '../../data/categoriesData';
import { ThemeContext } from '../../context/ThemeContext';
import CustomHeader from '../../components/CustomHeader';
import FloatingMenuButton from '../../components/FloatingMenuButton';
import { SafeAreaView } from 'react-native-safe-area-context';

// AdMob Imports
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import { useFocusEffect } from '@react-navigation/native';

// Test Ad Unit ID (Android)
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxxxxx'; 

export default function CategoryListScreen({ navigation }: any) {
  const { colors } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  

  // 1. Component-er bhetore ekti Ref add korun (eta state-er moto render disturb korbe na)
const isShowingAd = useRef(false);
  // Ad loading and showing logic
  const { isLoaded, isClosed, load, show, } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  // ১. Initial Load (Screen-e ashar sathe sathe)
  useEffect(() => {
    load();
  }, [load]);

  // 2. Ad close hole flag reset korun
useEffect(() => {
  if (isClosed) {
    isShowingAd.current = false; // Ad close hoyeche
    load(); // Naya ad load korun
  }
}, [isClosed, load]);

  // ৩. ২০ সেকেন্ড (বা আপনার সেট করা ১০ সেকেন্ড) টাইমার
 // 3. useFocusEffect-er bhetore timer logic-ti update korun
useFocusEffect(
  useCallback(() => {
    const timer = setInterval(() => {
      // Shudu jodi ad load thake EBONG screen-e kono ad na thake, tokhon-i show korbe
      if (isLoaded && !isShowingAd.current) {
        console.log("Timer trigger: Showing Ad");
        isShowingAd.current = true; // Set flag jate timer abar show na kore
        show();
      } else if (!isLoaded && !isShowingAd.current) {
        console.log("Timer trigger: Loading Ad (Not ready)");
        load();
      }
    }, 200000); // 20 seconds

    return () => clearInterval(timer);
  }, [isLoaded, load, show])
);

 // 4. handleCategoryPress-eo flag set korun
const handleCategoryPress = (categoryId: string) => {
  if (isLoaded && !isShowingAd.current) {
    isShowingAd.current = true;
    // show();
  }
  navigation.navigate('QuizzesByCategory', { categoryId });
};

  // ৫. Refresh logic
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Force load ad on refresh
    load();

    setTimeout(() => {
      setRefreshing(false);
      console.log("Refresh finished, Ad status:", isLoaded);
    }, 2000);
  }, [load, isLoaded]);

  // Styles (Dynamic and clear)
  const dynamicStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    listContent: { padding: 15 },
    categoryCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 3,
      borderLeftWidth: 5,
      paddingRight: 15,
    },
    iconContainer: {
      width: 80, height: 80,
      justifyContent: 'center', alignItems: 'center',
      borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
    },
    cardContent: { flex: 1, paddingHorizontal: 15, paddingVertical: 10 },
    categoryName: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    categoryDescription: { fontSize: 13, color: colors.secondaryText, marginBottom: 8 },
    quizCount: { fontSize: 12, color: colors.secondaryText },
  });

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[dynamicStyles.categoryCard, { borderLeftColor: item.color }]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <View style={[dynamicStyles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={40} color="white" />
      </View>
      <View style={dynamicStyles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
           <Ionicons name={item.icon} size={16} color={item.color} style={{ marginRight: 5 }} />
           <Text style={dynamicStyles.categoryName}>{item.name}</Text>
        </View>
        <Text style={dynamicStyles.categoryDescription} numberOfLines={2}>{item.description}</Text>
        <Text style={dynamicStyles.quizCount}>📚 {item.quizzes.length} Quizzes</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.secondaryText} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CustomHeader title="Quiz Categories" onMenuPress={() => navigation.openDrawer()} />
      <FlatList
        data={categoriesData}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        contentContainerStyle={dynamicStyles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={['#007bff']} 
            tintColor={colors.text}
          />
        }
      />
      <FloatingMenuButton onPress={() => navigation.openDrawer()} />
    </SafeAreaView>
  );
}