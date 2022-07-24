import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';

type CharMap = {
  letter: string;
  match: string;
};
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  constructor() {}
  randomText = '';
  enteredText = '';
  matched = false;
  charMap: CharMap[] = [];

  ngOnInit(): void {
    this.reset();
  }

  onInputChange(input: string) {
    this.matched = input === this.randomText;
    this.charMap = this.charMap.map((ch, i) => ({
      ...ch,
      match: this.getHighlighClass(ch.letter, input[i]),
    }));
    this.enteredText = input;
  }

  private getHighlighClass(currentChar: string, enteredChar: string) {
    if (!enteredChar) return 'pending';

    if (currentChar === enteredChar)
      return currentChar !== ' ' ? 'correct' : 'correct bg';

    return currentChar !== ' ' ? 'incorrect' : 'incorrect bg';
  }

  reset() {
    this.randomText = faker.lorem.sentence(3);
    this.charMap = this.randomText
      .split('')
      .map((c) => ({ letter: c, match: '-' }));
    this.enteredText = '';
    this.matched = false;
  }
}
