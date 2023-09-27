import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,  } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const buttons = ['AC', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '3', '2', '1', '+', '0', '.', '↤', '='];
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const handleInput = (buttonPressed) => {
    switch (buttonPressed) {
      case '+':
      case '-':
      case '*':
      case '/':
        setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
        break;
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        break;
      case '.':
        setCurrentNumber(currentNumber + buttonPressed);
        break;
      case '↤':
        setCurrentNumber(currentNumber.slice(0, -1));
        break;
      case 'AC':
        setLastNumber('');
        setCurrentNumber('');
        break;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        break;
      default:
        setCurrentNumber(currentNumber + buttonPressed);
        break;
    }
  };

  const calculator = () => {
    const splitNumbers = currentNumber.split(' ');
    const operator = splitNumbers[1];
    if (operator === '*') {
      setCurrentNumber((parseFloat(splitNumbers[0]) * parseFloat(splitNumbers[2])).toString());
    } else if (operator === '/') {
      setCurrentNumber((parseFloat(splitNumbers[0]) / parseFloat(splitNumbers[2])).toString());
    } else if (operator === '+') {
      setCurrentNumber((parseFloat(splitNumbers[0]) + parseFloat(splitNumbers[2])).toString());
    } else if (operator === '-') {
      setCurrentNumber((parseFloat(splitNumbers[0]) - parseFloat(splitNumbers[2])).toString());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity key={button} style={styles.button} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: windowHeight * 0.4,
    backgroundColor: '#8b76a5',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#6d6087'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d6087',
    minHeight: windowHeight * 0.1,
    minWidth: windowWidth * 0.2,
    margin: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 25,
  },
  resultText: {
    fontWeight: '100',
    fontSize: 80,
    margin: 10,
    alignSelf: 'flex-end',
    color: 'white',
  },
  historyText: {
    fontSize: 22,
    marginBottom: 0,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: 'white',
  },
});