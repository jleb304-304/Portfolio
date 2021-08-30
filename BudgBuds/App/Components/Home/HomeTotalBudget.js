import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Modal, Portal } from 'react-native-paper';
import { Colors, Metrics } from '../../Themes';


export default function HomeTotalBudget(props) {
  const { amount } = props;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{amount}</Text>
      {/* <IconButton
        icon="information-outline"
        color={Colors.red500}
        size={20}
        onPress={showModal}
      /> */}
      {/* <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  amount: {
    fontFamily: 'JosefinSans',
    color: Colors.black,
    fontSize: Metrics.fontsize.XL*1.4,
  }
});
