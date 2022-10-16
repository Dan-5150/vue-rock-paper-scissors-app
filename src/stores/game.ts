import { defineStore } from 'pinia'
import { Options } from '../enums/options.enum'
import { Outcomes } from '../enums/outcomes.enum'

interface GameState {
  playerChoice: string
  houseChoice: string
  playerScore: number
  houseScore: number
  gameResults: string[]
  options: Option[]
}

interface Option {
  id: number
  name: string
  bonus: boolean
  bonusOrder: number
}

export const useGameStore = defineStore('game', {
  state: (): GameState => {
    return {
      playerChoice: '',
      houseChoice: '',
      playerScore: 0,
      houseScore: 0,
      gameResults: [],
      options: [
        {
          id: 1,
          name: Options.paper,
          bonus: false,
          bonusOrder: 3,
        },
        {
          id: 2,
          name: Options.scissors,
          bonus: false,
          bonusOrder: 2,
        },
        {
          id: 3,
          name: Options.rock,
          bonus: false,
          bonusOrder: 5,
        },
        {
          id: 4,
          name: Options.lizard,
          bonus: true,
          bonusOrder: 4,
        },
        {
          id: 5,
          name: Options.spock,
          bonus: true,
          bonusOrder: 2,
        },
      ],
    }
  },

  getters: {
    normalOptions(state: GameState): Option[] {
      return state.options.filter((option) => !option.bonus)
    },
    normalOptionsOrder(): Option[] {
      return this.normalOptions.sort((a, b) => a.id - b.id)
    },
    bonusOptionsOrder(state: GameState): Option[] {
      return state.options.sort((a, b) => a.bonusOrder - b.bonusOrder)
    },
  },

  actions: {
    setPlayerChoice(choice: string, bonusGame: boolean) {
      this.playerChoice = choice
      bonusGame ? this.pickHouseOptionBonus() : this.pickHouseOption()
      this.determineWinner()
      console.log("pc", this.playerChoice)
      console.log("hc", this.houseChoice)
      console.log(this.gameResults)
    },

    pickHouseOptionBonus() {
      this.houseChoice =
        this.options[Math.floor(Math.random() * this.options.length)].name
    },

    pickHouseOption() {
      this.houseChoice =
        this.normalOptions[
          Math.floor(Math.random() * this.normalOptions.length)
        ].name
    },

    determineWinner() {
      if (this.playerChoice === this.houseChoice) {
        this.gameResults.push(Outcomes.draw)
        return
      }
      switch (this.playerChoice) {
        case Options.rock:
          this.houseChoice === Options.paper ||
          this.houseChoice === Options.spock
            ? this.houseWin()
            : this.playerWin()
          break
        case Options.paper:
          this.houseChoice === Options.scissors ||
          this.houseChoice === Options.lizard
            ? this.houseWin()
            : this.playerWin()
          break
        case Options.scissors:
          this.houseChoice === Options.rock ||
          this.houseChoice === Options.spock
            ? this.houseWin()
            : this.playerWin()
          break
        case Options.lizard:
          this.houseChoice === Options.rock ||
          this.houseChoice === Options.scissors
            ? this.houseWin()
            : this.playerWin()
          break
        case Options.spock:
          this.houseChoice === Options.paper ||
          this.houseChoice === Options.lizard
            ? this.houseWin()
            : this.playerWin()
          break
      }
    },

    playerWin() {
      this.gameResults.push(Outcomes.player)
    },

    houseWin() {
      this.gameResults.push(Outcomes.house)
    },
  },
})
