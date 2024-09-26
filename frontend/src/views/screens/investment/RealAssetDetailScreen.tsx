import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Button } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/font';

export default function RealAssetDetailScreen() {
  const [terminateModalVisible, setTerminateModalVisible] = useState(false); // 위험 자산 모달 상태
 
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>현재 가입 가능한 적금 상품 목록</Text>
        </View>

        <View style={styles.savingsNameContainer}>
          <View style={styles.savingsPercentageContainer}>
            <Text style={styles.savingsNameText}>안전 제일 튼튼 적금</Text>
          </View>
          <View style={styles.savingsPercentageContainer}>
            <View style={[styles.savingsPercentageLeftContainer,styles.borderRight]}>
              <Text style={styles.savingsSubText}>최고</Text>
              <Text style={styles.savingsPercentageText}>연 3.5%</Text>
            </View>
            <View style={styles.savingsPercentageRightContainer}>
              <Text style={styles.savingsSubText}>기본</Text>
              <Text style={styles.savingsPercentageText}>연 3.4% (3개월)</Text>
            </View>          
          </View>
        </View>

        <View style={styles.savingsDescriptionContainer}>
          <View style={styles.savingsDescriptionTextContainer}>
            <Text style={styles.descriptionTitle}>상품안내</Text>
            <Text style={styles.descriptionSubTitle}>기간 
              <Text style={styles.descriptionText}> 3개월</Text>
            </Text>
            <Text style={styles.descriptionSubTitle}>금액
              <Text style={styles.descriptionText}> 월 1,000 머니 이상{"\n        "}5,000 머니 이하</Text>
            </Text>
            <Text style={styles.descriptionSubTitle}>가입방법
              <Text style={styles.descriptionText}> 모바일 앱</Text>
            </Text>
            <Text style={styles.descriptionSubTitle}>대상
              <Text style={styles.descriptionText}> 실명의 개인(1인 1계좌)</Text>
            </Text>
            <Text style={styles.descriptionSubTitle}>적립방법
              <Text style={styles.descriptionText}> 정액정립식(매달 1일 1회)</Text>
            </Text>
            <Text style={styles.descriptionSubTitle}>우대조건
              <Text style={styles.descriptionText}>  기간 내 10회 이상 퀴즈 참여시{"\n                "}0.1% 우대 이율 제공</Text>
            </Text>
            <Text style={styles.descriptionSubTitle}>이자지급
              <Text style={styles.descriptionText}> 만기일시 지급식</Text>
            </Text>
          </View>
          <View style={styles.savingsNoteTextContainer}>
              <Text style={styles.descriptionText}>※ 중도 해지 시 중도 해지 이율 2% 적용</Text>
              <Text style={styles.descriptionText}>※ 일부 해지는 불가</Text>
          </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                    style={styles.terminateButton}
                    onPress={() => setTerminateModalVisible(true)}
                  >
                    <Text style={styles.buttonText}>해지하기</Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={terminateModalVisible}
              onRequestClose={() => setTerminateModalVisible(false)} // Android 뒤로가기 처리
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>해지하시겠습니까?</Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                            style={styles.cancelButton}
                          >
                            <Text style={styles.buttonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={styles.realTerminateButton}
                          >
                            <Text style={styles.buttonText}>해지</Text>
                    </TouchableOpacity>
                  </View>
                    <Text style={styles.noteText}>현재 해지시 중도 해지 이율 2% 적용한 10,200 머니 환급</Text>
                  <Button title="닫기" onPress={() => setTerminateModalVisible(false)} />
                </View>
              </View>
            </Modal>

            <TouchableOpacity
                    style={styles.okButton}
                  >
                    <Text style={styles.buttonText}>가입하기</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
   
  },
  titleContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  titleText: {
    color:colors.BLACK,
    fontFamily: fonts.BOLD,
    fontSize:17
  },
  savingsNameContainer:{
    width:309,
    height:98,
    borderRadius:10,
    backgroundColor:colors.YELLOW_25,
    alignItems:'flex-start',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#FFE37F'
  },
  savingsDescriptionContainer:{
    height:331,
    width:309,
    marginTop:20,
    borderRadius:10,
    backgroundColor:colors.GRAY_25
  },
  savingsNameText:{
    textAlign:'left',
    fontFamily: fonts.MEDIUM,
    fontSize:18,
    color:colors.BLACK
  },
  savingsPercentageContainer:{
    flexDirection:'row',
    marginTop:3,
    marginLeft:14
  },
  savingsPercentageLeftContainer:{
    paddingRight:10,
    marginTop:7
  },
  savingsPercentageRightContainer:{
    paddingLeft:10,
    marginTop:7
  },
  borderRight:{
    borderRightWidth:2,
    borderColor:colors.BLACK
  },
  savingsSubText:{
    fontFamily: fonts.LIGHT,
    fontSize:14,
    color:colors.BLACK
  },
  savingsPercentageText:{
    fontFamily: fonts.BOLD,
    fontSize:18,
    color:colors.BLUE_100
  },
  descriptionTitle:{
    fontFamily: fonts.BOLD,
    fontSize:18,
    color:colors.BLACK,
    lineHeight: 20,
  },
  descriptionSubTitle:{
    fontFamily: fonts.BOLD,
    fontSize:16,
    color:colors.BLACK,
    lineHeight: 20,
  },
  descriptionText:{
    fontFamily: fonts.LIGHT,
    color:colors.BLACK,
    lineHeight: 20,
  },
  savingsDescriptionTextContainer:{
    marginLeft:17,
    marginTop:30
  },
  savingsNoteTextContainer:{
    marginLeft:17,
    marginTop:17
  },
  terminateButton: {
    width: 153,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_50,
  },
  okButton: {
    width: 153,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_75,
  },
  cancelButton: {
    width: 95,
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE37F',
  },
  realTerminateButton:{
    width: 95,
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderWidth:1,
    borderColor: '#FEE37F',
  },
  buttonText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 15,
  },
  buttonContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width:320,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContent: {
    width: 320,
    height: 150,
    padding: 20,
    backgroundColor: colors.YELLOW_25,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    width:200,
  },
  modalText: {
    fontFamily:fonts.BOLD,
    fontSize: 25,
    marginTop:10,
    marginBottom: 10,
    textAlign:'left',
    color:colors.BLACK
  },
  noteText:{
    fontFamily:fonts.LIGHT,
    marginTop:14,
    fontSize: 10,
    color:colors.BLACK
  }
});


