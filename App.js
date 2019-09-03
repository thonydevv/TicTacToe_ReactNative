/* 
   ** Créateur: Anthony BARRAULT **
   ** Date: 23/04/2019 **
   ** Titre: TicTacToe **
   ** Description: simple TicTacToe **
*/

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }

  //Returns 1 if Player 1 won, -1 if Player 2 won or 0 if no one has won
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState
    var sum;

    //Check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }

    }

    //Check columns
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    } 

    //Check the diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }

    //No winners
    return 0;
  }

  onTilePress = (row, col) => {
    //Don't allow tiles to change
    var value =  this.state.gameState[row][col];
    if (value !== 0) { return; }

    //Grab current player
    var currentPlayer = this.state.currentPlayer;
    
    //Set the correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //Switch player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //Check for winners
    var winner = this.getWinner();
    if (winner == 1) { 
      Alert.alert ("Player 1 is the winner !");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert ("Player 2 is the winner !")
      this.initializeGame();
    }

  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value) {
      case 1: return <Icon style={styles.X} name="close"/>;
      case -1: return <Icon style={styles.O} name="checkbox-blank-circle-outline"/>;
      default : return <View/>;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.tile_container}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
          {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0}]}>
          {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>
          {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.tile_container}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0}]}>
          {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
          {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0}]}>
          {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.tile_container}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
          {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0}]}>
          {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>
          {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop:50}}/>
        <Button title="New Game" onPress={this.onNewGamePress}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 3,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center"
  },
  tile_container: {
    flexDirection:'row'
  },
  X: {
    color: "red",
    fontSize: 130,
  },
  O: {
    color: "green",
    fontSize: 130,
  }
});
