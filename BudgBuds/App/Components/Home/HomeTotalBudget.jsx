import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Colors, Modal, Portal } from 'react-native-paper';


export default function HomeTotalBudget(props) {
  const { amount } = props;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  
  return (
    <View style={styles.container}>
      <Text>{amount}</Text>
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
  
});

