import { colors } from "@/constants/colors";
import { View,Text,StyleSheet } from "react-native"

const ReportTabScreen = ()=>{
    return(
        <View style={styles.container}>

            <Text>
                hi ReportTabScreen
            </Text>
        </View>
    )
}

export default ReportTabScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.WHITE,
  },
});